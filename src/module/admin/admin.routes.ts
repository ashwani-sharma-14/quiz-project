import Router from "express";
import adminController from "./admin.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
const adminRouter = Router();
import { upload } from "@/middlewares/upload.middleware";
adminRouter.post("/signup", adminController.registerAdmin);
adminRouter.post("/login", adminController.login);
adminRouter.post("/logout", authenticateToken, adminController.logout);
adminRouter.post("/refresh", adminController.refreshToken);

adminRouter.post(
  "/upload",
  upload.single("file"),
  authenticateToken,
  adminController.uploadExcel
);

adminRouter.use(authenticateToken);
adminRouter.get("/questions", adminController.getAllQuestions);
adminRouter.get("/users", adminController.getAllUsers);
adminRouter.get("/questions/:id", adminController.getAllQuestionsById);
adminRouter.patch("/questions/:id", adminController.updateQuestion);
adminRouter.delete("/questions/:id", adminController.deleteQuestions);

export default adminRouter;
