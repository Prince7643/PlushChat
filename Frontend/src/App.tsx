import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useUserStore } from "./store/useAuthStore";
import ChatPage from "./pages/ChatPage";
import { useCallStore } from "./store/useCallStore";
import { onMessageListener, getTokenRequest } from "./lib/firebase";
import { VerifyEmail } from "./pages/verificationpage";
import { EmailSent } from "./components/EmailSent";
import { Toaster } from "react-hot-toast";
import { PloadProfilePic } from "./pages/PloadProfilePic";
import LandingPage from "./pages/LandingPage/LandingPage";

const App = () => {
  const initCallEvents = useCallStore((state) => state.initCallEvents);
  const saveToken = useUserStore((state) => state.saveToken);
  const authUser = useUserStore((state) => state.authUser);
  const [hydrated, setHydrated] = useState(false);

  // ✅ FIXED HYDRATION LOGIC
  useEffect(() => {
    const unsub = useUserStore.persist.onFinishHydration(() => {
      console.log("✅ Zustand rehydrated");
      setHydrated(true);
    });

    // Trigger hydration manually (in case not started yet)
    useUserStore.persist.rehydrate();

    // Cleanup on unmount
    return () => unsub?.();
  }, []);

  // ✅ show loader until hydrated
  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  // Initialize call events once
  useEffect(() => {
    initCallEvents();
  }, [initCallEvents]);

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((reg) => console.log("Service worker registered:", reg.scope))
        .catch((err) => console.log("Service worker registration failed:", err));
    }
  }, []);

  // Handle Firebase messaging
  useEffect(() => {
    const setupMessaging = async () => {
      const token = await getTokenRequest();
      if (token) saveToken(token);

      const payload: any = await onMessageListener();
      new Notification(payload.notification?.title, {
        body: payload.notification?.body,
      });
    };
    setupMessaging();
  }, [saveToken]);

  console.log("AuthUser:", authUser?.user);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            !authUser?.user ? <LandingPage /> : <Navigate to="/chat" replace />
          }
        />

        <Route
          path="/login"
          element={
            !authUser ? (
              <LoginPage />
            ) : !authUser.user?.profilePic ||
              authUser.user?.profilePic.trim() === "" ? (
              <Navigate to="/setup-profile" replace />
            ) : (
              <Navigate to="/chat" replace />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !authUser?.user ? (
              <SignupPage />
            ) : (
              <Navigate to="/verify-email" replace />
            )
          }
        />

        <Route
          path="/verify-email"
          element={
            authUser ? (
              authUser.user?.isVerified ? (
                <Navigate to="/chat" replace />
              ) : (
                <EmailSent />
              )
            ) : (
              <VerifyEmail />
            )
          }
        />

        {/* Protected Chat Route */}
        <Route
          path="/chat"
          element={
            authUser ? (
              authUser.user?.isVerified ? (
                <ChatPage />
              ) : (
                <Navigate to="/verify-email" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/setup-profile"
          element={
            authUser ? (
              !authUser.user.profilePic ||
              authUser.user?.profilePic.trim() === "" ? (
                <PloadProfilePic />
              ) : (
                <Navigate to="/chat" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
