import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-10">
      {/* Quiz Card */}
      <div
        className="bg-white p-10 rounded-xl shadow text-center"
        // style={{
        //   background:
        //     "linear-gradient(to left, rgba(55, 48, 163, 0.9), rgba(37, 99, 235, 0.9))",
        // }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready for a New Challenge?</h2>
        <NavLink
          to="/quiz"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 inline-block"
        >
          Start New Quiz
        </NavLink>
      </div>

      {/* Practice Record Cards */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-6">Your Practice Record</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 text-center shadow">
            <h4 className="font-bold text-lg">Total Quizzes</h4>
            <p className="text-gray-600 text-xl mt-2">5</p>
          </div>
          <div className="border rounded-lg p-4 text-center shadow">
            <h4 className="font-bold text-lg">Correct Answers</h4>
            <p className="text-green-600 text-xl mt-2">22</p>
          </div>
          <div className="border rounded-lg p-4 text-center shadow">
            <h4 className="font-bold text-lg">Wrong Answers</h4>
            <p className="text-red-600 text-xl mt-2">8</p>
          </div>
          <div className="border rounded-lg p-4 text-center shadow">
            <h4 className="font-bold text-lg">Accuracy</h4>
            <p className="text-blue-600 text-xl mt-2">73.3%</p>
          </div>
          <div className="border rounded-lg p-4 text-center shadow">
            <h4 className="font-bold text-lg">Avg Time/Quiz</h4>
            <p className="text-purple-600 text-xl mt-2">4.5 min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
