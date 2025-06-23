// src/components/QuizAnalysis.tsx

import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMinusCircle,
  FaBullseye,
  FaClipboardCheck,
  FaClock,
} from "react-icons/fa";
import { dummyData } from "./dummydata";
import ProgressBar from "./components/ProgressBar";
import { NavLink } from "react-router-dom";

const QuizAnalysis: React.FC = () => {
  const {
    title,
    totalQuestions,
    totalMarks,
    totalTime,
    correct,
    incorrect,
    skipped,
    accuracy,
    completed,
    timeTaken,
    score,
  } = dummyData;
 


 

  return (
    <div className="min-h-[screen-4rem] bg-gray-50 px-4 py-8 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-blue-100 p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{title}</h1>
            <p className="text-sm text-blue-800">
              📄 {totalQuestions} Questions • {totalMarks} Marks • {totalTime}{" "}
              Minutes
            </p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <NavLink
              to="/quizPage"
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-200 transition"
              
            >
              Reattempt
            </NavLink>
            <NavLink
              to="/quizPage"
              className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              View Solutions
            </NavLink>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProgressBar
            icon={<FaCheckCircle className="text-green-600" />}
            label="Correct"
            value={correct}
            max={totalQuestions}
          />
          <ProgressBar
            icon={<FaTimesCircle className="text-red-500" />}
            label="Incorrect"
            value={incorrect}
            max={totalQuestions}
          />
          <ProgressBar
            icon={<FaMinusCircle className="text-gray-500" />}
            label="Skipped"
            value={skipped}
            max={totalQuestions}
          />
          <ProgressBar
            icon={<FaBullseye className="text-yellow-500" />}
            label="Accuracy"
            value={accuracy}
            max={100}
            percent
          />
          <ProgressBar
            icon={<FaClipboardCheck className="text-purple-500" />}
            label="Completed"
            value={completed}
            max={100}
            percent
          />
          <ProgressBar
            icon={<FaClock className="text-blue-600" />}
            label="Time Taken"
            value={timeTaken}
            max={totalTime}
            valueText={`${timeTaken} mins`}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizAnalysis;
