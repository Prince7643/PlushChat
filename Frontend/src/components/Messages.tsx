import { useUserStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore'
import type { Chat } from '../Types/interface'
import { defalutImg  } from '../Types/interface';

const Messages:React.FC<Chat> = ({username, profilePic,chat}) => {

  const {setSelectedUser,unReadMessages}=useChatStore();
  const {isDark}=useUserStore()
  const unReadMeg=unReadMessages[chat._id]
  return (
    <div 
      onClick={()=>setSelectedUser(chat)} 
      className={`flex justify-between rounded-xl ${
        isDark?"hover:bg-[#373737]":"hover:bg-[#EBEBEE]"
        }  cursor-pointer text-white font-bold h-20 contain overflow-hidden`}
      >
      <div className='flex gap-5 items-center pl-4 text-center'>
          <div className='flex items-center'>
            <img 
              src={profilePic||defalutImg} 
              alt="" 
              className='rounded-full size-15 ' 
            />
            <div className='pl-3'>
                <div 
                  className={`${
                    isDark?"text-white":"text-black"}`}>
                    {username}
                </div>
            </div>
          </div>
        </div>
        {unReadMeg>0&&(
          <span className='flex items-center h-5 w-5 justify-center m-8 bg-green-500 rounded-full text-white text-sm font-bold'>{unReadMeg}</span>
        )}
    </div>
  )
}

export default Messages

