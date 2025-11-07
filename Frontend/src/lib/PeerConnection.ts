import { useRef } from "react"
import {socket} from '../lib/sockets'
import { useCallStore } from "../store/useCallStore"

export const setUpPeerConncetion=()=>{
    const peerConnection=useRef<RTCPeerConnection | null>(null)
    const {callerId}=useCallStore()
    const remoteVideoRef=useRef<HTMLVideoElement>(null)
        peerConnection.current=new RTCPeerConnection({
            iceServers:[
                {
                    urls:"stun:stun.l.google.com:19302"
                }
            ]
        })

        peerConnection.current.onicecandidate=(event)=>{
            if (event.candidate) {
                socket.emit("iceCandidate",{
                    to:callerId,
                    candidate:event.candidate
                })
            }
        }
        peerConnection.current.ontrack=(event)=>{
            if(remoteVideoRef.current){
                remoteVideoRef.current.srcObject=event.streams[0]
            }
        }
    }