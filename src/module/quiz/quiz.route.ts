import { Router } from "express";
import { quizController } from "./quiz.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
const quizRouter = Router();
quizRouter.use(authenticateToken);
quizRouter.get("/newquiz", quizController.generateQuiz);
quizRouter.post("/submit", quizController.submitQuiz);
quizRouter.get("/userQuiz", quizController.getAllUserQuizzes);
quizRouter.get("/topics", quizController.getTopics);
quizRouter.get("/categories", quizController.getCategories);
quizRouter.get("/topics/:categoryId", quizController.getTopicsByCategoryId);
quizRouter.get("/:quizId", quizController.getUserQuizById);

export default quizRouter;
