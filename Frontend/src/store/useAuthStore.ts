import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { userStoreType } from "../Types/interface";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const safeStorage = createJSONStorage(() => {
  if (typeof window !== "undefined") {
    return localStorage; // browser
  }
  // fallback: dummy in-memory store for SSR
  let memoryStore: Record<string, string> = {};
  return {
    getItem: (name) => memoryStore[name] || null,
    setItem: (name, value) => { memoryStore[name] = value; },
    removeItem: (name) => { delete memoryStore[name]; },
  };
});

export const userStore = create<userStoreType>()(
  persist(
    (set, get) => ({
      authUser: null,
      searchUser: [],
      isDark: false,
      notification: [],
      isCheckingAuth: true,
      onlineUsers: [],

      setOnlineUsers: (users) => set({ onlineUsers: users }),

      setAuthUser: (user) => set({ authUser: { user } }),

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/api/user/checkAuth");
          set({ authUser: res.data });
        } catch {
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      login: async (data) => {
        try {
          const res = await axiosInstance.post("/api/user/login", data);
          if (res.status === 200) {
            set({ authUser: res.data });
            toast.success("Login successful 🎉");
          }
        } catch (error: any) {
          set({ authUser: null });
          toast.error(error.response?.data.msg || "Invalid credentials ❌");
        }
      },

      logout: async () => {
        try {
          const res = await axiosInstance.post("/api/user/logout");
          if (res.status === 200) {
            set({ authUser: null });
            toast.success("Logout successful 👋");
          }
        } catch {
          toast.error("Logout failed ❌");
        }
      },

      signup: async (data) => {
        try {
          const res = await axiosInstance.post("/api/user/signup", data);
          console.log(res.data);
          if (res.status === 200) {
            set({ authUser: res.data });
            toast.success("Signup successful 🎉");
          }
        } catch (error: any) {
          set({ authUser: null });
          toast.error(error.response?.data?.msg || "Signup failed ❌");
        }
      },

      setNotification: (notification) => set({ notification }),
      sendFriendRequest: async (contactId) => {
        try {
          const res = await axiosInstance.post(`/api/contact/send`, { contactId });
          if (res.status === 200) {
            set({ notification: [res.data.newNotification] });
            toast.success("Friend request sent 🎉");
          }
        } catch (error: any) {
          toast.error(error.response?.data.msg || "Friend request failed ❌");
        }
      },

      acceptFriendRequest: async (contactId, userId) => {
        try {
          await axiosInstance.post(`/api/contact/accept`, { contactId, userId });
        } catch (error) {
          console.log(error);
        }
      },

      rejectFriendRequest: async (userId) => {
        try {
          const res = await axiosInstance.post(`/api/contact/reject`, userId);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      },

      setsearchUser: async (username) => {
        try {
          if (!username) return;
          const res = await axiosInstance.get(`/api/user/search?q=${username}`);
          set({ searchUser: res.data.users });
        } catch {
          set({ searchUser: [] });
        }
      },

      getNotification: async () => {
        try {
          const res = await axiosInstance.get("/api/notification/get");
          set({ notification: res.data || [] });
        } catch (error) {
          console.log(error);
        }
      },

      setIsDark: () => {
        const { isDark } = get();
        set({ isDark: !isDark });
      },

      saveToken: async (token: any) => {
        try {
          await axiosInstance.post("/api/user/save-fcm-token", { token });
        } catch {
          console.log("Failed to save token");
        }
      },
    }),
    {
      name: "auth-store",
      storage: safeStorage,
      partialize: (state) => ({ authUser: state.authUser }), // ✅ optional: only save auth
    }
  )
);
console.log("Zustand persist loaded ✅");
