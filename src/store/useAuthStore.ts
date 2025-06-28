import api from "@/utils/clientApiInstace";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  enrollment: string;
  profile: string;
  branch: string;
  admissionYear: number;
  currentYear: number;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      isSigningup: false,
      googleUser: {},
      login: async (data: LoginData) => {
        try {
          const response = await api.post("/user/login", data);
          if (!response.data.success) {
            toast.error("Loggin failed");
            return false;
          }

          set({ isLoggedIn: true, authState: response.data.user });
          toast.success("Login successful");
          return true;
        } catch {
          toast.error("Server Error");
          return false;
        }
      },
      googlelogin: async (code: string, navigate: (path: string) => void) => {
        try {
          const result = await api.get("/user/google?code=" + code);
          if (
            !result.data.success &&
            result.data.message === "user not found please sign up"
          ) {
            set({ googleUser: result.data.user, isSigningup: true });
            navigate("/sign-up");
            toast.error("Please Enter new Password");
            return false;
          }
          set({ isLoggedIn: true });
          toast.success("Login successful");
          navigate("/");
          return true;
        } catch {
          toast.error("Login failed.");
        }
      },
      logout: async () => {
        try {
          const response = await api.post("/user/logout");
          if (!response.data.success) {
            toast.error("Logout failed");
          }
          set({ isLoggedIn: false });
          return true;
        } catch {
          toast.error("Server Error");
          return false;
        }
      },
      signup: async (data: SignupData) => {
        try {
          const response = await api.post("/user/signup", data);
          if (!response.data.success) {
            toast.success("Failed to SignUp");
            return false;
          }
          set({ isLoggedIn: true, isSigningup: false });
          toast.success("Signup successful");
          return true;
        } catch {
          toast.error("Server Error");
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => {
        const typed = state as { isLoggedIn: boolean };
        return { isLoggedIn: typed.isLoggedIn };
      },
    }
  )
);
