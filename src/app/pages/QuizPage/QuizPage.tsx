import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuizHeader from "./components/QuizHeader";
import QuestionPanel from "./components/QuestionPanel";
import SidePanel from "./components/SidePanel";
import InstructionModal from "./components/InstructionModal";
import SubmissionStatus from "./components/SubmissionStatus";
import SecurityAlert from "@/components/reusable/SecurityAlert";
import { useQuizStore } from "@/store/useQuizStore";
import {
  activateAllSecurityHooks,
  deactivateSecurityHooks,
} from "../../../utils/useQuizSecurity";

const QuizPage = () => {
  const navigate = useNavigate();
  const QuizData = useQuizStore((state) => state.createQuizState);
  const updateQuiz = useQuizStore((state) => state.updateQuiz);
  const isCreatingQuiz = useQuizStore((state) => state.isCreatingQuiz);

  const [showInstruction, setShowInstruction] = useState(true);
  const questions = QuizData?.questions || [];
  const { category, topics, difficulty, timeLimit } =
    QuizData?.userQuizData || {};

  const [normalizedQuestions, setNormalizedQuestions] = useState(questions);

  useEffect(() => {
    const transformed = questions.map((q) => ({
      ...q,
      options: Object.values(q.options),
    }));
    setNormalizedQuestions(transformed);
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [questionStatus, setQuestionStatus] = useState<string[]>(
    Array(questions.length).fill("unvisited")
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [reEnterFullscreen, setReEnterFullscreen] = useState(false);
  const [security, setSecurity] = useState(false);

  const quizTimeInSeconds = (Number(timeLimit) || 30) * 60;
  const [remainingTime, setRemainingTime] = useState(quizTimeInSeconds);

  const handleFinalSubmit = () => {
    deactivateSecurityHooks();
    localStorage.removeItem("switchAttempts");
    toast.success("Quiz submitted successfully.");
    const quidId = QuizData?.userQuizId;
    updateQuiz({
      userQuizId: quidId ?? "",
      timeTaken: (quizTimeInSeconds - remainingTime) / 60,
      answers: answers.map((answer, index) => ({
        questionId: String(questions[index].id),
        selectedAnswer: answer || "",
      })),
    });
    if (!isCreatingQuiz) {
      navigate(`/quiz/${quidId}/analysis`);
    }
  };

  const handleLeave = () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to end the quiz and leave?"
    );
    if (confirmLeave) {
      deactivateSecurityHooks();
      toast.warning("Quiz was exited before submission.");
      navigate("/");
    } else if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    }
  };

  useEffect(() => {
    if (security) {
      activateAllSecurityHooks();
      const el = document.documentElement;
      el.requestFullscreen?.();
      toast.success("Quiz started in secure fullscreen mode.");
    }
  }, [security]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Time's up! Submitting the quiz.");
          handleFinalSubmit();
          setShowSummary(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answers]);

  useEffect(() => {
    setSelectedOption(answers[currentIndex]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{
        message: string;
        fullscreen?: boolean;
      }>;
      const { message, fullscreen } = customEvent.detail;
      setAlertMessage(message);
      setReEnterFullscreen(!!fullscreen);
    };

    window.addEventListener("security-alert", handler);
    return () => window.removeEventListener("security-alert", handler);
  }, []);

  const handleNoOptionSelect = (message: string) => {
    if (!selectedOption) {
      setAlertMessage("Please select an option before proceeding.");
      return;
    }
    const updatedStatus = [...questionStatus];
    updatedStatus[currentIndex] = message;
    setQuestionStatus(updatedStatus);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-white p-4 overflow-hidden md:overflow-auto md:p-6 hide-scrollbar">
      {showInstruction ? (
        <InstructionModal
          setShowInstruction={setShowInstruction}
          setSecurity={setSecurity}
        />
      ) : (
        <>
          {alertMessage && (
            <SecurityAlert
              message={alertMessage}
              setSecurity={() => {
                setAlertMessage(null);

                if (reEnterFullscreen) {
                  const el = document.documentElement;
                  el.requestFullscreen?.();
                  setReEnterFullscreen(false);
                }

                const switchAttempts = Number(
                  localStorage.getItem("switchAttempts") || "0"
                );
                if (switchAttempts >= 3) {
                  toast.error(
                    "You switched tabs too many times. Quiz will now submit."
                  );
                  handleFinalSubmit();
                } else {
                  activateAllSecurityHooks();
                }
              }}
            />
          )}

          <div className="flex justify-end">
            <button
              onClick={handleLeave}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Leave Quiz
            </button>
          </div>

          <QuizHeader
            category={category ?? ""}
            topics={topics ? topics.join(", ") : ""}
            difficulty={difficulty ?? ""}
            remainingTime={remainingTime}
            onViewInstructions={() => setShowInstruction(true)}
          />

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {questions[currentIndex] && (
              <QuestionPanel
                question={normalizedQuestions[currentIndex]}
                selectedOption={selectedOption}
                onOptionChange={(value) => {
                  const updated = [...answers];
                  updated[currentIndex] = value;
                  setAnswers(updated);
                  setSelectedOption(value);
                }}
                onClear={() => {
                  const updated = [...answers];
                  updated[currentIndex] = null;
                  setAnswers(updated);
                  setSelectedOption(null);
                  const updatedStatus = [...questionStatus];
                  updatedStatus[currentIndex] = "unvisited";
                  setQuestionStatus(updatedStatus);
                }}
                onNext={() => handleNoOptionSelect("answered")}
                onSaveMarkForReview={() =>
                  handleNoOptionSelect("savedAndMarkedForReview")
                }
                setShowSummary={setShowSummary}
              />
            )}

            <SidePanel
              questions={normalizedQuestions}
              questionStatus={questionStatus}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>

          {showSummary && (
            <SubmissionStatus
              answered={questionStatus.filter((s) => s === "answered").length}
              reviewed={
                questionStatus.filter((s) => s === "savedAndMarkedForReview")
                  .length
              }
              total={questions.length}
              onConfirmSubmit={handleFinalSubmit}
              onClose={() => setShowSummary(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage;
