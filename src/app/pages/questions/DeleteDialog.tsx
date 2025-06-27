"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Question } from "./QuestionsTable";

export interface DeleteQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  question: Question;
}

const DeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  question,
}: DeleteQuestionsProp) => {
  if (!question) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Question</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          Are you sure you want to delete this question?
          <div className="mt-2 p-2 bg-muted rounded text-sm">
            {question.question}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
