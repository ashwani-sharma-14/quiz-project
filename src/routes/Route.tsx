import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "@/app/layout/BaseLayout";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("@/app/pages/auth/Login"));
const QuestionPage = lazy(() => import("@/app/pages/questions/QuestionsTable"));
const JobsPage = lazy(() => import("@/app/pages/jobs/JobsTable"));
const Dashboard = lazy(() => import("@/app/pages/dashboard/Dashboard"));
const Student= lazy(() => import("@/app/pages/students/StudentsTable"));
const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
           
              <Suspense fallback={<div>Loading.....</div>}>
                <LoginPage></LoginPage>
              </Suspense>
           
          }
        />
        <Route
          path="/login"
          element={
          
              <Suspense fallback={<div>Loading.....</div>}>
                <LoginPage></LoginPage>
              </Suspense>
           
          }
        />
        <Route
          path="/dashboard"
          element={
            <BaseLayout>
              <Suspense>
                <Dashboard />
              </Suspense>
            </BaseLayout>
          }
        />
        <Route
          path="/questions"
          element={
            <BaseLayout>
              <Suspense>
                <QuestionPage />
              </Suspense>
            </BaseLayout>
          }
        />
        <Route
          path="/jobs"
          element={
            <BaseLayout>
              <Suspense>
                <JobsPage />
              </Suspense>
            </BaseLayout>
          }
        />
        <Route
          path="/students"
          element={
            <BaseLayout>
              <Suspense>
                <Student />
              </Suspense>
            </BaseLayout>
          }
        />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Routes;
