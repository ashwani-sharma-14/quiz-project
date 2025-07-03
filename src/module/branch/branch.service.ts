import prisma from "@/utils/prisma";
import { Prisma, Branch } from "@/generated/prisma";

const findAdmin = async (email: string) => {
  const admin = await prisma.admin.findFirst({
    where: {
      email,
    },
  });
  if (!admin) return false;
  return true;
};

const createBranch = async (
  data: Prisma.BranchCreateInput,
  email: string
): Promise<Branch | null> => {
  const isAdmin = await findAdmin(email);
  if (!isAdmin) return null;
  const branch = await prisma.branch.create({ data });
  return branch;
};

const updateBranch = async (
  id: string,
  data: Prisma.BranchUpdateInput,
  email: string
): Promise<Branch | null> => {
  const isAdmin = await findAdmin(email);
  if (!isAdmin) return null;
  const branch = await prisma.branch.update({ where: { id }, data });
  return branch;
};

const deleteBranch = async (
  id: string,
  email: string
): Promise<Branch | null> => {
  const isAdmin = await findAdmin(email);
  if (!isAdmin) return null;
  const branch = await prisma.branch.delete({ where: { id } });
  return branch;
};

const getAllBranches = async (): Promise<Branch[]> => {
  const branches = await prisma.branch.findMany();
  return branches;
};

export const branchService = {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
};
