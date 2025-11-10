import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { userStoreType } from '../Types/interface';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const sessionStorageWrapper = {
  getItem: (name: string) => {
    const value = sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: any) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
};

export const userStore = create<userStoreType>()(
  persist(
    (set, get) => ({

      authUser: null,
      searchUser:[],
      isDark: false,
      notification: [],
      isCheckingAuth: true,
      onlineUsers: [],

      setOnlineUsers: (users) => set({ onlineUsers: users }),

      setAuthUser: (user) => set({ authUser: { user:{ ...user } }}),

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get('/api/user/checkAuth');
          set({ authUser: res.data })
        } catch (error) {
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      login: async (data) => {
        try {
          const res = await axiosInstance.post('/api/user/login', data);
          if (res.status==200) {
            set({ authUser: res.data });
            toast.success('Login successful',{
              icon:'🎉',
            });
          }
        } catch (error:any) {
          set({ authUser: null });
          toast.error(error.response?.data.msg||"Invalid credentials",{
            icon:'❌',
          });
        }
      },

      setNotification: (notifi) => {
        set({notification:notifi});
      },

      logout: async () => {
        try {
          const res = await axiosInstance.post('/api/user/logout');
          if (res.status==200) {
            set({ authUser: null });
            toast.success('Logout successful',{
              icon:'👋',
            });
          }
        } catch (error) {
          toast.error('Logout failed',{
            icon:'❌',
          });
        }
      },

      sendFriendRequest:async (contactId)=>{
        try {
          const res=await axiosInstance.post(`/api/contact/send`,{contactId})
          if (res.status==200) {
            set({notification:[res.data.newNotification]})
            toast.success('Friend request sent',{
              icon:'🎉',
            });
          }
        } catch (error:any) {
          toast.error(error.response?.data.msg||'Friend request failed',{
            icon:'❌',
          });
        }
      },

      acceptFriendRequest:async (contactId,userId)=>{
        try {
          await axiosInstance.post(`/api/contact/accept`,{contactId,userId})

        } catch (error) {
          console.log(error)
        }
      },

      rejectFriendRequest:async (userId)=>{
        try {
          const res=await axiosInstance.post(`/api/contact/reject`,userId)
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      },

      setsearchUser:async (username)=>{
        try {
          if(!username) return
          const res=await axiosInstance.get(`/api/user/search?q=${username}`)
          set({searchUser:res.data.users})
        }catch (error) {
          set({searchUser:[]}) 
        }
      },

      getNotification:async()=>{
        try {
          const res=await axiosInstance.get('/api/notification/get')
          set({notification:res.data||[]})
        } catch (error) {
          console.log(error)
        }
      },

      signup: async (data) => {
        try {
          const res = await axiosInstance.post('/api/user/signup', data);
          console.log(res.data)
          if (res.status==200) {
             set({ authUser: res.data });
             toast.success('Signup successful',{
              icon:'🎉',
            });
          }
        } catch (error:any) {
          toast.error(error.response?.data?.msg||'Signup failed',{
            icon:'❌',
          });
          set({ authUser: null });
        }
      },

      setIsDark() {
        const { isDark } = get();
        set({ isDark: !isDark });
      },
      
      saveToken:async (token:any)=>{
        try {
          await axiosInstance.post('/api/user/save-fcm-token',{token})
        } catch (error) {

        }
      }
    }),
    {
      name: 'auth-store',
      storage: sessionStorageWrapper, // 👈 wrap sessionStorage with JSON parsing
    }
  )
);
