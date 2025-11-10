import { useUserStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import SearchBar from "../ui/SearchBar";
import Messages from "../Messages";
import ContactProfile from "../Contact";
import SearchUsers from "../SearchUser";
import Notification from "../Notification";

const SidebarBody = () => {
  const { 
    searchUser, 
    notification 
  } = useUserStore();
  const { 
    Chats, 
    contactUser, 
    isChatClick, 
    isContactClick, 
    isNotificationClick,
    isSearch,
    isNotificationCall, 
    setIsSearch
  } = useChatStore();
  const renderContent = () => {
    if (isChatClick && Array.isArray(Chats)&&Chats.length>0) {
      return Chats.map((chat) => <Messages key={chat._id} {...chat} chat={chat} />);
    }

    if (isContactClick && Array.isArray(contactUser)&&contactUser.length>0) {
      return contactUser.map((contact) => <ContactProfile key={contact._id} contact={contact} />);
    }

    if (isNotificationClick && Array.isArray(notification) && notification.length > 0) {
      return notification.map((notify) =>{
        if (notify.type==='friendRequest') {
          return(
             <Notification key={notify._id} {...notify} />
          )
        }
      });
    }
    
    if (isNotificationCall && Array.isArray(notification) && notification.length > 0) {
      return notification.map((notify) =>{
        if (notify.type==='call') {
          return(
          <Notification key={notify._id} {...notify} />)
        }
      });
    }

    if (isSearch&&Array.isArray(searchUser) && searchUser.length > 0) {
      return searchUser.map((user) => <SearchUsers key={user._id} search={user} />);
    }

    return <div className="text-center text-gray-400 mt-6">No content available</div>;
  };

  return (
    <main className="flex-1 overflow-y-auto p-2 invisible-scroll">
      <div onClick={()=>setIsSearch(true)} className="mb-3">
        <SearchBar />
      </div>
      {renderContent()}
    </main>
  );
};

export default SidebarBody;
