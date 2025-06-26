interface Props {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    selectedAnswer?: string | null;
  };
  onPrev: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
  onFinish?: () => void; // Added optional onFinish property
}

const QuestionPanel: React.FC<Props> = ({
  question,
  onPrev,
  onNext,
  isLastQuestion,
  onFinish = () => {}, // Default to empty function if not provided
}) => {
  const {
    id,
    question: qText,
    options,
    correctAnswer,
    selectedAnswer,
  } = question;

  const renderOption = (option: string, idx: number) => {
    let bgColor = "bg-gray-100 text-black";
    if (option === correctAnswer) bgColor = "bg-green-500 text-white";
    else if (selectedAnswer === option) bgColor = "bg-red-500 text-white";

    return (
      <label
        key={idx}
        className={`block p-3 rounded ${bgColor} border cursor-default`}
      >
        <input
          type="radio"
          name={`question-${id}`}
          value={option}
          checked={selectedAnswer === option}
          disabled
          className="mr-2"
        />
        {option}
      </label>
    );
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">
        Q{id}. {qText}
      </h2>

      <div className="space-y-3 mb-6">{options.map(renderOption)}</div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          disabled={id === 1}
        >
          Previous
        </button>
        <button
          onClick={isLastQuestion ? onFinish : onNext}
          className={`${
            isLastQuestion
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded`}
        >
          {isLastQuestion ? "Finish Review" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;
