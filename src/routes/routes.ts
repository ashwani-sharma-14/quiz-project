import { Router } from "express";
import userRouter from "@/module/student/student.route";
import adminRouter from "@/module/admin/admin.routes";
import quizRouter from "@/module/quiz/quiz.route";
const v1Router = Router();

const routes = [
  { path: "/user", router: userRouter },
  { path: "/admin", router: adminRouter },
  { path: "/quiz", router: quizRouter },
];

routes.forEach((route) => v1Router.use(route.path, route.router));

export default v1Router;
