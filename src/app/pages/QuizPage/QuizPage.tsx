import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizHeader from "./components/QuizHeader";
import QuestionPanel from "./components/QuestionPanel";
import SidePanel from "./components/SidePanel";
import InstructionModal from "./components/InstructionModal";
import SubmissionStatus from "./components/SubmissionStatus";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const dummyQuestions: Question[] = [
  {
    id: 1,
    question:
      "Given a coin which gives HEADS with probability 1/4 and TAILS with 3/4. The coin is tossed k times. What is the probability that we get at least k/2 HEADS is less than or equal to?",
    options: ["(1/2) k/5", "(1/2) k/2", "(1/3) k/2", "(1/5) k/2"],
    correctAnswer: "A",
  },
  {
    id: 2,
    question:
      "Out of all the 2-digit integers between 1 and 100, a 2-digit number has to be selected at random. What is the probability that the selected number is not divisible by 7?",
    options: ["13/90", "12/90", "78/90", "77/90"],
    correctAnswer: "D",
  },
  {
    id: 3,
    question:
      "If the difference between expectation of the square of a random variable (E[X²]) and the square of the expectation of the random variable (E[X])² is denoted by R, then?",
    options: ["R = 0", "R < 0", "R >= 0", "R > 0"],
    correctAnswer: "C",
  },
  {
    id: 4,
    question:
      "Let X be a random variable following normal distribution with mean +1 and variance 4. Let Y be another normal variable with mean -1 and variance unknown. If P(X <= -1) = P(Y >= 2), the standard deviation of Y is?",
    options: ["3", "2", "sqrt(2)", "1"],
    correctAnswer: "B",
  },
  {
    id: 5,
    question:
      "The probability that a given positive integer lying between 1 and 100 (both inclusive) is NOT divisible by 2, 3 or 5 is ______.",
    options: ["0.259", "0.459", "0.325", "0.225"],
    correctAnswer: "A",
  },
  {
    id: 6,
    question: "Were you a bird, you ______________ in the sky.",
    options: ["would fly", "shall fly", "should fly", "shall have flown"],
    correctAnswer: "A",
  },
  {
    id: 7,
    question:
      "Choose the most appropriate word from the options given below to complete the following sentence. If you are trying to make a strong impression on your audience, you cannot do so by being understated, tentative or_____________.",
    options: ["Hyperbolic", "Restrained", "Argumentative", "Indifferent"],
    correctAnswer: "D",
  },
  {
    id: 8,
    question:
      "Choose the most appropriate word from the options given below to complete the following sentence: If we manage to ____________ our natural resources, we would leave a better planet for our children.",
    options: ["uphold", "restrain", "cherish", "conserve"],
    correctAnswer: "D",
  },
  {
    id: 9,
    question:
      "Choose the most appropriate word from the options given below to complete the following sentence. He could not understand the judges awarding her the first prize, because he thought that her performance was quite __________.",
    options: ["superb", "medium", "mediocre", "exhilarating"],
    correctAnswer: "C",
  },
  {
    id: 10,
    question:
      "Which of the following options is the closest in meaning to the sentence below?\nShe enjoyed herself immensely at the party.",
    options: [
      "She had a terrible time at the party",
      "She had a horrible time at the party",
      "She had a terrific time at the party",
      "She had a terrifying time at the party",
    ],
    correctAnswer: "C",
  },
];

const QuizPage = () => {
  const location = useLocation();
  const { category, topics, difficulty, time, mode } = location.state || {};

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

  const quizTimeInSeconds = (Number(time) || 30) * 60;
  const [remainingTime, setRemainingTime] = useState(quizTimeInSeconds);

  const navigate = useNavigate();

  const handleFinalSubmit = () => {
    const summary = {
      answers,
      questionStatus,
      score: 0,
    };
    navigate("/analysis", { state: summary });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedOption(answers[currentIndex]);
  }, [currentIndex]);

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

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
  };

  const updateStatus = (index: number, status: string) => {
    const updated = [...questionStatus];
    updated[index] = status;
    setQuestionStatus(updated);
  };

  const handleClear = () => {
    const updated = [...answers];
    updated[currentIndex] = null;
    setAnswers(updated);
    setSelectedOption(null);
    updateStatus(currentIndex, "unvisited");
  };

  const handleNext = () => {
    if (!selectedOption) {
      alert("Please select an option before moving to the next question.");
      return;
    }
    updateStatus(currentIndex, "answered");
    if (currentIndex < dummyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSaveMarkForReview = () => {
    if (!selectedOption) {
      alert("Please select an option before saving and marking for review.");
      return;
    }
    updateStatus(currentIndex, "savedAndMarkedForReview");
    if (currentIndex < dummyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      alert("Back navigation is disabled during the quiz.");
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        let attempts = Number(localStorage.getItem("switchAttempts") || "0");
        attempts += 1;
        localStorage.setItem("switchAttempts", String(attempts));

        if (attempts >= 2) {
          alert("You have switched tabs too many times. Submitting quiz.");
          handleFinalSubmit();
        } else {
          alert("Switching tabs is not allowed!");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const enterFullScreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  const preventFullScreenExit = () => {
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        alert("Exiting fullscreen is not allowed. Returning to quiz.");
        enterFullScreen();
      }
    });
  };

  useEffect(() => {
    if (!showInstruction) {
      enterFullScreen();
      preventFullScreenExit();
    }
  }, [showInstruction]);

  const handleLeave = () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to end the quiz and leave?"
    );
    if (confirmLeave) {
      handleFinalSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {showInstruction ? (
        <InstructionModal onStart={() => setShowInstruction(false)} />
      ) : (
        <>
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
              onOptionChange={handleOptionChange}
              onClear={handleClear}
              onNext={handleNext}
              onSaveMarkForReview={handleSaveMarkForReview}
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
