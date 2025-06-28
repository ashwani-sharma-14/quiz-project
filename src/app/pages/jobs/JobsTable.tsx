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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ViewDialog from "./ViewDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { useJobStore } from "@/store/useJobStore";
import CreateJob from "./CreateJob";
import type { Job as JobType } from "./ViewDialog";
import CustomPagination from "@/components/shared/CustomPagination";

interface Jobs {
  id: string;
  logo: string;
  title: string;
  companyName: string;
  Vacancies: string;
  package: string;
}

interface JobStore {
  jobs: Jobs[];
  alljobs: () => Promise<void>;
}

const ROWS_PER_PAGE = 10;

const JobTable = () => {
  const { alljobs } = useJobStore<JobStore>(
    (state: unknown) => state as JobStore
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<JobType | null>(
    null
  );
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    alljobs();
  }, [alljobs]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const newJobs = (useJobStore.getState() as { jobs: JobType[] }).jobs;
  const filteredJobs = Array.isArray(newJobs)
    ? newJobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(filter.toLowerCase()) ||
          job.companyName.toLowerCase().includes(filter.toLowerCase())
      )
    : [];
  const totalPages = Math.ceil(filteredJobs.length / ROWS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search jobs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto"
          variant="default"
        >
          New Job <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-xl border shadow-sm overflow-x-auto">
        <Table>
          <TableCaption className="text-muted-foreground text-sm">
            The total list of jobs
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">S.No</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Apply Link</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job: JobType, index: number) => (
                <TableRow key={job.id}>
                  <TableCell className="text-center">
                    {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                  </TableCell>
                  <TableCell>
                    {job.logo ? (
                      <img
                        src={
                          job.logo.startsWith("http")
                            ? job.logo
                            : `/api/uploads/${job.logo.split("\\").pop()}`
                        }
                        alt="Logo"
                        className="h-10 w-10 object-contain rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{job.jobTitle}</TableCell>
                  <TableCell>{job.companyName}</TableCell>
                  <TableCell>{job.package || "-"}</TableCell>
                  <TableCell>
                    {job.applyLink ? (
                      <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Apply
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
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
                            setSelectedQuestion(job);
                            setViewOpen(true);
                          }}
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedQuestion(job);
                            setEditOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedQuestion(job);
                            setDeleteOpen(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <CreateJob
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => {
          toast.success("Job created successfully");
        }}
      />

      <ViewDialog
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        job={selectedQuestion}
      />

      <EditDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        job={selectedQuestion}
        onSave={() => {
          // handle update logic here
        }}
      />

      <DeleteDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        job={selectedQuestion}
        
      />
    </div>
  );
};

export default JobTable;
