import { userStore } from '../store/useAuthStore'
import type { SearchUserType } from '../Types/interface'
import { defalutImg } from '../Types/interface'
import { useChatStore } from '../store/useChatStore'

const SearchUsers: React.FC<SearchUserType> = ({ search }) => {
  const { isDark, sendFriendRequest } = userStore()
  const { contacts, setSelectedUser } = useChatStore()
  
  // Find if this user is already in contacts
  const isContact = contacts.find(
    (contact) =>contact.contactId === search?._id
      
  )
  console.log(isContact)
  console.log(search?._id)
  // Decide whether to show "Send Request" or status
  const showSendButton = !isContact || isContact.status === 'Send'

  return (
    <div
      onClick={() => setSelectedUser(search!)}
      className={`flex ${
        isDark ? 'hover:bg-[#373737]' : 'hover:bg-[#EBEBEE]'
      } cursor-pointer font-bold h-20 overflow-hidden items-center pl-4 gap-5`}
    >
      {/* Profile Image and Username */}
      <div className="flex items-center">
        <img
          src={search?.profilePic || defalutImg}
          alt=""
          className="rounded-full size-15"
        />
        <div className="pl-3">
          <div className={`${isDark ? 'text-white' : 'text-black'}`}>
            {search?.username}
          </div>
        </div>
      </div>

      {/* Right side: Button or Status */}
      <div className="ml-auto pr-4">
        {showSendButton ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
              sendFriendRequest(search?._id || '')
            }}
            className="bg-accent text-white rounded-2xl text-sm px-3 py-1 cursor-pointer"
          >
            Send Request
          </div>
        ) :isContact.status==="Pending" ?(
          <div className="flex text-gray-400 text-sm">
            Status: {isContact?.status}
          </div>
        ):""}
      </div>
    </div>
  )
}

export default SearchUsers
