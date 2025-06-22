import { Response, Request } from "express";
import { jobService } from "./job.service";
import { asyncWrap } from "@/utils/asyncWrap";

const createJob = asyncWrap(async (req: Request, res: Response) => {
  const job = await jobService.createJob(req.body);
  return res.json({ message: "job created", job });
});

const updateJob = asyncWrap(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id as string;
  const job = await jobService.updateJob(id, data);
  return res.json({ message: "job updated", job });
});

const deleteJob = asyncWrap(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const job = await jobService.deleteJob(id);
  return res.json({ message: "job deleted", job });
});

const getAllJobs = asyncWrap(async (_req: Request, res: Response) => {
  const jobs = await jobService.getAllJobs();
  return res.json({ message: "jobs fetched", jobs });
});

const getJobById = asyncWrap(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const job = await jobService.getJobById(id);
  return res.json({ message: "job fetched", job });
});

export const jobController = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
};
