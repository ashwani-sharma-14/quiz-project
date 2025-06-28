// routes.tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import BaseLayout from "@/app/layouts/BaseLayout";
import AuthProvider from "@/app/providers/AuthProvider";
const Home = lazy(() => import("@/app/pages/Home/Home"));
const Quiz = lazy(() => import("@/app/pages/Quiz/Quiz"));
const HiringUpdates = lazy(() => import("@/app/pages/Hiring/Hiring"));
const HiringPage = lazy(
  () => import("@/app/pages/Hiring/HiringPage/HiringPage")
);
const About = lazy(() => import("@/app/pages/About/About"));
const Profile = lazy(() => import("@/app/pages/Profile/Profile"));
const QuizPage = lazy(() => import("@/app/pages/QuizPage/QuizPage"));
const QuizAnalysis = lazy(
  () => import("@/app/pages/QuizAnalysis/QuizAnalysis")
);
const QuizReview = lazy(() => import("@/app/pages/QuizReview/QuizReview"));
const PreviousQuizzes = lazy(
  () => import("@/app/pages/PreviousQuizzes/PreviousQuizzes")
);
const Login = lazy(() => import("@/app/pages/Login/Login"));
const Signup = lazy(() => import("@/app/pages/SignUp/Signup"));

export default function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          }
        />

        <Route
          element={
            <AuthProvider>
              <BaseLayout>
                <Outlet />
              </BaseLayout>
            </AuthProvider>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/quiz"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Quiz />
              </Suspense>
            }
          />
          <Route
            path="/quiz/quizScreen"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <QuizPage />
              </Suspense>
            }
          />
          <Route
            path="/quiz/:id/analysis"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <QuizAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/quiz/:id/review"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <QuizReview />
              </Suspense>
            }
          />
          <Route
            path="/previousQuizzes"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PreviousQuizzes />
              </Suspense>
            }
          />
          <Route
            path="/hiring"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HiringUpdates />
              </Suspense>
            }
          />
          <Route
            path="/hiring/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HiringPage />
              </Suspense>
            }
          />
          <Route
            path="/developer"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            }
          />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
