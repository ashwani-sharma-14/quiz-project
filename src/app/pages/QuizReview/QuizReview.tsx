import { useEffect, useState } from "react";
import QuizHeader from "./components/QuizHeader";
import SidePanel from "./components/SidePanel";
import QuestionPanel from "./components/QuestionPanel";
import { useQuizStore } from "@/store/useQuizStore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ReviewPage = () => {
    const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { quizId } = useParams();

  const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
  const fetchQuizData = useQuizStore((state) => state.fetchQuizState);

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId);
    }
  }, [quizId]);

  if (!fetchQuizData) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading analysis...</div>
    );
  }

  const { category, topics, difficulty, correct, wrong, quizQuestions } =
    fetchQuizData;

  // Flatten the questions from nested structure
  const questions = quizQuestions.map((q) => ({
    id: q.questions.id,
    question: q.questions.question,
    options: q.questions.options,
    correctAnswer: correct.find((c) => c.questionId === q.questions.id)
      ? q.questions.options.find(() => true) ?? ""
      : "", // Optional fallback
    selectedAnswer: correct.find((c) => c.questionId === q.questions.id)
      ? q.questions.options.find(() => true) ?? ""
      : wrong.find((w) => w.questionId === q.questions.id)
      ? q.questions.options.find(() => false) ?? ""
      : null,
  }));
  

  const currentQuestion = questions[currentIndex];

  const onNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const onPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const questionResults = questions.map((q) => ({
    isCorrect: q.selectedAnswer === "correct",
  }));
    
    const handleFinish = () => {
        toast.success("Review completed successfully!");
        navigate(-1);//redirect to one page back
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
          onNext={onNext}
        onPrev={onPrev}
          isLastQuestion={currentIndex === questions.length - 1}
          onFinish={handleFinish}
        />
      </div>
    </>
  );
};

export default ReviewPage;
