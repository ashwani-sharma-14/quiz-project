import { Response, Request } from "express";
import { jobService } from "./job.service";
import { asyncWrap } from "@/utils/asyncWrap";
import fs from "fs";
import path from "path";

const createJob = asyncWrap(async (req: Request, res: Response) => {
  const job = await jobService.createJob(req.body);
  return res.json({ success: true, message: "job created", job }).status(201);
});

const updateJob = asyncWrap(async (req: Request, res: Response) => {
  const data = req.body;
  
  const id = req.params.id as string;
  const job = await jobService.updateJob(id, data);
  return res.json({ success: true, message: "job updated", job });
});

const deleteJob = asyncWrap(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const job = await jobService.deleteJob(id);
  return res.json({ success: true, message: "job deleted", job });
});

const getAllJobs = asyncWrap(async (_req: Request, res: Response) => {
  const jobs = await jobService.getAllJobs();
  return res.json({ success: true, message: "jobs fetched", jobs });
});

const getJobById = asyncWrap(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const job = await jobService.getJobById(id);
  return res.json({ success: true, message: "job fetched", job });
});

const uploadLogo = asyncWrap(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res.status(401).json({ success: true, message: "No file uploaded" });
  }

  const uploadDir = path.join(__dirname, "../../../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const logo = path.join(uploadDir, file.originalname);

  fs.writeFileSync(logo, file.buffer);

  return res.json({ success: true, message: "logo uploaded", logo });
});

export const jobController = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
  uploadLogo,
};
