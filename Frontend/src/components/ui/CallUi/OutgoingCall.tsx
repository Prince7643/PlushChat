import { Phone, PhoneOff } from "lucide-react";
import { useCallStore } from "../../../store/useCallStore";
import { socket } from "../../../lib/sockets";

const OutgoingCall = () => {
    
    const { outgoingCall, endCall, setcall ,videoCall,remoteSocketId} = useCallStore.getState();

    const handleReject = () => {
    socket.emit("cancelCall", { to: remoteSocketId });
    endCall();
    setcall(false);
    };


    return (

        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <div className="flex flex-col items-center gap-3">
            <Phone size={60} className="text-green-400 animate-pulse" />
            <h2 className="text-2xl font-semibold">
                {videoCall?"Video":"Voice"} Calling {outgoingCall?.username || "user"}...
            </h2>
            <p className="text-gray-400">Waiting for them to answer</p>
            </div>

            <div className="flex gap-6 mt-10">
            <button
                onClick={()=>{handleReject}}
                className="p-5 rounded-full bg-red-600 hover:bg-red-700 transition shadow-lg"
            >
                <PhoneOff className="text-white" size={28} />
            </button>
            </div>
        </div>
    )
}

export default OutgoingCall