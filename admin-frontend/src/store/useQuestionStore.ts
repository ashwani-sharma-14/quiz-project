import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/utils/api";
import { toast } from "sonner";
import type { Question } from "@/app/pages/questions/QuestionsTable";

interface QuestionStore {
  questions: Question[];
  loading: boolean;
  error: string | null;
  uploadToast: {
    show: boolean;
    status: "uploading" | "uploaded" | null;
    message: string;
  };
  setUploadToast: (
    show: boolean,
    status?: "uploading" | "uploaded" | null,
    message?: string
  ) => void;

  createQuestionsFromExcel: (file: File) => Promise<boolean>;
  fetchQuestions: () => Promise<void>;
  fetchQuestionById: (id: string) => Promise<Question | null>;
  updateQuestion: (id: string, data: Question) => Promise<boolean>;
  deleteQuestion: (id: string) => Promise<boolean>;
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set, get) => ({
      questions: [],
      loading: false,
      error: null,
      uploadToast: { show: false, status: null, message: "" },

      setUploadToast: (show, status = null, message = "") =>
        set({ uploadToast: { show, status, message } }),

      createQuestionsFromExcel: async (file: File): Promise<boolean> => {
        set({ loading: true, error: null });
        get().setUploadToast(true, "uploading", "Uploading questions...");

        try {
          const formData = new FormData();
          formData.append("file", file);

          const res = await api.post("/admin/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (res.data.message === "File uploaded successfully") {
            toast.success("Questions imported successfully");
            await get().fetchQuestions();
            set({ loading: false });
            get().setUploadToast(true, "uploaded", "Questions uploaded!");

            setTimeout(() => get().setUploadToast(false, null, ""), 1500);

            return true;
          } else {
            toast.error("Failed to import questions");
            set({ loading: false });
            get().setUploadToast(false, null, "");
            return false;
          }
        } catch (err: unknown) {
          let errorMessage = "Failed to import questions";
          if (err instanceof Error) errorMessage = err.message;

          toast.error(errorMessage);
          set({ error: errorMessage, loading: false });
          get().setUploadToast(false, null, "");
          return false;
        }
      },

      fetchQuestions: async () => {
        set({ loading: true, error: null });
        try {
          const res = await api.get("/admin/questions");
          set({ questions: res.data.questions, loading: false });
        } catch (err: unknown) {
          let errorMessage = "Failed to fetch questions";
          if (err instanceof Error) errorMessage = err.message;

          toast.error(errorMessage);
          set({ error: errorMessage, loading: false });
        }
      },

      fetchQuestionById: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const res = await api.get(`/admin/questions/${id}`);
          set({ loading: false });
          return res.data.question as Question;
        } catch (err: unknown) {
          let errorMessage = "Failed to fetch question";
          if (err instanceof Error) errorMessage = err.message;

          toast.error(errorMessage);
          set({ error: errorMessage, loading: false });
          return null;
        }
      },

      updateQuestion: async (id: string, data: Question) => {
        set({ loading: true, error: null });
        try {
          const res = await api.patch(`/admin/questions/${id}`, data);

          if (res.data.success) {
            toast.success("Question updated successfully");
            await get().fetchQuestions();
            set({ loading: false });
            return true;
          } else {
            toast.error("Failed to update question");
            set({ loading: false });
            return false;
          }
        } catch (err: unknown) {
          let errorMessage = "Failed to update question";
          if (err instanceof Error) errorMessage = err.message;

          toast.error(errorMessage);
          set({ error: errorMessage, loading: false });
          return false;
        }
      },

      deleteQuestion: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const res = await api.delete(`/admin/questions/${id}`);

          if (res.data.success) {
            toast.success("Question deleted successfully");
            await get().fetchQuestions();
            set({ loading: false });
            return true;
          } else {
            toast.error("Failed to delete question");
            set({ loading: false });
            return false;
          }
        } catch (err: unknown) {
          let errorMessage = "Failed to delete question";
          if (err instanceof Error) errorMessage = err.message;

          toast.error(errorMessage);
          set({ error: errorMessage, loading: false });
          return false;
        }
      },
    }),
    {
      name: "question-store",
      partialize: (state) => ({
        uploadToast: state.uploadToast,
      }),
    }
  )
);
