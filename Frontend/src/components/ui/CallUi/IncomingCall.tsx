import { Phone, PhoneIncoming, PhoneOff } from "lucide-react"
import { useCallStore } from "../../../store/useCallStore"
import { userStore } from "../../../store/useAuthStore"

const IncomingCall = () => {
  const { answerCall,endCall,setcall }=useCallStore()
  const { authUser }=userStore()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <PhoneIncoming size={60} className="text-green-400 animate-pulse" />
          <h2 className="text-2xl font-semibold">{authUser?.user.username || "Incoming Call"}</h2>
          <p className="text-gray-400">is calling you...</p>
        </div>

        <div className="flex gap-6 mt-10">
          {/* Reject Button */}
          <button
            onClick={()=>{endCall(),setcall(false)}}
            className="p-5 rounded-full bg-red-600 hover:bg-red-700 transition shadow-lg"
          >
            <PhoneOff className="text-white" size={28} />
          </button>

          {/* Accept Button */}
          <button
            onClick={()=>{answerCall(),setcall(true)}}
            className="p-5 rounded-full bg-green-600 hover:bg-green-700 transition shadow-lg"
          >
            <Phone className="text-white" size={28} />
          </button>
        </div>
    </div>
  )
}

export default IncomingCall