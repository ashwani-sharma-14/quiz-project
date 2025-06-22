import prisma from "@/utils/prisma";
import { Prisma, Admin } from "@/generated/prisma";

type ExcelQuestionRow = {
  category: string;
  topic: string;
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
};

const createAdmin = async (data: Prisma.AdminCreateInput): Promise<Admin> => {
  const admin = await prisma.admin.create({
    data,
  });
  return admin;
};

const findAdminByEmail = async (email: string): Promise<Admin | null> => {
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    return null;
  }
  return admin;
};

const saveQuestionsToDB = async (parsedData: ExcelQuestionRow[]) => {
  for (const row of parsedData) {
    const { category, topic, question, options, correctAnswer, difficulty } =
      row;

    const categoryRecord = await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });

    const topicRecord = await prisma.topic.upsert({
      where: {
        name_categoryId: {
          name: topic,
          categoryId: categoryRecord.id,
        },
      },
      update: {},
      create: {
        name: topic,
        categoryId: categoryRecord.id,
      },
    });

    await prisma.question.create({
      data: {
        question,
        options,
        correctAns: correctAnswer,
        difficulty,
        topicId: topicRecord.id,
      },
    });
  }

  return { success: true, message: "All questions saved successfully!" };
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      enrollment: true,
      branch: true,
      department: true,
      admissionYear: true,
      currentYear: true,
    },
  });
  return users;
};

const getAllQuestions = async () => {
  const questions = await prisma.question.findMany({
    include: {
      topic: {
        include: {
          category: true,
        },
      },
    },
  });
  return questions;
};

export const adminService = {
  createAdmin,
  findAdminByEmail,
  saveQuestionsToDB,
  getAllUsers,
  getAllQuestions,
};
