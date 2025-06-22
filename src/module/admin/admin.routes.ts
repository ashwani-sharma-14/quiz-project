import Router from "express";
import adminController from "./admin.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
const adminRouter = Router();
import { upload } from "@/middlewares/upload.middleware";
adminRouter.post("/signup", adminController.registerAdmin);
adminRouter.post("/login", adminController.login);
adminRouter.post("/logout", authenticateToken, adminController.logout);

adminRouter.post(
  "/upload",
  upload.single("file"),
  authenticateToken,
  adminController.uploadExcel
);
export default adminRouter;
