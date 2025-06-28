"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Question } from "./QuestionsTable";

export interface ViewQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  data: {
    question: Question; 
    correctAns: string;
  };
}

const ViewDialog = ({ isOpen, onClose, data }: ViewQuestionsProp) => {

  const correctAnswer = data.correctAns;

  const question = data.question;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Question</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="font-semibold">{question.question}</div>
          <div className="space-y-1">
            {Object.entries(question.options).map(([key, value]) => (
              <div
                key={key}
                className={
                  key.toLowerCase() === correctAnswer.toLowerCase()
                    ? "font-bold text-green-600"
                    : ""
                }
              >
                
                <span className="font-mono mr-2">{key.toUpperCase()}.</span>
                {value}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <span className="font-semibold">Correct Answer: </span>
            <span className="text-green-600">{correctAnswer.toLowerCase()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
