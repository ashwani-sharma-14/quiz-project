// src/data/quizResultData.ts

export interface QuizResult {
  title: string;
  totalQuestions: number;
  totalMarks: number;
  totalTime: number; // in minutes
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number; // in percentage
  completed: number; // in percentage
  timeTaken: number; // in minutes
  score: number;
}

export const dummyData: QuizResult = {
  title: "Aptitude Quiz 1",
  totalQuestions: 10,
  totalMarks: 10,
  totalTime: 30,
  correct: 8,
  incorrect: 2,
  skipped: 0,
  accuracy: 80,
  completed: 100,
  timeTaken: 26.5,
  score: 8,
};
