import api from "@/utils/api";
import { toast } from "sonner";
import { create } from "zustand";

interface Data {
  email: string;
  password: string;
}

interface file {
  file: File;
}

export const useAuthStore = create((set) => ({
  loggedIn: false,
  login: async (data: Data) => {
    try {
      const response = await api.post("/admin/login", data);
      console.log(response);
      if (response.data.success) {
        set({ loggedIn: true });
      }
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      if (error) {
        toast.error("failed to login");
      }
    }
  },
  logout: async () => {
    const response = await api.post("/admin/logout");
    if (response.data.success) {
      toast.success("Logged out successfully");
    }
    set({ loggedIn: false });
    return true;
  },

  uploadFile: async (file: file) => {
    const resonse = await api.post("/admin/upload", file);
    if (resonse.data.success) {
      toast.success("File uploaded successfully");
    }
    return true;
  },
}));
