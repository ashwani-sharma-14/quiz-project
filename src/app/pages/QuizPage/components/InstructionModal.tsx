import React from "react";
import { useNavigate } from "react-router-dom";

interface InstructionPageProps {
  setShowInstruction: (show: boolean) => void;
  setSecurity: (show: boolean) => void;

}

const InstructionPage: React.FC<InstructionPageProps> = ({
  setShowInstruction,setSecurity
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-center text-gray-800">
          GENERAL INSTRUCTIONS
        </h1>
      </div>

      {/* Instructions */}
      <div className="flex flex-col items-center px-4 sm:px-8 py-8">
        <div className="w-full max-w-3xl text-justify">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Please read the instructions carefully
            </h2>
          </div>

          <ol className="list-decimal list-inside text-gray-700 space-y-3 text-base">
            <li>
              Total duration of the test is <strong>60 minutes</strong>.
            </li>
            <li>
              The test contains <strong>10 multiple choice questions</strong>{" "}
           
              <strong>Numbers, Profit and Loss, Probability</strong> 
            </li>
            <li>
              There is only <strong>one correct response</strong> for each
              question.
            </li>
            <li>
              <strong>1 marks</strong> will be awarded for each correct answer,
              and. Maximum marks are <strong>10</strong>.
            </li>
            <li>
              Once the quiz starts, you will enter{" "}
              <strong>fullscreen mode</strong>. Exiting fullscreen is not
              allowed during the test.
            </li>
            <li>
              <strong>Back navigation</strong> is disabled during the quiz. You
              cannot use the browser’s back button to leave the quiz.
            </li>
            <li>
              <strong>Right-click</strong> is disabled. You will not be able to
              open the context menu during the test.
            </li>
            <li>
              <strong>Tab switching is strictly prohibited.</strong> If you
              switch tabs more than once, your quiz will be auto-submitted.
            </li>
          </ol>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="w-full flex justify-end gap-4 px-6 py-4 border-t border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={() => {
            setShowInstruction(false);
            setSecurity(true);
          }}
          className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstructionPage;
