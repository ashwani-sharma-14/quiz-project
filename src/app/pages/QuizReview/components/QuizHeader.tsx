interface Props {
  category: string;
  topics: string;
  difficulty: string;
}

const QuizHeader: React.FC<Props> = ({ category, topics, difficulty }) => {
  return (
    <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded shadow-md">
      <div className="text-sm space-y-1">
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Topics:</strong> {topics}
        </p>
        <p>
          <strong>Difficulty:</strong> {difficulty}
        </p>
      </div>
    </div>
  );
};

export default QuizHeader;
