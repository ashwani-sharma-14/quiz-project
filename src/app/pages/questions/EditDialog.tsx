"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import type { Question } from "./QuestionsTable";

export interface EditQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Question) => void;
  question: Question;
}

const EditDialog = ({
  isOpen,
  onClose,
  question,
  onSave,
}: EditQuestionsProp) => {
  const [edited, setEdited] = useState<Question>(question);

  // Keep local state in sync if question changes
  // (e.g. when switching between questions)
  React.useEffect(() => {
    setEdited(question);
  }, [question]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={edited.question}
            onChange={(e) => setEdited({ ...edited, question: e.target.value })}
            placeholder="Edit question"
          />
          <div className="grid grid-cols-1 gap-2">
            {(["a", "b", "c", "d"] as const).map((key) => (
              <div key={key} className="flex items-center gap-2">
                <span className="font-mono w-4">{key.toUpperCase()}.</span>
                <Input
                  value={edited.options[key]}
                  onChange={(e) =>
                    setEdited({
                      ...edited,
                      options: { ...edited.options, [key]: e.target.value },
                    })
                  }
                  placeholder={`Option ${key.toUpperCase()}`}
                />
                <input
                  type="radio"
                  name="correctAns"
                  checked={edited.correctAns.toLowerCase() === key}
                  onChange={() => setEdited({ ...edited, correctAns: key })}
                  className="ml-2"
                  aria-label={`Mark ${key.toUpperCase()} as correct`}
                />
                <span className="text-xs text-muted-foreground">Correct</span>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onSave(edited);
              onClose();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
