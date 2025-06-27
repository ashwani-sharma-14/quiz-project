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
  question: Question;
}

const ViewDialog = ({ isOpen, onClose, question }: ViewQuestionsProp) => {
  if (!question) return null;

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
                  key.toLowerCase() === question.correctAns.toLowerCase()
                    ? "font-bold text-green-600"
                    : ""
                }
              >
                <span className="font-mono mr-2">{key.toUpperCase()}.</span>
                {value}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
