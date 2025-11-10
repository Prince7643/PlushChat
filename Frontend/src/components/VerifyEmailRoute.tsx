import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/useAuthStore";
import { VerifyEmail } from "../pages/verificationpage";
import { EmailSent } from "../components/EmailSent";

export const VerifyEmailRoute = () => {
  const authUser = useUserStore((state) => state.authUser);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  // ✅ If the user clicked the link from email (has token)
  if (token) {
    return <VerifyEmail />;
  }

  // ✅ If no user, redirect to signup
  if (!authUser) {
    return <Navigate to="/signup" replace />;
  }

  // ✅ If already verified, go to chat
  if (authUser.user?.isVerified) {
    return <Navigate to="/chat" replace />;
  }

  // ✅ Otherwise, show "Email Sent" page
  return <EmailSent />;
};
