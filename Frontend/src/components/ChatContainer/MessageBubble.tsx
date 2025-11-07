import React from 'react'
import { defalutImg } from '../../Types/interface'
interface MessageBubbleProps{
    isSender:boolean,
    message:string,
    profilePic:string
}
const MessageBubble:React.FC<MessageBubbleProps> = ({message,isSender,profilePic}) => {
  return (
        <div  className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
            {/**Avtar only for recever*/}
            {!isSender && (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={profilePic||defalutImg} alt="Tailwind CSS chat bubble component" />
                    </div>
                </div>
            )}
            <div className={`chat-bubble ${isSender?"bg-[#1565C0]":"bg-white"} ${isSender?"text-white":"text-black"}`}>
                {message}
            </div>
        </div>
    )
}

export default MessageBubble