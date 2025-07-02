import api from "@/utils/clientApiInstace";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

interface User {
  name: string;
  email: string;
  enrollment: string;
  profile: string;
  branch: string;
  admissionYear: number;
  currentYear: number;
  // Add other fields as needed based on your backend response
}

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      isSigningup: false,
      googleUser: {},
      user: {},

      login: async (data: LoginData) => {
        try {
          const response = await api.post("/user/login", data);

          if (response.data.message === "user not found") {
            toast.error("User not found, please sign up using Google");
            return false;
          }
          if (response.data.message === "password not match") {
            toast.error("Password does not match");
            return false;
          }
          if (response.data.message === "Outside domain") {
            toast.error("Please use your college email id");
            return false;
          }

          set({ isLoggedIn: true, user: response.data.user });
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
        

          if (result.data.message === "Outside domain") {
            toast.error("Please use your college email id");
            return false;
          }

          if (
            !result.data.success &&
            result.data.message === "user not found please sign up"
          ) {
            set({ googleUser: result.data.user, isSigningup: true });
            navigate("/sign-up");
            toast.info("Please Enter new Password to complete signup");
            return false;
          }

          set({ isLoggedIn: true, user: result.data.user });
          toast.success("Login successful");
          navigate("/");
          return true;
        } catch {
          toast.error("Login failed.");
          return false;
        }
      },

      logout: async () => {
        try {
          const response = await api.post("/user/logout");
          if (!response.data.success) {
            toast.error("Logout failed");
          }
          set({
            isLoggedIn: false,
            user: {},
            isSigningup: false,
            googleUser: {},
          });
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
            toast.error("Failed to SignUp");
            return false;
          }

          set({
            isLoggedIn: true,
            isSigningup: false,
            user: response.data.user,
          });
          toast.success("Signup successful");
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const typed = state as {
          isLoggedIn: boolean;
          user: User;
        };
        return {
          isLoggedIn: typed.isLoggedIn,
          user: typed.user,
        };
      },
    }
  )
);
