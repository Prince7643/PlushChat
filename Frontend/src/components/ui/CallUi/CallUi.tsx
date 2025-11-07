import { useCallStore } from '../../../store/useCallStore'
import IncomingCall from './IncomingCall'
import OutgoingCall from './OutgoingCall'
import InCall from './InCall'

export const CallUi = () => {
  
  const {  incomingCall,  inCall, call, outgingCall } = useCallStore();
  console.log(incomingCall, inCall, call, outgingCall)

  if (incomingCall && call) return <IncomingCall />
  
  if (outgingCall && call && !inCall) return <OutgoingCall />

  // 🧩 Active Call Screen
  if (inCall) return <InCall />

  // 🧩 Idle state
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-gray-400">
      <p>No active call</p>
    </div>
  );

}

