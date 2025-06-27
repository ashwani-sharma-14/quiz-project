"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface Job {
  id: string;
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  applyLink: string;
  package?: string;
  logo: string;
}

export interface ViewJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

const ViewDialog = ({ isOpen, onClose, job }: ViewJobDialogProps) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Job</DialogTitle>
          <DialogDescription>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {job.logo && (
                  <img
                    src={
                      job.logo.startsWith("http")
                        ? job.logo
                        : `/api/uploads/${job.logo.split("\\").pop()}`
                    }
                    alt="Logo"
                    className="h-16 w-16 object-contain rounded border"
                  />
                )}
                <div>
                  <div className="font-semibold text-lg">{job.jobTitle}</div>
                  <div className="text-sm text-muted-foreground">
                    {job.companyName}
                  </div>
                </div>
              </div>
              <div>
                <span className="font-medium">Description: </span>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                />
              </div>
              <div>
                <span className="font-medium">Package: </span>
                <span>{job.package || "-"}</span>
              </div>
              <div>
                <span className="font-medium">Apply Link: </span>
                {job.applyLink ? (
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {job.applyLink}
                  </a>
                ) : (
                  <span>-</span>
                )}
              </div>
              <div>
                <span className="font-medium">Job ID: </span>
                <span>{job.id}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
