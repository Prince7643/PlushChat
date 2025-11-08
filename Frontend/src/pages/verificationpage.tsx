import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { userStore } from "../store/useAuthStore";
import { Timer } from "../components/EmailSent";
import { axiosInstance } from "../lib/axios";

export function VerifyEmail() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const {authUser}=userStore()
  const {sendverifyemail}=useChatStore()
  const handlesend=()=>{
    if (!authUser?.user.email) return
    sendverifyemail(authUser?.user.email)
  }
  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) return setStatus("error");

      try {
        const res = await axiosInstance.get(`/api/user/verifyemail?token=${token}`);
        console.log(res.data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br bg-[#0e0e10]">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin text-yellow-600 mx-auto w-12 h-12" />
            <h2 className="mt-4 text-lg font-semibold text-gray-700">
              Verifying your email...
            </h2>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="text-green-500 mx-auto w-14 h-14" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Email Verified Successfully 🎉
            </h2>
            <p className="text-gray-500 mt-2">You can now log in to your PlusChat account.</p>
            <a
              href="/chat"
              className="inline-block mt-6 px-6 py-2 bg-[#0e0e10] text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
            >
              Go to Chat
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="text-red-500 mx-auto w-14 h-14" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Verification Failed ❌
            </h2>
            <p className="text-gray-500 mt-2">The link may be invalid or expired.</p>
            <div onClick={()=>handlesend()} className="text-gray-500 mt-4">
            <Timer timer={3} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
