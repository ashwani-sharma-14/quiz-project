import Router from "express";
import { userController } from "./student.controller";
import { asyncWrap } from "@/utils/asyncWrap";
const userRouter = Router();
userRouter.post("/signup", asyncWrap(userController.signUpUser));
userRouter.post("/login", asyncWrap(userController.login));
userRouter.get("/google", asyncWrap(userController.googleLogin));
export default userRouter;
