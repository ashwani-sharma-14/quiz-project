import React from "react";

interface Props {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
  };
  selectedOption: string | null;
  onOptionChange: (value: string) => void;
  onClear: () => void;
  onNext: () => void;
  onSaveMarkForReview: () => void;
  setShowSummary: (value: boolean) => void;
  onPrevious?: () => void; // optional, for Review mode
  mode?: "Exam" | "Review";
}

const QuestionPanel: React.FC<Props> = ({
  question,
  selectedOption,
  onOptionChange,
  onClear,
  onNext,
  onSaveMarkForReview,
  setShowSummary,
  onPrevious,
  mode,
}) => {
  const renderOption = (option: string, idx: number) => {
    let bgColor = "bg-gray-100 hover:bg-gray-200";

    if (mode === "Review") {
      if (option === question.correctAnswer) {
        bgColor = "bg-green-100 border-l-4 border-green-500";
      } else if (
        selectedOption === option &&
        option !== question.correctAnswer
      ) {
        bgColor = "bg-red-100 border-l-4 border-red-500";
      } else {
        bgColor = "bg-gray-100";
      }
    }

    return (
      <label
        key={idx}
        className={`block p-3 rounded cursor-pointer ${bgColor}`}
      >
        <input
          type="radio"
          name={`question-${question.id}`}
          value={option}
          checked={selectedOption === option}
          disabled={mode === "Review"}
          onChange={() => onOptionChange(option)}
          className="mr-2"
        />
        {option}
      </label>
    );
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">
        Q{question.id}. {question.question}
      </h2>

      <div className="space-y-3 mb-4">{question.options.map(renderOption)}</div>

      <div className="flex flex-wrap gap-3 mt-4 items-center">
        {mode === "Exam" && (
          <>
            <button
              onClick={onClear}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Clear
            </button>
            <button
              onClick={onSaveMarkForReview}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save & Mark for Review
            </button>
            <button
              onClick={onNext}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save & Next
            </button>
            <button
              onClick={() => setShowSummary(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto"
            >
              Submit Quiz
            </button>
          </>
        )}

        {mode === "Review" && (
          <>
            <button
              onClick={onPrevious}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={onNext}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          </>
        )}

        {mode === "Review" && (
          <div className="mt-4 text-sm w-full p-4 border border-gray-300 rounded bg-gray-50 text-gray-800">
            <div className="mb-1">
              <span className="font-medium text-gray-700">Your Answer:</span>{" "}
              {selectedOption || "Not Answered"}
            </div>
            <div>
              <span className="font-medium text-gray-700">Correct Answer:</span>{" "}
              {question.correctAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPanel;
