import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";
export function EmailSent() {
  const {authUser}=useUserStore()
  const {sendverifyemail}=useChatStore()
  const navigate =useNavigate()
  const handlesend=()=>{
    if (!authUser?.user.email) return
    sendverifyemail(authUser?.user.email)
  }
  useEffect(()=>{
    if (!authUser?.user.email) return
    if (authUser.user.isVerified) {
      navigate("/chat", { replace: true })
    }
  },[authUser?.user.email])
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br bg-[#0e0e10]">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
        <Mail className="text-[#0e0e10] mx-auto w-14 h-14" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Check your email 📩
        </h2>
        <p className="text-gray-500 mt-2">
          We’ve sent you a verification link. Click below to open Gmail.
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-[#0e0e10] text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
          >
            Open Gmail
          </a>
        </div>
        <div onClick={()=>handlesend()} className="mt-4">
          <Timer timer={3} />
        </div>
      </div>
    </div>
  );
}

export const Timer=({timer}:any)=>{
  const [time, setTime] =useState(timer*60);
  const [runing,setisRuning]=useState(false)
  useEffect(()=>{
    if (time<=0||!runing) return
      const interval=setInterval(()=>{
      setTime((prev)=>prev-1)
    },1000)
    return ()=>clearInterval(interval)
  },[time,runing])
  const min=Math.floor(time/60)
  const sec=time%60
  return <div className="text-sm text-gray-500">
    {runing?`${min}:${sec<10?`0${sec}`:sec}`:<div className="cursor-pointer hover:text-gray-900" onClick={()=>{setisRuning(true)}}>Resend link</div>}
  </div>
}