import { Router } from "express";
import { quizController } from "./quiz.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
const quizRouter = Router();
quizRouter.use(authenticateToken);
quizRouter.get("/newquiz", quizController.generateQuiz);
quizRouter.post("/submit", quizController.submitQuiz);
quizRouter.get("/user/:userId", quizController.getAllUserQuizzes);
quizRouter.get("/:quizId", quizController.getUserQuizById);

export default quizRouter;
