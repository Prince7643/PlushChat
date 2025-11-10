
import { useUserStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import type { ContactProps } from '../Types/interface'
import {defalutImg} from '../Types/interface'
const ContactProfile:React.FC<ContactProps> = ({contact}) => {
  const {setSelectedUser}=useChatStore()
  const {isDark}=useUserStore()
  return (
    <div onClick={()=>setSelectedUser(contact!)} className={`flex ${isDark?"hover:bg-[#373737]":"hover:bg-[#EBEBEE]"} cursor-pointer text-white font-bold h-20 contain overflow-hidden`}>
        <div className='flex items-center pl-4 text-center'>
            <img src={contact?.profilePic||defalutImg} alt="" className='rounded-full size-15 ' />
            <div className='pl-3'>
                <div className={`${isDark?"text-white":"text-black"}`}>{contact?.username}</div>
            </div>
        </div>
    </div>
  )
}

export default ContactProfile