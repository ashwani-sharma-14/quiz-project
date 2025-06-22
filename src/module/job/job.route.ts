import Router from "express";
import { jobController } from "./job.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";

const jobRouter = Router();
jobRouter.use(authenticateToken);
jobRouter.post("/newjob", jobController.createJob);
jobRouter.get("/", jobController.getAllJobs);
jobRouter.get("/:id", jobController.getJobById);
jobRouter.put("/:id", jobController.updateJob);
jobRouter.delete("/:id", jobController.deleteJob);
export default jobRouter;
