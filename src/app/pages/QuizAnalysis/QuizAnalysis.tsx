import React, { useEffect, useMemo } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBullseye,
  FaClock,
} from "react-icons/fa";
import ProgressBar from "./components/ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizStore } from "@/store/useQuizStore";
import { Button } from "@/components/ui/button";

const QuizAnalysis: React.FC = () => {
  const { id } = useParams();
  const quizId = id;
  const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
  const quizData = useQuizStore((state) => state.fetchQuizState);
  const isLoading = useQuizStore((state) => state.isCheckingQuiz);

  const navigate = useNavigate();

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId);
    }
  }, [quizId]);


  const handleReview = () => {
    navigate(`/quiz/${quizId}/review`);
  };

  // Memoized values for better performance
  const correctCount = useMemo(
    () => Object.keys(quizData?.correct || {}).length,
    [quizData?.correct]
  );

  const wrongCount = useMemo(
    () => Object.keys(quizData?.wrong || {}).length,
    [quizData?.wrong]
  );

  const accuracy = useMemo(() => {
    const total = quizData?.totalQuestions || 1;
    return (correctCount / total) * 100;
  }, [correctCount, quizData?.totalQuestions]);

  if (isLoading || !quizData || Object.keys(quizData).length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading Quiz Analysis...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-8 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-blue-100 p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{quizData?.category}</h1>
            <p className="text-sm text-blue-800">
              {quizData?.totalQuestions} Questions • {quizData?.totalQuestions}{" "}
              Marks • {quizData?.timeLimit} Minutes
            </p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
           
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
          {correctCount}/{quizData?.totalQuestions}
        </p>

        {/* Progress Bars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <ProgressBar
            icon={<FaCheckCircle className="text-green-600" />}
            label="Correct"
            value={correctCount}
            max={quizData?.totalQuestions ?? 0}
          />
          <ProgressBar
            icon={<FaTimesCircle className="text-red-500" />}
            label="Incorrect"
            value={wrongCount}
            max={quizData?.totalQuestions ?? 0}
          />
          <ProgressBar
            icon={<FaBullseye className="text-yellow-500" />}
            label="Accuracy"
            value={accuracy}
            max={100}
            percent
          />
          <ProgressBar
            icon={<FaClock className="text-blue-600" />}
            label="Time Taken"
            value={quizData?.timeTaken ?? 0}
            max={quizData?.timeLimit ?? 0}
            valueText={`${quizData?.timeTaken ?? 0} mins`}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizAnalysis;
