import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { ChatStore } from "../Types/interface";
import { userStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useChatStore = create<ChatStore>((set, get) => {
  // --------------------------
  // 🧠 Helper functions (stable references)
  // --------------------------
  const getUnseenNotification=async () => {
    try {
      const res=await axiosInstance.get('/api/notification/getUnseen')
      set({unseenNotification:res.data})

    } catch (error) {

    }
  }
  const setseenNotification=async (type:string) => {
    try {
      const res=await axiosInstance.post('/api/notification/markAsSeen',{type})
      set({unseenNotification:[]})
    } catch (error) {

    }
  }
  const getsChats = async () => {
    try {
      const res = await axiosInstance.get("/api/message/chats");
      set({ Chats: res.data });
    } catch (error) {

    }
  };

  const getContact = async () => {
    try {
      const res = await axiosInstance.get(`/api/contact/contacts`);
      set({
        contactUser: res.data.friends,
        contacts: res.data.contacts,
      });
    } catch (error:any) {
      console.log(error)
      toast.error(error.response?.data?.msg||"Error in getContact")
    }
  };

  const getMessageByUserId = async (userId: string) => {
    try {
      const res = await axiosInstance.get(`/api/message/${userId}`);
      set({ messages: res.data });
    } catch (error:any) {
      toast.error(error.response?.data?.msg)
    }
  };

  const sendMessage = async (messageData: string) => {
    const { selectedUser, messages } = get();
    const { authUser } = userStore.getState();

    if (!authUser || !selectedUser) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser.user._id,
      receiverId: selectedUser._id,
      message: messageData,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // Immediately show message in UI
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(
        `/api/message/send/${selectedUser._id}`,
        { text: messageData }
      );
      // Replace optimistic with real
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      console.error("Error sending message:", error);
      // Rollback optimistic message
      set({ messages });
    }
  };

  const addMessage = (msg: any) => {
    const current = get().messages;
    const { selectedUser, unReadMessages } = get();
    
    set({ messages: [...current, msg] });

    if (!selectedUser || selectedUser._id !== msg.senderId) {
      const {senderId, receiverId} = msg;
      const currentUser=userStore.getState().authUser?.user._id;
      console.log(currentUser+" ",receiverId+" ",senderId)
      if (receiverId==currentUser) {
          set({
        unReadMessages: {
          ...unReadMessages,
          [senderId]: (unReadMessages[senderId] || 0) + 1,
        },
      })
      }
    }
  };
  const sendverifyemail=async(email:any)=>{
    console.log(email)
    await axiosInstance.post('/api/user/sendverifyemail',{email}).then((res)=>{
      toast.success(res.data.msg)
    }).catch((err)=>{
      toast.error(err.response?.data?.msg)
    })

  }

  // --------------------------
  // 🧩 Return Zustand store
  // --------------------------
  return {
    Chats: [],
    messages: [],
    contacts: [],
    contactUser: [],
    selectedUser: null,

    isChatClick: true,
    isContactClick: false,
    isNotificationClick: false,
    isSearch: false,
    unReadMessages: {},
    isNotificationCall:false,
    // setters
    setIsNotificationCall:(isNotificationCall)=>set({isNotificationCall}),
    setIsChatClick: (isChatClick) => set({ isChatClick }),
    setIsSearch: (isSearch) => set({ isSearch }),
    setIsContactClick: (isContactClick) => set({ isContactClick }),
    setIsNotificationClick: (isNotificationClick) =>
      set({ isNotificationClick }),

    clearReadMessage: (userId: string) => {
      const { unReadMessages } = get();
      const newUnReadMessages = { ...unReadMessages };
      delete newUnReadMessages[userId];
      set({ unReadMessages: newUnReadMessages });
    },

    setSelectedUser: (user: any) => {
      set({ selectedUser: user });
      if (user) {
        get().getMessageByUserId(user?._id);
      }
    },

    // stable actions
    getsChats,
    getContact,
    getMessageByUserId,
    sendMessage,
    addMessage,
    getUnseenNotification,
    setseenNotification,
    sendverifyemail,
    unseenNotification:[],
  };
});
