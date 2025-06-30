import React from "react";
import { useNavigate } from "react-router-dom";

interface InstructionPageProps {
  setShowInstruction: (show: boolean) => void;
  setSecurity: (show: boolean) => void;
}

const InstructionPage: React.FC<InstructionPageProps> = ({
  setShowInstruction,
  setSecurity,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[calc(100vh-8rem)] max-w-4xl bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden border border-gray-200 hide-scrollbar">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-blue-100 rounded-t-3xl">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          General Instructions
        </h1>
      </div>

      {/* Instructions */}
      <div className="px-6 sm:px-10 py-8 overflow-y-auto max-h-16rem scroll-smooth hide-scrollbar">
        <div className="text-gray-800 space-y-4">
          <h2 className="text-md font-semibold text-gray-700">
            Please read the instructions carefully:
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-gray-700">
            <li>
              Total duration of the test is <strong>60 minutes</strong>.
            </li>
            <li>
              The test contains <strong>10 multiple choice questions</strong>{" "}
              from <strong>Numbers, Profit and Loss, Probability</strong>.
            </li>
            <li>
              There is only <strong>one correct response</strong> for each
              question.
            </li>
            <li>
              <strong>1 mark</strong> will be awarded for each correct answer.
              Maximum marks are <strong>10</strong>.
            </li>
            <li>
              Once the quiz starts, you will enter{" "}
              <strong>fullscreen mode</strong>. Exiting fullscreen is not
              allowed.
            </li>
            <li>
              <strong>Back navigation</strong> is disabled during the quiz.
            </li>
            <li>
              <strong>Right-click</strong> is disabled. You won’t be able to
              open the context menu.
            </li>
            <li>
              <strong>Tab switching is strictly prohibited.</strong> Switching
              tabs more than once will auto-submit your quiz.
            </li>
          </ol>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={() => {
            setShowInstruction(false);
            setSecurity(true);
          }}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstructionPage;
