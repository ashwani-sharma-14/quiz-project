import { Router } from "express";
import userRouter from "@/module/student/student.route";

const v1Router = Router();

const routes = [{ path: "/user", router: userRouter }];

routes.forEach((route) => v1Router.use(route.path, route.router));

export default v1Router;
