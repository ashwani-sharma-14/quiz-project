"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import CreateQuestions from "./CreateQuestions";
import { toast } from "sonner";
import ViewDialog from "./ViewDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import CustomPagination from "@/components/shared/CustomPagination";
import { useQuestionStore } from "@/store/useQuestionStore";

export interface Topic {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
}

export interface Question {
  id: string;
  subject?: string;
  topic: Topic;
  question: string;
  options: Record<string, string>;
  correctAns: string;
  difficulty: string;
  topicId: string;
}

const ROWS_PER_PAGE = 10;

const QuestionsTable = () => {
  const fetchQuestions = useQuestionStore((s) => s.fetchQuestions);
  const updateQuestion = useQuestionStore((s) => s.updateQuestion);
  const deleteQuestion = useQuestionStore((s) => s.deleteQuestion);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const data = useQuestionStore((s) => s.questions);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      toast.info("No questions available. Please upload some.");
    } else {
      toast.dismiss();
    }
  }, [data]);

  const getOption = (options: Record<string, string>, key: string) => {
    const lowerKey = key.toLowerCase();
    const upperKey = key.toUpperCase();
    return options[lowerKey] ?? options[upperKey] ?? "-";
  };

  const filteredQuestions = data.filter(
    (q) =>
      q.topic?.category?.name?.toLowerCase().includes(filter.toLowerCase()) ||
      q.topic?.name?.toLowerCase().includes(filter.toLowerCase()) ||
      q.question?.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / ROWS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleUpdate = (updatedQuestion: Question, id: string) => {
    updateQuestion(id, updatedQuestion)
      .then(() => {
        toast.success("Question updated successfully");
        fetchQuestions();
        setEditOpen(false);
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        toast.error("Failed to update question");
      });
  };

  const handleDelete = (id: string) => {
    deleteQuestion(id)
      .then(() => {
        toast.success("Question deleted successfully");
        fetchQuestions();
        setDeleteOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
        toast.error("Failed to delete question");
      });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search questions..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> New Questions
        </Button>
      </div>

      <div className="rounded-xl border shadow-sm overflow-x-auto">
        <Table>
          <TableCaption className="text-muted-foreground text-sm">
            The total list of questions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">S.No</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Option A</TableHead>
              <TableHead>Option B</TableHead>
              <TableHead>Option C</TableHead>
              <TableHead>Option D</TableHead>
              <TableHead>Correct</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedQuestions.map((q, index) => (
              <TableRow key={q.id}>
                <TableCell className="text-center">
                  {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                </TableCell>
                <TableCell>{q.topic?.name}</TableCell>
                <TableCell>
                  {q.question.length > 40
                    ? `${q.question.substring(0, 40)}...`
                    : q.question}
                </TableCell>
                <TableCell>{getOption(q.options, "a")}</TableCell>
                <TableCell>{getOption(q.options, "b")}</TableCell>
                <TableCell>{getOption(q.options, "c")}</TableCell>
                <TableCell>{getOption(q.options, "d")}</TableCell>
                <TableCell>{q.correctAns ?? "-"}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedQuestion(q);
                          setViewOpen(true);
                        }}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedQuestion(q);
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedQuestion(q);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CreateQuestions
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => {
          toast.success("Questions uploaded successfully");
          fetchQuestions();
        }}
      />

      {selectedQuestion && (
        <ViewDialog
          isOpen={viewOpen}
          onClose={() => setViewOpen(false)}
          data={{
            question: selectedQuestion,
            correctAns: selectedQuestion.correctAns,
          }}
        />
      )}

      {selectedQuestion && (
        <EditDialog
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          question={selectedQuestion}
          onSave={(updatedQuestion) => {
            handleUpdate(updatedQuestion, selectedQuestion.id);
          }}
        />
      )}

      {selectedQuestion && (
        <DeleteDialog
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          question={selectedQuestion}
          onConfirm={() => handleDelete(selectedQuestion.id)}
        />
      )}
    </div>
  );
};

export default QuestionsTable;
