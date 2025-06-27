import Router from "express";
import { jobController } from "./job.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { uploadImage } from "@/middlewares/upload.middleware";

const jobRouter = Router();

jobRouter.use(authenticateToken);
jobRouter.post("/newjob", jobController.createJob);
jobRouter.get("/", jobController.getAllJobs);
jobRouter.get("/:id", jobController.getJobById);
jobRouter.patch("/:id", jobController.updateJob);
jobRouter.delete("/:id", jobController.deleteJob);
jobRouter.post(
  "/uploadlogo",
  authenticateToken,
  uploadImage.single("logo"),
  jobController.uploadLogo
);
export default jobRouter;
