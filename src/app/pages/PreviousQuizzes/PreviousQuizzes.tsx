import { FaRedo } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useQuizStore } from "@/store/useQuizStore";
import { useEffect } from "react";

const PreviousQuizzes = () => {
  const getQuizList = useQuizStore((state) => state.getAllQuizzes);
  const quizData = useQuizStore((state) => state.quizList);

  useEffect(() => {
    if (!quizData) {
      getQuizList("1");
    }
  }, [quizData, getQuizList]);

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Recent Quizzes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizData.map((quiz, index) => (
          <NavLink
            to={`/quiz/${quiz.id}/review`}
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="quiz-info">
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {quiz.category}
              </h3>
              <p className="text-sm text-gray-600">
                {quiz.timeLimit ? `${quiz.timeLimit} Minutes | ` : ''}{quiz.totalQuestions} Questions
              </p>
            </div>
            <NavLink
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              to="/quizPage"
            >
              <FaRedo /> Reattempt
            </NavLink>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PreviousQuizzes;

