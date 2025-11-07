
import { useRef, useState } from "react";
import { SendIcon } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { userStore } from "../../store/useAuthStore";
import { socket } from "../../lib/sockets";
import EmojiPicker ,{Theme} from "emoji-picker-react";
import { SmilePlus } from "lucide-react";

function MessageInput() {

  const [text, setText] = useState("");
  const {selectedUser}=useChatStore()
  const { isDark,authUser } = userStore()
  const [showEmoji,setShowEmoji]=useState(false)
  const isMoble=/Mobi|Andorid/i.test(navigator.userAgent)
  const [typing,setTyping]=useState(false)
  const typingRef=useRef<number|null>(null)

  const handleTyping=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const value=e.target.value
    setText(value)
    if (!authUser?.user._id||!selectedUser?._id) return
    if (!typing) {
      setTyping(true)
      socket.emit("typing",{
        senderId:authUser.user._id,
        receiverId:selectedUser._id,
        isTyping:true
      })
    }
    if (typingRef.current){ clearTimeout(typingRef.current)}else {
    // first keypress after idle - emit true
    console.log("typing: emit true", { sender: authUser.user._id, receiver: selectedUser._id });
    socket.emit("typing", { senderId: authUser.user._id, receiverId: selectedUser._id, isTyping: true });
  }
    typingRef.current=setTimeout(()=>{
      setTyping(false)
      console.log("typing: emit false (timeout)", { sender: authUser.user._id, receiver: selectedUser._id });
      socket.emit("typing",{
        senderId:authUser.user._id,
        receiverId:selectedUser._id,
        isTyping:false
      })
    },1500)
  }

  const handleEmoji=(emojiobject:any)=>{
    setText((pre)=>pre+emojiobject.emoji)
    setShowEmoji(false)
  }

  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (!text.trim()) return;
    if (!authUser?.user._id || !selectedUser?._id) return;
      const newMessage = {
      senderId: authUser?.user._id,
      receiverId: selectedUser._id,
      message:text,
      createdAt: new Date().toISOString(),
    };
    socket.emit("sendMessage",newMessage)
    setText("")
    setTyping(false)
    socket.emit("typing",{
      senderId:authUser.user._id,
      receiverId:selectedUser._id,
      isTyping:false
    })
  };

  return (
    <div className="w-full relative flex p-4 border-t border-slate-700/50">
      <form 
        onSubmit={handleSendMessage} 
        className="max-auto w-full flex items-center gap-3 sm:gap-4  md:gap-3">
        {/**Input */}
        <input
          type="text"
          value={text}
          onChange={handleTyping}
          className=" flex-1 min-w-0 px-4 py-2 rounded-2xl focus:outline-none bg-slate-800/50 border border-slate-700/50"
          placeholder="Type your message..."
        />
        {/**Emoji */}
        <button
          type="button"
          onClick={()=>setShowEmoji((pre)=>!pre)}
          className="flex items-center justify-center rounded-full hover:bg-yellow-500/50 transition"
          >
            <SmilePlus fill="gold" className="text-black size-10"/></button>
        <button
          type="submit"
          disabled={!text.trim()}
          className=" flex items-center justify-center rounded-2xl p-2 bg-gradient-to-r bg-cyan-400 font-medium hover:bg-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className={`${isDark?"text-white":"text-black"}`}/>
        </button>
      </form>
        {showEmoji&&(
          <div className="absolute bottom-19 left-2 sm:left-2 md:left-2 z-50 overflow-hidden rounded-2xl shadow-lg">
            <EmojiPicker 
              open={showEmoji}
              theme={isDark?Theme.DARK:Theme.LIGHT} 
              height={isMoble?400:400} 
              width={isMoble?300:400} 
              onEmojiClick={handleEmoji}/>
          </div>
    )}
  </div>
  );
}
export default MessageInput;
