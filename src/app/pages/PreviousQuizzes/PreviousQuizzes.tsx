import { FaRedo } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const quizData = [
  {
    title: "Aptitude Test-03",
    marks: 100,
    duration: 180,
    questions: 100,
  },
  {
    title: "Aptitude Test-02",
    marks: 100,
    duration: 180,
    questions: 100,
  },
  {
    title: "Aptitude Test-01",
    marks: 100,
    duration: 180,
    questions: 100,
  },
  {
    title: "DSA Test-03",
    marks: 100,
    duration: 180,
    questions: 100,
  },
  {
    title: "DSA Test-02",
    marks: 100,
    duration: 180,
    questions: 100,
  },
  {
    title: "DSA Test-01",
    marks: 100,
    duration: 180,
    questions: 100,
  },
];

const PreviousQuizzes = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Recent Quizzes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizData.map((quiz, index) => (
          <NavLink
            to="/quizPage"
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="quiz-info">
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {quiz.title}
              </h3>
              <p className="text-sm text-gray-600">
                {quiz.marks} Marks
                {quiz.duration && ` | ${quiz.duration}`} Minutes | {quiz.questions}{" "}
                Questions
              </p>
            </div>
            <NavLink className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" to="/quizPage">
              <FaRedo /> Reattempt
            </NavLink>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PreviousQuizzes;
