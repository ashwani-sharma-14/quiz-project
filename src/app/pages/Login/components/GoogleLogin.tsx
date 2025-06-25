import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/utils/clientApiInstace";
import logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state);

  const handleSuccess = async (authResult: { code: string }) => {
    try {
      const result = await api.get("/auth/google?code=" + authResult.code);

      if (!result.data.success) {
        if (result.data.message === "User not found") {
          navigate("/sign-up", {
            state: { googleUser: result.data.googleUser },
          });
          return;
        }
       
      }

      setAuth.authState = result.data.user;
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: (err) => console.error("Google Login Error:", err),
    flow: "auth-code",
  });

  return (
    <Button
      onClick={googleLogin}
      className="flex items-center justify-center bg-white text-black border border-gray-300 rounded-[8px] text-sm px-4 py-2 hover:bg-gray-100"
    >
      <img src={logo} alt="google-icon" className="w-5 h-5 mr-2" />
      Login with Google
    </Button>
  );
};

export default GoogleLogin;
