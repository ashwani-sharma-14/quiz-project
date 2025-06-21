// Quiz.tsx
import { useState } from "react";

const subjects = ["Aptitude", "DSA"];
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
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("Mixed");
  const [questions, setQuestions] = useState(10);
  const [time, setTime] = useState(30);
  const [mode, setMode] = useState("Practice");

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
            <h2 className="text-xl font-semibold mb-4">Select Subject</h2>
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  className={`border p-4 rounded-lg ${
                    subject === sub ? "bg-blue-100 border-blue-500" : ""
                  }`}
                  onClick={() => setSubject(sub)}
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
              {topicsMap[subject as keyof typeof topicsMap]?.map((topic) => (
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
                {["Mixed","Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded border ${
                      difficulty === level
                        ? "bg-blue-100 border-blue-600"
                        : ""
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

            <div>
              <label className="block mb-1 font-medium">Mode</label>
              <div className="flex gap-2">
                {["Practice", "Exam"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-4 py-2 border rounded ${
                      mode === m ? "bg-blue-100 border-blue-600" : ""
                    }`}
                  >
                    {m} Mode
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        Start New Practice
      </h1>
      <div className="mb-6 flex items-center justify-between">
        <div
          className={`step ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}
        >
          1. Subject
        </div>
        <div
          className={`step ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}
        >
          2. Chapter
        </div>
        <div
          className={`step ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}
        >
          3. Preference
        </div>
      </div>
      {renderStep()}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="btn-secondary">
            Previous
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="btn-primary ml-auto"
          >
            Next
          </button>
        ) : (
          <button className="btn-primary ml-auto">Start Practice</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
