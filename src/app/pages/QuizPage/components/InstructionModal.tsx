import React from "react";
import { X } from "lucide-react"; // Optional: using lucide-react icons

interface InstructionModalProps {
  onStart: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-11/12 max-w-2xl shadow-xl text-center relative">
        {/* ❌ Close button */}
        <button
          onClick={onStart}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <ul className="text-left list-disc px-6 space-y-2 text-sm text-gray-700">
          <li>Read all questions carefully before answering.</li>
          <li>Each question has only one correct answer.</li>
          <li>You cannot skip questions without selecting an answer.</li>
          <li>You can review and change answers before submission.</li>
          <li>The timer starts once the quiz begins.</li>
          <li>
            Click “Submit” to finish the quiz anytime before the timer ends.
          </li>
        </ul>
        <button
          onClick={onStart}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue to Quiz
        </button>
      </div>
    </div>
  );
};

export default InstructionModal;
