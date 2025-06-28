"use client";

import {
  Dialog,
//   DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuestionStore } from "@/store/useQuestionStore";
import { ClipLoader } from "react-spinners";
// import { Upload } from "lucide-react";

export interface CreateQuestionsProp {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateQuestions = ({ isOpen, onClose }: CreateQuestionsProp) => {
  const [file, setFile] = useState<File | null>(null);

  const createQuestionsFromExcel = useQuestionStore(
    (s) => s.createQuestionsFromExcel
  );
  const loading = useQuestionStore((s) => s.loading);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile); 
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file first.");
      return;
    }
    
  
    await createQuestionsFromExcel(file);
    onClose();
    setFile(null);
    

    
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Excel File</DialogTitle>
          <DialogDescription>
            Upload a .xlsx or .xls file to add multiple questions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
          {file && (
            <p className="text-sm text-muted-foreground">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleUpload}>{loading? <ClipLoader color="white" loading={true} size={30} /> : "Upload"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestions;
