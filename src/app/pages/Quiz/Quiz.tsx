import { useQuizStore } from "@/store/useQuizStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["Aptitude", "DSA"];
const topicsMap = {
  Aptitude: [
    "Numbers",
    "Percentage",
    "Profit and Loss",
    "Average",
    "Ratio and Proportion",
    "Mixture and Alligation",
    "Time and Work",
    "Time Speed Distance",
    "Pipes and Cisterns",
    "Algebra",
    "Trigonometry, Height, and Distance",
    "Geometry",
    "Probability",
    "Permutation and Combination (PnC)",
    "Age",
  ],
  DSA: [
    "Arrays",
    "Linked Lists",
    "Trees",
    "Sorting",
    "Searching",
    "Graphs",
    "Dynamic Programming",
    "Algorithm Complexity",
  ],
};

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("Mixed");
  const [questions, setQuestions] = useState(10);
  const [time, setTime] = useState(30);
  const createQuiz = useQuizStore((state) => state.createQuiz);
  const isCreatingQuiz = useQuizStore((state) => state.isCreatingQuiz);
  const navigator = useNavigate();

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Select a Category
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((sub) => (
                <button
                  key={sub}
                  className={`p-4 border rounded-xl text-lg font-medium transition ${
                    category === sub
                      ? "bg-blue-100 border-blue-500 text-blue-700 shadow"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCategory(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Choose Topics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2 hide-scrollbar ">
              {topicsMap[category as keyof typeof topicsMap]?.map((topic) => (
                <label
                  key={topic}
                  className="flex items-center gap-3 bg-gray-50 p-2 rounded-md border hover:bg-gray-100 transition"
                >
                  <input
                    type="checkbox"
                    checked={topics.includes(topic)}
                    onChange={() => toggleTopic(topic)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-700">{topic}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Set Quiz Preferences
            </h2>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Difficulty
              </label>
              <div className="flex flex-wrap gap-3">
                {["Mixed", "Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded-md border text-sm transition font-medium ${
                      difficulty === level
                        ? "bg-blue-100 border-blue-600 text-blue-700 shadow"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                value={questions}
                onChange={(e) => setQuestions(Number(e.target.value))}
                className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[screen-4rem] bg-gradient-to-br from-blue-50 to-white p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-10 space-y-8">
        <h1 className="text-3xl font-extrabold text-blue-700">
          Start New Practice
        </h1>

        {/* Stepper */}
        <div className="flex justify-between items-center relative pb-4">
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gray-200 z-0" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                step >= s
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Dynamic Step Content */}
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition"
            >
              Previous
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!category || (step === 2 && topics.length === 0)}
              className={`ml-auto px-6 py-2 rounded-md font-medium transition ${
                !category || (step === 2 && topics.length === 0)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
              onClick={() => {
                createQuiz({
                  category: category,
                  topics: topics,
                  difficulty: difficulty,
                  totalQuestions: questions,
                  timeLimit: time,
                });
                if (!isCreatingQuiz) {
                  navigator("/quiz/quizScreen");
                }
              }
              }
            >
              Start Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
