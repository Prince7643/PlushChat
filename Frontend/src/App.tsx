import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { userStore } from "./store/useAuthStore";
import ChatPage from "./pages/ChatPage";
import { useCallStore } from "./store/useCallStore";
import { onMessageListener,getTokenRequest } from "./lib/firebase";
import { VerifyEmail } from "./pages/verificationpage";
import { EmailSent } from "./components/EmailSent";
import { Toaster } from 'react-hot-toast'

const App = () => {
  const initCallEvents = useCallStore((state) => state.initCallEvents);
  const saveToken = userStore((state) => state.saveToken);
  const authUser = userStore((state) => state.authUser);

  // Initialize call events once
  useEffect(() => {
    initCallEvents();
  }, [initCallEvents]);

  // Register service worker once
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../firebaseMessage.ts')
      .then((reg)=>console.log('service worker registered',reg.scope))
      .catch((err)=>console.log('service worker not registered',err))
    }
  }, []);

  // Handle Firebase messaging
  useEffect(() => {
    const setupMessaging = async () => {

        const token = await getTokenRequest();
        if (token) saveToken(token);
        
        const payload:any = await onMessageListener();
        new Notification(payload.notification?.title, {
          body: payload.notification?.body,
        });

    };
    setupMessaging();
  }, [saveToken]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path="/"
        element={!authUser ? <WelcomePage /> : <Navigate to="/chat" replace />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/chat" replace />}
        />
        <Route path="/verify-email" element={authUser?.user?.isVerified ? <Navigate to="/chat" replace />: <VerifyEmail />} />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <EmailSent/>}
        />
        <Route 
          path='/chat'
          element={authUser?.user.isVerified? <ChatPage /> :<EmailSent/>}
        />
        {/* Add more routes here */}
      </Routes>
    </>
  );
};

export default App;
