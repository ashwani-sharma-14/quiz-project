import prisma from "@/utils/prisma";

import { Difficulty } from "@/generated/prisma";

interface QuizConfig {
  userId: number;
  category: string;
  topics: string[];
  difficulty: Difficulty;
  totalQuestions: number;
  timeLimit: number;
  mode: string;
}

interface AnswerSubmission {
  userQuizId: number;
  answers: {
    questionId: number;
    selectedAnswer: string;
  }[];
}
const generateQuiz = async (config: QuizConfig) => {
  const {
    userId,
    category,
    topics,
    difficulty,
    totalQuestions,
    timeLimit,
    mode,
  } = config;
  console.log("Data recieved", config);
  const categoryRecord = await prisma.category.findUnique({
    where: { name: category },
  });
  if (!categoryRecord) throw new Error("Invalid category");

  const topicRecords = await prisma.topic.findMany({
    where: {
      name: { in: topics },
      categoryId: categoryRecord.id,
    },
  });

  const topicIds = topicRecords.map((t) => t.id);

  if (topicIds.length === 0) throw new Error("No matching topics found");

  const attemptedQuestions = await prisma.attemptedQuestion.findMany({
    where: {
      userQuiz: {
        userId,
      },
    },
    select: {
      questionId: true,
    },
  });

  const attemptedQuestionIds = attemptedQuestions.map((a) => a.questionId);

  const availableQuestions = await prisma.question.findMany({
    where: {
      topicId: { in: topicIds },
      difficulty,
      id: { notIn: attemptedQuestionIds },
    },
  });

  if (availableQuestions.length === 0) {
    throw new Error("No unattempted questions available");
  }

  const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, totalQuestions);

  const userQuiz = await prisma.userQuiz.create({
    data: {
      userId,
      category,
      topics,
      difficulty,
      totalQuestions,
      timeLimit,
      mode,
      score: 0,
    },
  });

  const quizEntries = selected.map((q) => ({
    questionId: q.id,
    userQuizId: userQuiz.id,
  }));

  await prisma.quiz.createMany({
    data: quizEntries,
  });

  return {
    userQuizId: userQuiz.id,
    questions: selected.map(
      ({ id, question, options, difficulty, topicId }) => ({
        id,
        question,
        options,
        difficulty,
        topicId,
      })
    ),
  };
};

const submitQuiz = async ({ userQuizId, answers }: AnswerSubmission) => {
  const userQuiz = await prisma.userQuiz.findUnique({
    where: { id: userQuizId },
    include: { quizQuestions: true },
  });

  if (!userQuiz) throw new Error("Quiz not found");

  let correctCount = 0;
  let wrongCount = 0;

  for (const ans of answers) {
    const question = await prisma.question.findUnique({
      where: { id: ans.questionId },
    });

    if (!question) continue;

    await prisma.attemptedQuestion.create({
      data: {
        userQuizId,
        questionId: ans.questionId,
      },
    });

    if (ans.selectedAnswer === question.correctAns) {
      correctCount++;
      await prisma.correctQuestion.create({
        data: {
          userQuizId,
          questionId: ans.questionId,
        },
      });
    } else {
      wrongCount++;
      await prisma.wrongQuestion.create({
        data: {
          userQuizId,
          questionId: ans.questionId,
        },
      });
    }
  }

  const total = correctCount + wrongCount;
  const score = (correctCount / userQuiz.totalQuestions) * 100;

  await prisma.userQuiz.update({
    where: { id: userQuizId },
    data: {
      score,
    },
  });

  return {
    totalAttempted: total,
    correct: correctCount,
    wrong: wrongCount,
    score,
  };
};

const getAllUserQuizzes = async (userId: number) => {
  const quizzes = await prisma.userQuiz.findMany({
    where: { userId },
    select: {
      id: true,
      category: true,
      topics: true,
      difficulty: true,
      totalQuestions: true,
      timeLimit: true,
      score: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return quizzes;
};

const getUserQuizById = async (quizId: number) => {
  const quiz = await prisma.userQuiz.findUnique({
    where: { id: quizId },
    include: {
      quizQuestions: {
        include: {
          questions: {
            select: {
              id: true,
              question: true,
              options: true,
            },
          },
        },
      },
      correct: { select: { questionId: true } },
      wrong: { select: { questionId: true } },
      attempted: { select: { questionId: true } },
    },
  });

  if (!quiz) throw new Error("Quiz not found");

  return quiz;
};

export const quizService = {
  generateQuiz,
  submitQuiz,
  getAllUserQuizzes,
  getUserQuizById,
};
