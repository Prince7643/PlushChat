import { useUserStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"
import { defalutImg, type NotificationType } from "../Types/interface"

const Notification:React.FC<NotificationType> = ({sender,message}) => {
  const {isDark,acceptFriendRequest}=useUserStore()
  const {contacts}=useChatStore()
  const isContact=contacts?.find((contact)=>contact.userId===sender?._id)
  console.log(isContact)
  return (
      <div  
        className={`flex rounded-xl ${
          isDark?"hover:bg-[#373737]":"hover:bg-[#EBEBEE]"
          } cursor-pointer text-white font-bold h-20 contain overflow-hidden justify-between`
        }>
        <div className='flex gap-5 items-center pl-4 text-center'>
          <div className='flex items-center'>
            <img 
              src={sender?.profilePic||defalutImg} 
              alt="" 
              className='rounded-full size-15 ' 
            />
            <div className='pl-3 text-left'>
              <div 
                className={`${
                  isDark?"text-white":"text-black"
                  }`}>
                    {sender.username}
              </div>
              <div 
                className={`${
                  isDark?"text-white":"text-gray-500"}
                `}>
                  {message}
                </div>
            </div>
          </div>
        </div>
      {isContact?.status==='Pending'?<div className="text-black flex items-center gap-3 p-2">
          <button 
            className={`bg-green-500 rounded-2xl px-2`} 
            onClick={()=>{acceptFriendRequest(isContact?._id,isContact.userId)}}>
              Accept
          </button>
        </div>:""}
    </div>
  )
}

export default Notification