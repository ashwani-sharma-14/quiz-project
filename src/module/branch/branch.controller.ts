import { Response, Request } from "express";
import { branchService } from "./branch.service";
import { asyncWrap } from "@/utils/asyncWrap";

const createBranch = asyncWrap(async (req: Request, res: Response) => {
  const email = req.user?.email;
  if (!email) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }
  const data = req.body;
  const branch = await branchService.createBranch(data, email);
  if (!branch) {
    return res
      .status(401)
      .json({ success: false, message: "you are not authorized" });
  }
  return res
    .status(201)
    .json({ success: true, message: "Branch created successfully", branch });
});

const getAllBranches = asyncWrap(async (_req: Request, res: Response) => {
  const branches = await branchService.getAllBranches();
  return res.status(200).json({
    success: true,
    message: "Branches fetched successfully",
    branches,
  });
});

const updateBranch = asyncWrap(async (req: Request, res: Response) => {
  const email = req.user?.email;
  if (!email)
    return res
      .json({ success: false, message: "You are not authorized" })
      .status(401);
  const id = req.params.id as string;
  const data = req.body;
  const branch = await branchService.updateBranch(id, data, email);
  if (!branch) {
    return res
      .status(401)
      .json({ success: false, message: "you are not authorized" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Branch updated successfully", branch });
});

const deleteBranch = asyncWrap(async (req: Request, res: Response) => {
  const email = req.user?.email;
  if (!email) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }
  const id = req.params.id as string;
  const branch = await branchService.deleteBranch(id, email);
  if (!branch) {
    return res
      .status(401)
      .json({ success: false, message: "you are not authorized" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Branch deleted successfully", branch });
});

export const branchController = {
  createBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
};
