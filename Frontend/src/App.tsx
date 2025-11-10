import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import { PloadProfilePic } from "./pages/PloadProfilePic";

//Stores
import { useUserStore } from "./store/useAuthStore";
import { useCallStore } from "./store/useCallStore";

//Firebase
import { getTokenRequest, onMessageListener } from "./lib/firebase";
import { VerifyEmailRoute } from "./components/VerifyEmailRoute";

const App = () => {
  const [hydrated, setHydrated] = useState(false);
  const authUser = useUserStore((state) => state.authUser);
  const saveToken = useUserStore((state) => state.saveToken);
  const initCallEvents = useCallStore((state) => state.initCallEvents);

  // Zustand hydration logic

  useEffect(() => {
    const unsub = useUserStore.persist.onFinishHydration(() => {
      console.log("✅ Zustand rehydrated");
      setHydrated(true);
    });

    useUserStore.persist.rehydrate();
    return () => unsub?.();
  }, []);

  //Initialize call system

  useEffect(() => {
    initCallEvents();
  }, [initCallEvents]);

  //Register service worker

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((reg) => console.log("Service worker registered:", reg.scope))
        .catch((err) => console.log("Service worker registration failed:", err));
    }
  }, []);

  //Handle Firebase notifications

  useEffect(() => {
    const setupMessaging = async () => {
      try {
        const token = await getTokenRequest();
        if (token) saveToken(token);

        const payload: any = await onMessageListener();
        new Notification(payload.notification?.title, {
          body: payload.notification?.body,
        });
      } catch (err) {
        console.log("Permission not granted or blocked");
      }
    };
    setupMessaging();
  }, [saveToken]);


  //Wait for Zustand hydration

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  console.log("AuthUser:", authUser?.user);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/*Public Routes */}
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

        {/*Email Verification Route (Fixed Logic)*/}
        <Route path="/verify-email" element={<VerifyEmailRoute />} />

        {/* Protected Chat Route*/}
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

        {/* Profile Setup Route*/}
        <Route
          path="/setup-profile"
          element={
            authUser ? (
              !authUser.user?.profilePic ||
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

        {/* Catch-all Route*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;



