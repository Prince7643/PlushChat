
export interface userStoreType {
    authUser:{user:User}|null,
    setAuthUser:(user:User)=>void
    isCheckingAuth:boolean,
    notification:NotificationType[],
    setNotification:(notification:NotificationType[])=>void
    searchUser:User[]
    checkAuth:()=>void,
    login:(data: any)=>void,
    logout:()=>void
    signup:(data:any)=>void
    isDark:boolean,
    setIsDark:()=>void
    onlineUsers:string[];
    setOnlineUsers:(users:string[])=>void
    setsearchUser:(username:string)=>void
    sendFriendRequest:(userId:string)=>void
    acceptFriendRequest:(userId:string,receiver:string)=>void
    rejectFriendRequest:(userId:string)=>void
    getNotification:()=>void
    saveToken:(token:string)=>void
}
export interface ChatStore{
    unReadMessages:{[userId:string]:number}
    sendverifyemail:(email:string)=>{},
    clearReadMessage:(userId:string)=>void
    contactUser:User[]|null
    selectedUser:User | null
    Chats:Chat[]
    getsChats:()=>void
    contacts:Contact[]
    getContact:()=>void
    setSelectedUser:(user:User|null)=>void
    getMessageByUserId:(userId:string)=>void
    messages:Message[]
    sendMessage:(data:string)=>void
    addMessage:(msg:Message)=>void
    isContactClick:boolean
    setIsContactClick:(isContactClick:boolean)=>void
    isChatClick:boolean
    setIsChatClick:(isChatClick:boolean)=>void
    isNotificationClick:boolean
    setIsNotificationClick:(isContactClick:boolean)=>void
    unseenNotification:NotificationType[]
    setseenNotification:(type:string)=>void
    getUnseenNotification:()=>void
    setIsSearch:(isSearch:boolean)=>void
    isSearch:boolean
    isNotificationCall:boolean
    setIsNotificationCall:(isNotificationCall:boolean)=>void
}
export interface Contact {
    _id:string,
    contactId:string,
    userId:string,
    status:string,
    
}
export interface ContactProps{
    contact:User
}
export interface User {
    _id:string
    username:string,
    password:string,
    email:string,
    profilePic:string,
    isOnline:boolean,
    lastOnline:string,
    isVerified:boolean,
    chat?:Chat
}

export interface Chat {
    _id:string,
    password:string,
    email:string,
    username:string,
    isOnline:boolean,
    lastOnline:string,
    profilePic:string
    isVerified:boolean,

    chat:Chat
}
export interface NotificationType{
    sender:{
        username:string
        _id:string
        profilePic:string
    },
    receiverId:User,
    message:string,
    type:string,
    seen:boolean,
    _id:string
}
export interface Message {
    _id?:string,
    senderId:string,
    receiverId:string,
    message:string,
    createdAt?:string
}

export const defalutImg='https://res.cloudinary.com/ddt9itdz7/image/upload/v1761498906/2f15f2e8c688b3120d3d26467b06330c_e7sdai.jpg'

export interface CallState {
    call:boolean,
    setcall:(call:boolean)=>void
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    peerConnection: RTCPeerConnection | null;
    callerId:string|null
    remoteSocketId: string | null;
    incomingCall: boolean;
    offer: RTCSessionDescriptionInit | null;
    inCall: boolean;
    outgingCall:User|null;
    videoCall: boolean;
    voiceCall:boolean
    setVideoCall:(videoCall:boolean)=>void
    setVoiceCall:(voiceCall:boolean)=>void
    // Actions
    initCallEvents: () => void;
    startCall: (remoteSocketId: string) => Promise<void>;
    answerCall: () => Promise<void>;
    endCall: () => void;
    setOutgoingCall:(user:User)=>void   
}
export interface SearchUserType{
    search:User|null,
}