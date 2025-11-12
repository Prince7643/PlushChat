import { useUserStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import SearchBar from "../ui/SearchBar";
import Messages from "../Messages";
import ContactProfile from "../Contact";
import SearchUsers from "../SearchUser";
import Notification from "../Notification";
import { UserSkeleton } from "../ui/Skeleton/UserSkeleton";
import { useVisibleSkeletonCount } from "../../Hook/useVisibleSkeletonCount";

const SidebarBody = () => {
  const { searchUser, notification } = useUserStore();
  const {
    Chats,
    contactUser,
    isChatClick,
    isContactClick,
    isNotificationClick,
    isSearch,
    isNotificationCall,
    setIsSearch,
  } = useChatStore();

  const visibleSkeletonCount = useVisibleSkeletonCount(65); // ✅ use once, top level

  const renderSkeletons = () =>
    Array.from({ length: visibleSkeletonCount }).map((_, i) => (
      <UserSkeleton key={i} />
    ));

  const renderContent = () => {
    if (isChatClick) {
      if (Array.isArray(Chats) && Chats.length > 0)
        return Chats.map((chat) => <Messages key={chat._id} {...chat} chat={chat} />);
      return renderSkeletons();
    }

    if (isContactClick) {
      if (Array.isArray(contactUser) && contactUser.length > 0)
        return contactUser.map((contact) => <ContactProfile key={contact._id} contact={contact} />);
      return renderSkeletons();
    }

    if (isNotificationClick) {
      if (Array.isArray(notification) && notification.length > 0)
        return notification
          .filter((n) => n.type === "friendRequest")
          .map((n) => <Notification key={n._id} {...n} />);
      return renderSkeletons();
    }

    if (isNotificationCall) {
      if (Array.isArray(notification) && notification.length > 0)
        return notification
          .filter((n) => n.type === "call")
          .map((n) => <Notification key={n._id} {...n} />);
      return renderSkeletons();
    }

    if (isSearch) {
      if (Array.isArray(searchUser) && searchUser.length > 0)
        return searchUser.map((user) => <SearchUsers key={user._id} search={user} />);
      return renderSkeletons();
    }

    return <div className="text-center text-gray-400 mt-6">No content available</div>;
  };

  return (
    <main className="flex-1 overflow-y-auto p-2 invisible-scroll">
      <div onClick={() => setIsSearch(true)} className="mb-3">
        <SearchBar />
      </div>
      {renderContent()}
    </main>
  );
};

export default SidebarBody;
