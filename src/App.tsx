import { Toaster } from "sonner";
import Routes from "./routes/Route";
import UploadToast from "@/components/shared/UploadToast";

const App = () => {
  return (
    <div>
      <Toaster richColors position="top-center" />
      <Routes />
      <UploadToast />
    </div>
  );
};

export default App;
