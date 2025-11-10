
import { XIcon, Video,PhoneCallIcon } from 'lucide-react'
import { useChatStore } from '../../store/useChatStore'
import { useEffect } from 'react'
import { socket } from '../../lib/sockets'
import { useCallStore } from '../../store/useCallStore'
import { useUserStore } from '../../store/useAuthStore'
import { defalutImg } from '../../Types/interface'

const ChatHeader = () => {

    const {setSelectedUser,selectedUser}=useChatStore()
    const {startCall ,setcall,setVideoCall,setVoiceCall}=useCallStore()
    const {setOnlineUsers,onlineUsers}=useUserStore()
    useEffect(()=>{
        const handLeEscKey=(event: { key: string })=>{
            if(event.key==='Escape'){
                setSelectedUser(null as any)
                socket.emit('leaveRoom')
            }
        }
        socket.on('onlineUser',(users)=>{
            setOnlineUsers(users)
        })
        window.addEventListener('keydown',handLeEscKey)

        return ()=>{
            window.removeEventListener('keydown',handLeEscKey)
        }
    },[selectedUser])

  return (
    <div className='bg-[#FFFFFF] flex shadow-2xl justify-between items-center pb-2 border-gray-900 max-h-[84px] flex-1 m-2 rounded-xl'>
        <div className='justify-between flex'>
            <div className='flex items-center'>
                <div className=''>
                    <div className='w-15'>
                        <img src={selectedUser?.profilePic||defalutImg} className='rounded-full mt-2 ml-3' alt="" />
                    </div>
                </div>
                <div className='ml-5'>
                    <h3 className={`font-medium text-black`}>{selectedUser?.username}</h3>
                    <div  className="flex items-center">
                        {selectedUser?._id && onlineUsers.includes(selectedUser?._id)&&(<div className="w-2 h-2 bg-green-500 rounded-full"/>)}                  
                        <p className="text-slate-500 text-sm ">{selectedUser?._id && onlineUsers.includes(selectedUser?._id)?"Online":"Offline"}</p>
                    </div>
                </div>
            </div>
           
        </div>
        <div className='flex gap-6 items-center'>
            <div className='text-black'>
                <PhoneCallIcon onClick={()=>{
                    setVideoCall(false)
                    setVoiceCall(true)
                    selectedUser?._id && startCall(selectedUser?._id),
                    setcall(true)}} 
                    size={20}/>
            </div>
            <div className='text-black'>
                <Video  onClick={()=>{
                    setcall(true)
                    selectedUser?._id && startCall(selectedUser?._id)
                    setVideoCall(true)
                    setVoiceCall(false
                        
                    ) 
                }
            }/></div>
            <button onClick={()=>
                setSelectedUser(null)
            }>
                <XIcon className='w-5 h-5 text-slate-400 mr-5 hover:text-slate-200 transition-colors cursor-pointer'>
                </XIcon>

            </button>
        </div>
    </div>
  )
}

export default ChatHeader