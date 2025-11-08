import { create } from "zustand";
import {socket} from '../lib/sockets'
import { userStore } from "./useAuthStore";
import type { CallState } from "../Types/interface";
import { useChatStore } from "./useChatStore";


const { authUser } = userStore.getState();
const {selectedUser}=useChatStore.getState()

export const useCallStore = create<CallState>(
  (set, get) => ({

    localStream: null,
    remoteStream: null,
    peerConnection: null,
    remoteSocketId: null,
    incomingCall: false,
    callerId:null,
    offer: null,
    inCall: false,
    call:false,
    outgingCall:null,
    videoCall: false,
    voiceCall:false,

    setVoiceCall:(voiceCall)=>set({voiceCall}),

    setVideoCall:(videoCall)=>set({videoCall}),

    setOutgoingCall:(user)=> {
      set({outgingCall:user})
    },
    
    setcall: (value) => set((state) => ({ call:typeof value==='boolean'?value:!state.call })),
    
    //Initialize socket listeners
    initCallEvents: () => {
    const peerConnection = get().peerConnection;

    socket.on("incomingCall", async ({ from, offer }) => {
      set({ remoteSocketId: from, offer, incomingCall: true, call:true });
    });

    socket.on("callAnswered", async ({ answer }) => {
      await get().peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
      set({ inCall: true });
    });

    socket.on("iceCandidate", ({ candidate }) => {
      get().peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
    });
    socket.on("callInitiated", ({ to }) => {
      set({ outgingCall: selectedUser, call: true });
    });


    socket.on("callEnded", () => {
      get().endCall();
      set({ inCall: false, call:true });
    });
  },

  // Start Call
  startCall: async (remoteSocketId: string) => {
    try {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    if (peerConnection) {
      // Send ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("iceCandidate", { to: remoteSocketId, candidate: event.candidate });
        }
      };
      // Handle remote video stream
      peerConnection.ontrack = (event) => {
        set({ remoteStream: event.streams[0] });
      };
      // Get local video/audio
      if (get().videoCall) {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
        set({ localStream, peerConnection });
      }else{
        const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
        set({ localStream, peerConnection });
      }
      // Create offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket.emit("callUser", { 
        userToCall: remoteSocketId, 
        offer,
        callerId:authUser?.user._id
      });
      socket.on("userOffline", ({ userToCall }) => {
        if (selectedUser) {
        get().setOutgoingCall(selectedUser)
      }
      });
      if (selectedUser) {
      get().setOutgoingCall(selectedUser)
    }
    }
  } catch (err:any) {
        if (err.name === "NotFoundError") {
            alert("No camera or microphone found on this device.");
        } else if (err.name === "NotAllowedError") {
            alert("Please allow camera and microphone access.");
        } else {
            alert("An error occurred while accessing camera and microphone.");
        }
    }
  },

  // Answer Call
  answerCall: async () => {
    const { offer, remoteSocketId } = get();
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", { to: remoteSocketId, candidate: event.candidate });
      }
    };

    peerConnection.ontrack = (event) => {
      set({ remoteStream: event.streams[0] });
    };

    // Get local video/audio
    if (get().videoCall) {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
      set({ localStream, peerConnection });
    }else{
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
      set({ localStream, peerConnection });
    }

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer!));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit("answerCall", { to: remoteSocketId, answer });
    set({ incomingCall: false, offer: null, inCall: true });
  },

  //End Call
  endCall: () => {
    const { peerConnection, localStream, remoteSocketId } = get();

    peerConnection?.close();
    localStream?.getTracks().forEach((t) => t.stop());
    socket.emit("endCall", { to: remoteSocketId });

    set({
      peerConnection: null,
      localStream: null,
      remoteStream: null,
      remoteSocketId: null,
      incomingCall: false,
      offer: null,
      inCall:false,
      call:false
    });
  },
}));
