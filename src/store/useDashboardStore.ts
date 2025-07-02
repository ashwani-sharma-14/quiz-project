import { create } from "zustand";
import api from "@/utils/api";
import { toast } from "sonner";

type DashboardState = {
  jobs: number;
  questions: number;
  students: number;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  fetchDashboardData: (isRefresh?: boolean) => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  jobs: 0,
  questions: 0,
  students: 0,
  loading: true,
  refreshing: false,
  error: null,

  fetchDashboardData: async (isRefresh = false) => {
    if (isRefresh) {
      set({ refreshing: true, error: null });
    } else {
      set({ loading: true, error: null });
    }

    try {
      const [jobsRes, questionsRes, usersRes] = await Promise.all([
        api.get("/jobs"),
        api.get("/admin/questions"),
        api.get("/admin/users"),
      ]);

      set({
        jobs: jobsRes.data.jobs?.length || 0,
        questions: questionsRes.data.questions?.length || 0,
        students: usersRes.data.users?.length || 0,
        loading: false,
        refreshing: false,
      });
    } catch (err: unknown) {
      let errorMessage = "Failed to import questions";
      if (err instanceof Error) errorMessage = err.message;

      toast.error(errorMessage);
      set({ error: errorMessage, loading: false, refreshing: false });
    }
  },
}));

