import { useEffect, useState } from "react";
import QuizHeader from "./components/QuizHeader";
import SidePanel from "./components/SidePanel";
import QuestionPanel from "./components/QuestionPanel";
import { useQuizStore } from "@/store/useQuizStore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
  const fetchQuizData = useQuizStore((state) => state.fetchQuizState);

  useEffect(() => {
    if (id) {
      fetchQuiz(id);
    }
  }, [id]);

  if (!fetchQuizData) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading Review...</div>
    );
  }

  const { category, topics, difficulty, quizQuestions, userAnswers } =
    fetchQuizData;

  const userAnswerMap = userAnswers.reduce((acc, answer) => {
    acc[answer.questionId] = answer;
    return acc;
  }, {} as Record<string, { selected: string; correct: string }>);

  const questions = quizQuestions.map((q, index) => {
    const answer = userAnswerMap[q.questionId];
    return {
      id: index + 1,
      question: q.questions.question,
      options: Object.values(q.questions.options),
      correctAnswer: answer?.correct || "",
      selectedAnswer: answer?.selected || null,
    };
  });

  const currentQuestion = questions[currentIndex];

  const questionResults = questions.map((q) => ({
    isCorrect: q.selectedAnswer === q.correctAnswer,
  }));

  const handleFinish = () => {
    toast.success("Review completed!");
    navigate(-1);
  };

  return (
    <>
      <QuizHeader
        category={category}
        topics={topics.join(", ")}
        difficulty={difficulty}
      />
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <SidePanel
          questions={questions}
          currentIndex={currentIndex}
          questionResults={questionResults}
          setCurrentIndex={setCurrentIndex}
        />
        <QuestionPanel
          question={currentQuestion}
          onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          onNext={() =>
            setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))
          }
          isLastQuestion={currentIndex === questions.length - 1}
          onFinish={handleFinish}
        />
      </div>
    </>
  );
};

export default ReviewPage;
