import { useQuestionStore } from "@/store/useQuestionStore";
import { Loader2, CheckCircle2 } from "lucide-react";

const UploadToast = () => {
  const { uploadToast } = useQuestionStore();

  if (!uploadToast.show) return null;

  return (
    <div className="fixed z-[9999] bottom-6 right-6 bg-white shadow-lg rounded-xl px-6 py-4 flex items-center gap-3 border border-indigo-200 animate-fade-in">
      {uploadToast.status === "uploading" ? (
        <Loader2 className="animate-spin text-indigo-600 h-6 w-6" />
      ) : (
        <CheckCircle2 className="text-green-600 h-6 w-6" />
      )}
      <span className="font-medium text-indigo-700">{uploadToast.message}</span>
    </div>
  );
};

export default UploadToast;
