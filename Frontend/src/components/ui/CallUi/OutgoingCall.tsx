import { Phone, PhoneOff } from "lucide-react";
import { useCallStore } from "../../../store/useCallStore";

const OutgoingCall = () => {
    
    const { outgingCall, endCall, setcall ,videoCall} = useCallStore();

    return (

        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <div className="flex flex-col items-center gap-3">
            <Phone size={60} className="text-green-400 animate-pulse" />
            <h2 className="text-2xl font-semibold">
                {videoCall?"Video":"Voice"} Calling {outgingCall?.username || "user"}...
            </h2>
            <p className="text-gray-400">Waiting for them to answer</p>
            </div>

            <div className="flex gap-6 mt-10">
            <button
                onClick={() => {
                endCall();
                setcall(false);
                }}
                className="p-5 rounded-full bg-red-600 hover:bg-red-700 transition shadow-lg"
            >
                <PhoneOff className="text-white" size={28} />
            </button>
            </div>
        </div>
    )
}

export default OutgoingCall