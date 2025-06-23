import { useState } from "react";
import { NavLink } from "react-router-dom";

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
  const [time, setTime] = useState(30);;
  const mode="Review";

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
            <h2 className="text-xl font-semibold mb-4">Select Category </h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((sub) => (
                <button
                  key={sub}
                  className={`border p-4 rounded-lg ${
                    category === sub ? "bg-blue-100 border-blue-500" : ""
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
            <h2 className="text-xl font-semibold mb-4">Select Topics</h2>
            <div className="grid grid-cols-2 gap-4">
              {topicsMap[category as keyof typeof topicsMap]?.map((topic) => (
                <label key={topic} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={topics.includes(topic)}
                    onChange={() => toggleTopic(topic)}
                  />
                  {topic}
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Set Preferences</h2>
            <div>
              <label className="block mb-1 font-medium">Difficulty</label>
              <div className="flex gap-2">
                {["Mixed", "Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded border ${
                      difficulty === level ? "bg-blue-100 border-blue-600" : ""
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Number of Questions
              </label>
              <input
                type="number"
                value={questions}
                onChange={(e) => setQuestions(Number(e.target.value))}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Time Limit (in minutes)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            
          </div>
        );
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">
          Start New Practice
        </h1>

        {/* Step Indicator with Connection Line */}
        <div className="relative mb-6 flex items-center justify-between">
          <div className="absolute top-1/2 left-0 w-full border-t border-gray-200 z-0" />
          <div
            className={`relative z-10 text-sm font-medium px-2 bg-white ${
              step >= 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            1. Category
          </div>
          <div
            className={`relative z-10 text-sm font-medium px-2 bg-white ${
              step >= 2 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            2. Topics
          </div>
          <div
            className={`relative z-10 text-sm font-medium px-2 bg-white ${
              step >= 3 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            3. Preference
          </div>
        </div>

        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!category || (step === 2 && topics.length === 0)}
              className={`ml-auto px-6 py-2 rounded ${
                !category || (step === 2 && topics.length === 0)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          ) : (
            <NavLink
              to="/quizPage"
              state={{
                category,
                topics,
                difficulty,
                questions,
                time,
                mode,
                
              }}
            >
              <button className="ml-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Start
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
