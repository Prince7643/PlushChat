import MessageBubble from "./MessageBubble";
import { defalutImg } from "../../Types/interface";

interface MessageListProps {
  messages: any[];
  authUserId?: string;
  selectedUser: any;
  messageEndRef: React.RefObject<HTMLDivElement|null>;
}

const MessageList:React.FC<MessageListProps> = ({ messages, authUserId, selectedUser, messageEndRef }) => {
  return (
    <div>
      {messages.map((message) => {
        const isSender = message.senderId === authUserId;
        return (
          <MessageBubble
            key={message._id}
            isSender={isSender}
            message={message.message}
            profilePic={selectedUser?.profilePic || defalutImg}
          />
        );
      })}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default MessageList;
