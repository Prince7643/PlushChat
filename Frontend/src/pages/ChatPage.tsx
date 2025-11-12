import Sidebar from "../components/Sidebar";
import { ChatContainer } from "../components/ChatContainer/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import { useUserStore } from "../store/useAuthStore";
import { useCallStore } from "../store/useCallStore";
import NoConversationPlaceholder from "../components/ChatContainer/NoCoversationPlaceholder";
import { useEffect ,Suspense ,lazy } from "react";
const CallUi=lazy(()=>import("../components/ui/CallUi/CallUi"))
const ChatPage = () => {
  const { selectedUser,getContact,getsChats,getUnseenNotification } = useChatStore();
  const {isDark,getNotification}=useUserStore()
  const {call}=useCallStore()
  useEffect(()=>{
        getsChats(),
        getContact(),
        getNotification()
        getUnseenNotification()
    },[getsChats,getContact,getNotification,getUnseenNotification])

  return (
    <div className={`min-h-screen ${isDark?"bg-[#232323]":"bg-[#FFFFFF]"} grid grid-cols-1 lg:grid-cols-[minmax(300px,35%)_1fr]`}>
      {/* Sidebar Section */}
      <div
        className={`${
          selectedUser ? "hidden lg:flex" : "flex"
        } flex-col h-screen`}
      >
        <Sidebar />
      </div>

      {/* Chat Section */}
      <div
        className={`${
          selectedUser ? "flex" : "hidden"
        } lg:flex flex-col h-[calc(110vh-64px)]
       rounded-none lg:rounded-4xl overflow-hidden p-4`}
      >
        <div className="flex-1 rounded-3xl overflow-hidden shadow-4xl bg-[#F0F0F3]">
          { call ? (
            <Suspense fallback={<div className="text-center text-white p-10">Loading call</div>}>
              <CallUi/>
            </Suspense>
          ) :selectedUser ?<ChatContainer />:(
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
//https://res.cloudinary.com/ddt9itdz7/image/upload/v1760343819/f6kmw9wdcjqeo954pc0f.jpg