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

export interface Topic {
  id: string;
  name: string;
  // Add other fields as needed
}

export interface Question {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: { a: string; b: string; c: string; d: string };
  correctAns: string;
  difficulty: string;
  topicId: string;
}

const ROWS_PER_PAGE = 10;

const QuestionsTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dummyQuestions: Question[] = [
    {
      id: "1",
      subject: "DSA",
      topic: "Arrays",
      question:
        "Find the index of a key in a sorted and rotated array using binary search approach efficiently.",
      options: {
        a: "Linear Search",
        b: "Binary Search",
        c: "Jump Search",
        d: "Exponential Search",
      },
      correctAns: "B",
      difficulty: "easy",
      topicId: "dsa",
    },
    {
      id: "2",
      subject: "Maths",
      topic: "Probability",
      question:
        "What is the probability of getting a head when tossing a fair coin once?",
      options: { a: "1/4", b: "1/2", c: "1", d: "0" },
      correctAns: "B",
      difficulty: "easy",
      topicId: "maths",
    },
  ];

  const filteredQuestions = dummyQuestions.filter(
    (q) =>
      q.subject.toLowerCase().includes(filter.toLowerCase()) ||
      q.topic.toLowerCase().includes(filter.toLowerCase()) ||
      q.question.toLowerCase().includes(filter.toLowerCase())
  );
  const totalPages = Math.ceil(filteredQuestions.length / ROWS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="space-y-6 p-6">
      {/* Top controls */}
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
          variant="default"
        >
          New Questions <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>

      {/* Questions Table */}
      <div className="rounded-xl border shadow-sm overflow-x-auto">
        <Table>
          <TableCaption className="text-muted-foreground text-sm">
            The total list of questions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">S.No</TableHead>
              <TableHead>Subject</TableHead>
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
                <TableCell>{q.subject}</TableCell>
                <TableCell>{q.topic}</TableCell>
                <TableCell>
                  {q.question.length > 40
                    ? q.question.substring(0, 40) + "..."
                    : q.question}
                </TableCell>
                <TableCell>{q.options.a}</TableCell>
                <TableCell>{q.options.b}</TableCell>
                <TableCell>{q.options.c}</TableCell>
                <TableCell>{q.options.d}</TableCell>
                <TableCell>{q.correctAns.toUpperCase()}</TableCell>
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
          toast.success("Questions Uploaded successfully");
        }}
      />

      <ViewDialog
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        question={selectedQuestion || dummyQuestions[0]}
      />

      <EditDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        question={selectedQuestion || dummyQuestions[0]}
        onSave={(updated) => {
          // Simulate update: replace in dummyQuestions if needed
          // (In real app, call API and refetch)
          toast.success("Question updated (simulated)");
        }}
      />

      <DeleteDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        question={selectedQuestion || dummyQuestions[0]}
        onConfirm={() => {
          // Simulate delete: remove from dummyQuestions if needed
          // (In real app, call API and refetch)
          toast.success("Question deleted (simulated)");
          setDeleteOpen(false);
        }}
      />
    </div>
  );
};

export default QuestionsTable;
