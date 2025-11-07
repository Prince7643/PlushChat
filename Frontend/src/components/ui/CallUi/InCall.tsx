import { Mic, MicOff, PhoneOff, Repeat, Video, VideoOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCallStore } from '../../../store/useCallStore'
import { userStore } from '../../../store/useAuthStore'

const InCall = () => {
    const localVideoRef=useRef<HTMLVideoElement>(null)
    const remoteVideoRef=useRef<HTMLVideoElement>(null)
    const localAudioRef=useRef<HTMLAudioElement>(null)
    const remoteAudioRef=useRef<HTMLAudioElement>(null)
    const [muted, setMuted] = useState(false);
    const [cameraOff, setCameraOff] = useState(false);
    const {  endCall, videoCall, voiceCall, setcall, localStream, remoteStream } = useCallStore();
    const {authUser}=userStore()
    
    useEffect(() => {
        if (localVideoRef.current && localStream) localVideoRef.current.srcObject = localStream;
    }, [localStream]);
    
    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
    }, [remoteStream]);

    useEffect(() => {
        if (localAudioRef.current && localStream) localAudioRef.current.srcObject = localStream;
    }, [localStream]);

    useEffect(() => {
        if (remoteAudioRef.current && remoteStream) remoteAudioRef.current.srcObject = remoteStream;
    }, [remoteStream]);
    
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* Remote Video */}
        {voiceCall?(<video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          id="remoteVideo"
        />):(<audio 
        ref={remoteAudioRef} 
        autoPlay 
        muted />)}

        {/* Local Video Preview */}
        <div className="absolute bottom-6 right-6 w-32 h-48 rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
        {videoCall?(<video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            id="localVideo"
          />):(<audio
          ref={localAudioRef}
          autoPlay
          muted />)}
        </div>

        {/* Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-5">
          {/* Mute */}
          <button
            onClick={() => setMuted(!muted)}
            className={`p-4 rounded-full backdrop-blur-md transition ${
              muted ? "bg-red-500/60" : "bg-gray-800/60"
            }`}
          >
            {muted ? <MicOff className="text-white" /> : <Mic className="text-white" />}
          </button>

          {/* Camera */}
          <button
            onClick={() => setCameraOff(!cameraOff)}
            className={`p-4 rounded-full backdrop-blur-md transition ${
              cameraOff ? "bg-red-500/60" : "bg-gray-800/60"
            }`}
          >
            {cameraOff ? <VideoOff className="text-white" /> : <Video className="text-white" />}
          </button>

          {/* Switch Camera */}
          <button className="p-4 rounded-full backdrop-blur-md bg-gray-800/60 transition">
            <Repeat className="text-white" />
          </button>

          {/* End Call */}
          <button
            onClick={() =>{ endCall(),setcall(false)}}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition shadow-lg"
          >
            <PhoneOff className="text-white" />
          </button>
        </div>

        {/* Call Info */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
          <p>Talking with @{authUser?.user.username || "username"}</p>
        </div>
    </div>
  )
}

export default InCall