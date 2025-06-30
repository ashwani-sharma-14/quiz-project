import { create } from "zustand";
import axiosInstance from "../utils/clientApiInstace";

interface Quiz {
  userQuizData: {
    userQuizId: string;
    category: string;
    topics: string[];
    difficulty: string;
    totalQuestions: number;
    timeLimit: number;
    correct: number | null;
    incorrect: number | null;
    accuracy: number | null;
    timeTaken: number | null;
    score: number | null;
  };
  questions: {
    id: number;
    question: string;
    options: string[];
    difficulty: string;
    topicId: number;
    selectedAnswer?: string | null;
    isCorrect?: boolean | null;
  }[];
}
interface fetchQuiz {
    id: string;
    userId: string;
    category: string;
    topics: string[];
    difficulty: "EASY" | "MEDIUM" | "HARD";
    totalQuestions: number;
    timeLimit: number;
    score: number | null;
    correctCount: number | null;
    incorrectCount: number | null;
    accuracy: number | null;
    timeTaken: number | null;
    createdAt: Date;
    updatedAt: Date;
  
    quizQuestions: {
      id: string;
      userQuizId: string;
      questionId: number;
      questions: {
        id: number;
        question: string;
        options: string[];
      };
    }[];
  
    correct: {
      questionId: number;
    }[];
  
    wrong: {
      questionId: number;
    }[];
  
    attempted: {
      questionId: number;
    }[];
};

interface CategoryAndTopics{
  category: string[][];
  topics: string[][];
}
  


interface QuizStore {
  createQuizState: Quiz | null;
  fetchQuizState: fetchQuiz | null;
  quizList: fetchQuiz[] | null;
  categoryAndTopics: CategoryAndTopics | null;
  isCheckingQuiz: boolean;
  isCreatingQuiz: boolean;
  isUpdatingQuiz: boolean;
  isDeletingQuiz: boolean;
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  error: string | null;
  createQuiz: (quizData: CreateQuizData) => Promise<void>;
  updateQuiz: (quizData: AnswerSubmission) => Promise<void>;
  fetchQuiz: (quizId: string) => Promise<void>;
  getAllQuizzes: (userId: string) => Promise<void>;
  getCategoryAndTopicsData: () => Promise<void>;
  theme: string;
  setTheme: (newTheme: string) => void;
}
interface CreateQuizData {
  category: string;
  topics: string[];
  difficulty: string;
  totalQuestions: number;
  timeLimit: number;
}

interface AnswerSubmission {
  userQuizId: string;
  remeningTime: number;
  answers: {
    questionId: string;
    selectedAnswer: string;
  }[];
}


export const useQuizStore = create<QuizStore>((set) => ({
  createQuizState: null,
  fetchQuizState: null,
  categoryAndTopics: null,
  quizList: null,
  isCheckingQuiz: true,
  isCreatingQuiz: false,
  isUpdatingQuiz: false,
  isDeletingQuiz: false,
  isQuizStarted: false,
  isQuizCompleted: false,
  error: null,

  createQuiz: async (quizData: CreateQuizData) => {
    set({ isCreatingQuiz: true, error: null });
    try {
      const queryParams = new URLSearchParams({
        categoryId: quizData.category,
        topicsId: quizData.topics.join(","),
        difficulty: quizData.difficulty,
        totalQuestions: quizData.totalQuestions.toString(),
        timeLimit: quizData.timeLimit.toString(),
        mode: "examMode", // added static mode
      }).toString();

      const response = await axiosInstance.get(`/quiz/newquiz?${queryParams}`);
      set({
        createQuizState: response.data,
        isCreatingQuiz: false,
      });
    } catch (error) {
      let errorMessage = "Failed to create quiz";
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
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      }
      set({
        isCreatingQuiz: false,
        error: errorMessage,
      });
    }
  },

  updateQuiz: async (quizData: AnswerSubmission) => {
    set({ isQuizCompleted: true, error: null });
    try {
      const response = await axiosInstance.post(`/quiz/submit`, quizData);
      if (response?.data?.message === "quiz submitted") {
        set({
          createQuizState: null,
          isQuizCompleted: false,
        });
      }
    } catch (error) {
      let errorMessage = "Failed to update quiz";
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
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      }
      set({
        isUpdatingQuiz: false,
        error: errorMessage,
      });
    }
  },

  fetchQuiz: async (quizId: string) => {
    set({ isCheckingQuiz: true, error: null });
    try {
      const response = await axiosInstance.get(`/quiz/${quizId}`);
      set({
        fetchQuizState: response.data,
        isCheckingQuiz: false,
      });
    } catch (error) {
      let errorMessage = "Failed to fetch quiz";
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
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      }
      set({
        isCheckingQuiz: false,
        error: errorMessage,
      });
    }
  },

  getAllQuizzes: async (userId: string) => {
    set({ isCheckingQuiz: true, error: null });
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      set({
        fetchQuizState: response.data,
        isCheckingQuiz: false,
      });
    } catch (error) {
      let errorMessage = "Failed to fetch quizzes";
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
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      }
      set({
        isCheckingQuiz: false,
        error: errorMessage,
      });
    }
  },

  getCategoryAndTopicsData: async () => {
    set({ isCheckingQuiz: true, error: null });
    try {
      const categoryRes = await axiosInstance.get(`/quiz/categories`);
      const topicsRes = await axiosInstance.get(`/quiz/topics`);

      const categoriesRaw = categoryRes.data.categories; // ✅ fix path
      const topicsRaw = topicsRes.data.topics; // ✅ fix path

      const categoryList: string[][] = categoriesRaw.map(
        (cat: { id: string; name: string }) => [cat.id, cat.name]
      );

      const topicsList: string[][] = topicsRaw.map(
        (topic: { id: string; name: string; categoryId: string }) => [
          topic.id,
          topic.name,
          topic.categoryId,
        ]
      );

      set({
        categoryAndTopics: {
          category: categoryList,
          topics: topicsList,
        },
        isCheckingQuiz: false,
      });
    } catch {
      set({
        isCheckingQuiz: false,
        error: "Failed to fetch category and topics data",
      });
    }
  },
  theme: localStorage.getItem("theme") || "light",
  setTheme: (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },
}));

