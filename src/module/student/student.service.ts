import prisma from "@/utils/prisma";
import { Prisma, User } from "@/generated/prisma";

export const createUser = async (
  data: Prisma.UserCreateInput
): Promise<User> => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }
  return user;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return null;
  }
  return user;
};


