import { NavLink } from "react-router-dom";
import { useQuizStore } from "@/store/useQuizStore";
import { useEffect } from "react";
import {
  FaClock,
  FaQuestion,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

const PreviousQuizzes = () => {
  const getQuizList = useQuizStore((state) => state.getAllQuizzes);
  const quizData = useQuizStore((state) => state.quizList);

  useEffect(() => {
    if (!quizData) {
      getQuizList();
    }
   
  }, [quizData, getQuizList]);
  console.log(quizData);

  if (!quizData || !quizData) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📚 Recent Quizzes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {quizData.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {quiz.category}
              </h3>

              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  {quiz.timeLimit ?? 0} Minutes
                </p>
                <p className="flex items-center gap-2">
                  <FaQuestion className="text-purple-500" />
                  {quiz.totalQuestions} Questions
                </p>
                <p className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Difficulty: {quiz.difficulty}
                </p>
                <p>
                  <strong>Topics:</strong>{" "}
                  {quiz.topics && quiz.topics.length > 0
                    ? quiz.topics.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full font-medium flex items-center gap-1">
                <FaCheckCircle />
                Score: {Math.round(quiz.score ?? 0)}%
              </span>

              <NavLink
                to={`/quiz/${quiz.id}/review`}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                View Review
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousQuizzes;
