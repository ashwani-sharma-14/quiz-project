interface Question {
  id: number;
}

interface Props {
  questions: Question[];
  currentIndex: number;
  questionResults: {
    isCorrect: boolean;
  }[];
  setCurrentIndex: (index: number) => void;
}

const SidePanel = ({
  questions,
  currentIndex,
  questionResults,
  setCurrentIndex,
}: Props) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md w-full md:w-72">
      <h3 className="font-semibold text-lg mb-4 text-center">
        Review Questions
      </h3>
      <div className="grid grid-cols-6 gap-2">
        {questions.map((_, i) => {
          const { isCorrect } = questionResults[i];
          let colorClass = isCorrect
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white";

          if (i === currentIndex) {
            colorClass += " ring-2 ring-yellow-400";
          }

          return (
            <button
              key={i}
              className={`w-8 h-8 rounded-full text-sm ${colorClass}`}
              onClick={() => setCurrentIndex(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="text-xs mt-4 space-y-1">
        <p>🟢 Correct</p>
        <p>🔴 Incorrect</p>
        <p>🟡 Current</p>
      </div>
    </div>
  );
};

export default SidePanel;
