import { create } from "zustand";
import api from "@/utils/api";
import { toast } from "sonner";
import type { Question } from "@/app/pages/questions/QuestionsTable";

interface QuestionStore {
  questions: Question[];
  loading: boolean;
  error: string | null;
  fetchQuestions: () => Promise<void>;
  fetchQuestionById: (id: string) => Promise<Question | null>;
  updateQuestion: (id: string, data: Partial<Question>) => Promise<boolean>;
  deleteQuestion: (id: string) => Promise<boolean>;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  loading: false,
  error: null,

  fetchQuestions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/admin/questions");
      set({ questions: res.data.questions, loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch questions",
        loading: false,
      });
      toast.error("Failed to fetch questions");
    }
  },

  fetchQuestionById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/admin/questions/${id}`);
      set({ loading: false });
      return res.data.question as Question;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch question", loading: false });
      toast.error("Failed to fetch question");
      return null;
    }
  },

  updateQuestion: async (id: string, data: Partial<Question>) => {
    set({ loading: true, error: null });
    try {
      const res = await api.patch(`/admin/questions/${id}`, data);
      if (res.data.success) {
        toast.success("Question updated successfully");
        // Optionally refetch questions
        get().fetchQuestions();
        set({ loading: false });
        return true;
      } else {
        toast.error("Failed to update question");
        set({ loading: false });
        return false;
      }
    } catch (err: any) {
      set({
        error: err.message || "Failed to update question",
        loading: false,
      });
      toast.error("Failed to update question");
      return false;
    }
  },

  deleteQuestion: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(`/admin/questions/${id}`);
      if (res.data.success) {
        toast.success("Question deleted successfully");
        // Optionally refetch questions
        get().fetchQuestions();
        set({ loading: false });
        return true;
      } else {
        toast.error("Failed to delete question");
        set({ loading: false });
        return false;
      }
    } catch (err: any) {
      set({
        error: err.message || "Failed to delete question",
        loading: false,
      });
      toast.error("Failed to delete question");
      return false;
    }
  },
}));
