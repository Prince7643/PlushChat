import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { Loader2, UserRound, UploadCloud } from "lucide-react";

const UploadProfilePic = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useUserStore();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePic", image);

      const res = await axiosInstance.post("/api/user/updateProfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

        setAuthUser(res.data);


      toast.success("Profile picture updated!");
      navigate("/chat", { replace: true });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0e0e10] px-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
          Set Your Profile Picture
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Add a photo so your friends can recognize you
        </p>

        <div className="relative w-32 h-32 mx-auto mb-6">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserRound className="w-14 h-14 text-yellow-400" />
            </div>
          )}

          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full cursor-pointer shadow-lg"
          >
            <UploadCloud className="w-5 h-5" />
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-700 to-yellow-400 text-white py-2 rounded-lg font-medium flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Upload & Continue"}
        </button>

        <button
          onClick={() => navigate("/chat", { replace: true })}
          className="w-full mt-3 text-gray-400 hover:text-yellow-400 text-sm"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default UploadProfilePic;