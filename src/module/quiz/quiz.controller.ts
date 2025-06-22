import { asyncWrap } from "@/utils/asyncWrap";
import { Request, Response } from "express";
import { Difficulty } from "@/generated/prisma";
import { quizService } from "./quiz.service";
const generateQuiz = asyncWrap(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new Error("User ID is required");
  }

  const { category, topics, difficulty, totalQuestions, timeLimit, mode } =
    req.query;

  const quiz = await quizService.generateQuiz({
    userId: userId,
    category: String(category),
    topics: String(topics).split(","),
    difficulty: difficulty as Difficulty,
    totalQuestions: Number(totalQuestions),
    timeLimit: Number(timeLimit),
    mode: String(mode),
  });
  return res.json({ message: "quiz created", quiz });
});

const submitQuiz = asyncWrap(async (req: Request, res: Response) => {
  const result = await quizService.submitQuiz(req.body);
  return res.json({ message: "quiz submitted", result });
});

const getAllUserQuizzes = asyncWrap(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new Error("User ID is required");
  }

  const data = await quizService.getAllUserQuizzes(userId);
  res.json({ quizzes: data });
});

const getUserQuizById = asyncWrap(async (req: Request, res: Response) => {
  const quizId = req.params.quizId;
  if (!quizId) {
    throw new Error("Quiz ID is required");
  }

  const quiz = await quizService.getUserQuizById(quizId);
  res.json({ quiz });
});

export const quizController = {
  generateQuiz,
  submitQuiz,
  getAllUserQuizzes,
  getUserQuizById,
};
