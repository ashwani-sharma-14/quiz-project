import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "@/app/layout/BaseLayout";
import { lazy, Suspense } from "react";
import AuthProvider from "@/app/providers/AuthProvider";
import QuestionsTable from "@/app/pages/questions/QuestionsTable";
import JobTable from "@/app/pages/jobs/JobsTable";
import Dashboard from "@/app/pages/dashboard/Dashboard";
import StudentsTable from "@/app/pages/students/StudentsTable";
const LoginPage = lazy(() => import("@/app/pages/auth/Login"));
const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          }
        >
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
            path="/"
            element={
              <BaseLayout>
                <Outlet />
              </BaseLayout>
            }
          >
            <Route
              path="dashboard"
              element={
                <Suspense>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="questions"
              element={
                <Suspense>
                  <QuestionsTable />
                </Suspense>
              }
            />
            <Route
              path="jobs"
              element={
                <Suspense>
                  <JobTable />
                </Suspense>
              }
            />
            <Route
              path="Students"
              element={
                <Suspense>
                  <StudentsTable />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Routes;
