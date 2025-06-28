"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useJobStore } from "@/store/useJobStore";
import { toast } from "sonner";
export interface Job {
  id: string;
  jobTitle: string;
}
interface JobStore {
  deleteJob: (id: string) => Promise<boolean>;
}
export interface DeleteJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

const DeleteDialog = ({
  isOpen,
  onClose,
  job,
}: DeleteJobDialogProps) => {
  const { deleteJob } = useJobStore((state: unknown) => state as JobStore);

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteJob(id);
      if (success) {
        window.location.reload();
        toast.success("Job deleted successfully");
      } else {
        toast.error("Failed to delete job");
      }
    } catch {
      toast.error("An error occurred while deleting the job");
    }
  };
  if (!job) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the job{" "}
          <span className="font-semibold">{job.jobTitle}</span>?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleDelete(job.id);
              onClose();
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
