import React, { useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBullseye,
  FaClock,
} from "react-icons/fa";
import ProgressBar from "./components/ProgressBar";
import {  useNavigate, useParams } from "react-router-dom";
import { useQuizStore } from "@/store/useQuizStore";
import { Button } from "@/components/ui/button";

const QuizAnalysis: React.FC = () => {
  const { quizId } = useParams();
  const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
  const quizData = useQuizStore((state) => state.createQuizState);

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId);
    }
  }, [quizId]);

  const navigate = useNavigate();

  if (!quizData?.userQuizData) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading analysis...</div>
    );
  }

  const {
    category,
    totalQuestions,
    timeLimit,
    score,
    correct,
    incorrect,
    accuracy,
    timeTaken,
  } = quizData.userQuizData;

  const totalMarks = totalQuestions;

  const handleReattempt = () => {
    navigate(`/quiz/quizScreen`);
  };

  const handleReview = () => {
   navigate(`/quiz/${quizId}/review`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-8 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-blue-100 p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{category}</h1>
            <p className="text-sm text-blue-800">
              📄 {totalQuestions} Questions • {totalMarks} Marks • {timeLimit}{" "}
              Minutes
            </p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Button
              onClick={handleReattempt}
            
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-200 transition"
            >
              Reattempt
            </Button>
            <Button
              onClick={handleReview}
              className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              View Solutions
            </Button>
          </div>
        </div>
      </div>

      {/* Score Summary */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-blue-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Result Summary</h2>
          <img
            src="https://img.icons8.com/color/48/combo-chart--v1.png"
            alt="chart"
            className="w-6 h-6"
          />
        </div>
        <p className="text-4xl font-bold text-blue-700 mb-6">
          {score}/{totalMarks}
        </p>

        {/* Progress Bars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <ProgressBar
            icon={<FaCheckCircle className="text-green-600" />}
            label="Correct"
            value={correct ?? 0}
            max={totalQuestions}
          />
          <ProgressBar
            icon={<FaTimesCircle className="text-red-500" />}
            label="Incorrect"
            value={incorrect ?? 0}
            max={totalQuestions}
          />
          <ProgressBar
            icon={<FaBullseye className="text-yellow-500" />}
            label="Accuracy"
            value={accuracy ?? 0}
            max={100}
            percent
          />
          <ProgressBar
            icon={<FaClock className="text-blue-600" />}
            label="Time Taken"
            value={timeTaken ?? 0}
            max={timeLimit}
            valueText={`${timeTaken ?? 0} mins`}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizAnalysis;
