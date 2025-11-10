import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import  { socket }  from '../../lib/sockets'
import NoChatHistoryPlaceholder from '../noChatHistory'
import {defalutImg} from '../../Types/interface'
import MessageList from "./MessageList";

export const ChatContainer = () => {
  const {authUser}=useUserStore()
  const { messages,getMessageByUserId,selectedUser,addMessage } = useChatStore();
  const messageEndRef=useRef<HTMLDivElement>(null)
  const [typeing,setTyping]=useState(false)
  useEffect(()=>{
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({behavior:'smooth'})
    }
  },[messages])

  useEffect(()=>{
    if(selectedUser){
      getMessageByUserId(selectedUser._id)
    }
  },[selectedUser])
  useEffect(()=>{
    if (!authUser?.user._id) return
    socket.off('receiveMessage'); // ✅ remove any old listener before re-adding
    socket.emit("registerUser", authUser.user._id);
    socket.emit('joinRoom',authUser.user._id)
    const handleSendMessage=(message:any)=>{
      console.log("Message:", message)
      addMessage(message)
    }
    socket.off("userTyping");
    socket.on("userTyping", ({ senderId, isTyping }) => {
      console.log("CLIENT: userTyping received", { senderId, isTyping, selectedUserId: selectedUser?._id });
      
      if (selectedUser?._id === senderId) setTyping(isTyping);
    });
    socket.on('receiveMessage',handleSendMessage)
    return()=>{
      socket.emit('leaveRoom', authUser?.user._id)
      socket.off('receiveMessage',handleSendMessage)
      socket.off("userTyping");

    }
  },[authUser?.user._id])
  return (
    <div className="p-3 flex flex-col rounded-2xl h-full">
      {/**Header */}
      <div className="flex-shrink-0">
        <ChatHeader></ChatHeader>
      </div>
      {/**Chat History */}
      <div className="flex-1 overflow-y-auto px-6 py-4 scroll-smooth invisible-scroll">
        {messages.length>0?(
          <MessageList messageEndRef={messageEndRef}
            authUserId={authUser?.user._id}
            messages={messages}
            selectedUser={selectedUser || defalutImg}
          />
        ):(<NoChatHistoryPlaceholder/>)}
        {typeing && (
          <p className="text-sm text-slate-400 italic mt-2">{selectedUser?.username} is typing...</p>
        )}
      </div>
      {/**Message Input */}
      <div className="flex-shrink-0">
        <MessageInput></MessageInput>
      </div>
    </div>
  )
}
