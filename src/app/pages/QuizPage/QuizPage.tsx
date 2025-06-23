import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizHeader from "./components/QuizHeader";
import QuestionPanel from "./components/QuestionPanel";
import SidePanel from "./components/SidePanel";
import InstructionModal from "./components/InstructionModal";
import SubmissionStatus from "./components/SubmissionStatus";
import {
  activateAllSecurityHooks,
  activateFullscreenEnforcement,
  deactivateSecurityHooks,
} from "../../../utils/useQuizSecurity";
import { dummyQuestions } from "./data/dummyData";
import SecurityAlert from "@/components/reusable/SecurityAlert";

const QuizPage = () => {
  const location = useLocation();
  const { category, topics, difficulty, time, mode } = location.state || {};
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(dummyQuestions.length).fill(null)
  );
  const [questionStatus, setQuestionStatus] = useState<string[]>(
    Array(dummyQuestions.length).fill("unvisited")
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [reEnterFullscreen, setReEnterFullscreen] = useState(false);
  const [security, setSecurity] = useState(false);

  const quizTimeInSeconds = (Number(time) || 30) * 60;
  const [remainingTime, setRemainingTime] = useState(quizTimeInSeconds);

  const handleFinalSubmit = () => {
    deactivateSecurityHooks();
    localStorage.removeItem("switchAttempts");

    navigate("/quizAnalysis");
  };

  useEffect(() => {
    if (security && mode==="Exam") activateAllSecurityHooks();
  }, [security]);

  useEffect(() => {
    if (mode === "Review") {
      setAnswers(dummyQuestions.map((q) => q.correctAnswer));
      activateFullscreenEnforcement();
      setQuestionStatus(
        dummyQuestions.map(() => "answered")
      );
    } 
  }, [mode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time's up! Submitting...");
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

  const handleLeave = () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to end the quiz and leave?"
    );
    if (confirmLeave) {
      deactivateSecurityHooks();
      navigate("/");
    }
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    }
  };

  const handleNoOptionSelect = (message: string) => {
    if (!selectedOption && mode === "Exam") {
      setAlertMessage(
        "Please select an option before proceeding to the next question."
      );
      return;
    }
    const updatedStatus = [...questionStatus];
    updatedStatus[currentIndex] = message;
    setQuestionStatus(updatedStatus);
    if (currentIndex < dummyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {showInstruction && mode === "Exam" ? (
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
                  if (el.requestFullscreen) el.requestFullscreen();
                  setReEnterFullscreen(false);
                }

                // If user exceeded tab switch attempts, submit the quiz now
                const switchAttempts = Number(
                  localStorage.getItem("switchAttempts") || "0"
                );
                if (switchAttempts >= 3) {
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
            category={category}
            topics={topics}
            difficulty={difficulty}
            mode={mode}
            remainingTime={remainingTime}
              onViewInstructions={() => setShowInstruction(true)}
              
          />

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <QuestionPanel
              question={dummyQuestions[currentIndex]}
              selectedOption={selectedOption}
              mode={mode}
              onOptionChange={(value) => {
                const updated = [...answers];
                updated[currentIndex] = value;
                setAnswers(updated);
                setSelectedOption(value);
                }}
              onPrevious={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                }
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
              onNext={() => {
                handleNoOptionSelect("answered");
              }}
              onSaveMarkForReview={() => {
                handleNoOptionSelect("savedAndMarkedForReview");
              }}
              setShowSummary={setShowSummary}
            />

            <SidePanel
              questions={dummyQuestions}
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
              total={dummyQuestions.length}
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