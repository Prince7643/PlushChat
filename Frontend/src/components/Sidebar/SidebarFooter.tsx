import { MessageSquareQuote, UserRound, Phone, Bell } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { userStore } from "../../store/useAuthStore";

const SidebarFooterIcon = ({ isActive, onClick, icon: Icon, badgeCount = 0, isDark }: any) => (
  <div
    onClick={onClick}
    className={`relative flex items-center justify-center cursor-pointer w-14 h-10 rounded-2xl transition-all duration-150
      ${isDark ? "text-white" : "text-black"}
      ${isActive ? "bg-gray-300 text-black" : "bg-transparent hover:bg-gray-200/60"}`}
  >
    <Icon size={26} />
    {(badgeCount > 0) && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {badgeCount}
      </span>
    )}
  </div>
);

const SidebarFooter = () => {
  const {
    isDark,
    setsearchUser,
    notification
  } = userStore();
  const {
    setIsChatClick,
    setIsContactClick,
    setIsNotificationClick,
    isChatClick,
    isContactClick,
    isNotificationClick,
    unReadMessages,
    contactUser,
    setIsSearch,
    setseenNotification,
    isNotificationCall,
    setIsNotificationCall
  } = useChatStore();

  const totalMsgNotification = Object.values(unReadMessages).reduce((a, b) => a + b, 0);
  const Notification=notification?.filter((item:any)=>item.type=="friendRequest"&&item.seen==false).length
  const Callnotification=notification?.filter((item:any)=>item.type=="call"&&item.seen==false).length
  
  return (
    <footer className="p-2 border-t border-gray-600">
      <div className="flex justify-around items-center">
        <SidebarFooterIcon
          isDark={isDark}
          icon={MessageSquareQuote}
          isActive={isChatClick}
          badgeCount={totalMsgNotification}
          contactUser={contactUser}
          onClick={() => {
            setIsChatClick(true);
            setIsContactClick(false);
            setIsNotificationClick(false);
            setIsNotificationCall(false)
            setIsSearch(false)
            setsearchUser("")
          }}
        />

        <SidebarFooterIcon
          isDark={isDark}
          icon={UserRound}
          isActive={isContactClick}
          onClick={() => {
            setIsContactClick(true);
            setIsChatClick(false);
            setIsNotificationClick(false);
            setIsSearch(false)
            setIsNotificationCall(false)
            setsearchUser("")
          }}
        />

        <SidebarFooterIcon 
          isDark={isDark} 
          icon={Phone} 
          isActive={isNotificationCall}
          badgeCount={Callnotification}
          onClick={() => {
            setIsContactClick(false);
            setIsChatClick(false);
            setIsNotificationClick(false);
            setIsSearch(false)
            setIsNotificationCall(true)
            setseenNotification('call')
            setsearchUser("")
          }}
        />

        <SidebarFooterIcon
          isDark={isDark}
          icon={Bell}
          isActive={isNotificationClick}
          badgeCount={Notification}
          onClick={() => {
            setIsNotificationClick(true);
            setIsChatClick(false);
            setIsContactClick(false);
            setIsSearch(false)
            setIsNotificationCall(false)
            setseenNotification('friendRequest')
            setsearchUser("")
          }}
        />
      </div>
    </footer>
  );
};

export default SidebarFooter;
