import { create } from "zustand";
import axiosInstance from "../utils/clientAxiosInstance";

// Define the shape of a user object
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  // Add any other fields returned from your API
}

// Define the credentials and signup data shapes
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  avatar?: File;
  [key: string]: unknown; // For additional dynamic fields
}

// Define the Auth Store interface
interface AuthStore {
  authState: User | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  error: string | null;
  theme: string;

  checkAuth: () => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<boolean>;
  setTheme: (newTheme: string) => void;
}

// Create the store with types
export const useAuthStore = create<AuthStore>((set) => ({
  authState: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  error: null,
  theme: localStorage.getItem("theme") || "light",

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get<{ user: User }>(
        "/user/check-auth"
      );
      if (response.data.user) {
        set({ authState: response.data.user, isCheckingAuth: false });
        return true;
      }
    } catch (error: unknown) {
      console.error("Auth check failed:", error);
      set({ authState: null, isCheckingAuth: false });
    }
    return false;
  },

  signup: async (userData: SignupData) => {
    set({ isSigningUp: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        const value = userData[key];
        if (value instanceof Blob) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const response = await axiosInstance.post<{ user: User }>(
        "/user/signup",
        formData
      );

      set({
        authState: response.data.user,
        isSigningUp: false,
      });

      return true;
    } catch (error: unknown) {
      let errorMessage = "Signup failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage = (error.response as { data: { message?: string } }).data.message || errorMessage;
      }
      set({
        error: errorMessage,
        isSigningUp: false,
      });
      return false;
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ isLoggingIn: true, error: null });
    try {
      const response = await axiosInstance.post<{ user: User }>(
        "/user/login",
        credentials
      );
      set({
        authState: response.data.user,
        isLoggingIn: false,
      });
      return true;
    } catch (error: unknown) {
      let errorMessage = "Login failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage = (error.response as { data: { message?: string } }).data.message || errorMessage;
      }
      set({
        error: errorMessage,
        isLoggingIn: false,
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoggingOut: true, error: null });
    try {
      await axiosInstance.post("/user/logout");

      set({
        authState: null,
        isLoggingOut: false,
        error: null,
      });

      return true;
    } catch (error: unknown) {
      let errorMessage = "Logout failed";
      if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
        errorMessage = (error.response as { data: { message?: string } }).data.message || errorMessage;
      }
      set({
        error: errorMessage,
        isLoggingOut: false,
      });
      return false;
    }
  },

  setTheme: (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    set({ theme: newTheme });
  },
}));
