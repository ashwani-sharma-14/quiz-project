// routes.tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import BaseLayout from "@/app/layouts/BaseLayout";


const Home = lazy(() => import("@/app/pages/Home/Home"));
const Quiz = lazy(() => import("@/app/pages/Quiz/Quiz"));
const HiringUpdates = lazy(() => import("@/app/pages/Hiring/Hiring"));
const HiringPage = lazy(() => import("@/app/pages/Hiring/HiringPage/HiringPage"));
const About = lazy(() => import("@/app/pages/About/About"));
const Profile = lazy(() => import("@/app/pages/Profile/Profile"));
const QuizPage = lazy(() => import("@/app/pages/QuizPage/QuizPage"));
const QuizAnalysis = lazy(
  () => import("@/app/pages/QuizAnalysis/QuizAnalysis")
);
const QuizReview = lazy(
  () => import("@/app/pages/QuizReview/QuizReview")
);
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
          path="/"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            </BaseLayout>
          }
        />
   
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
          path="/quiz"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Quiz />
              </Suspense>
            </BaseLayout>
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
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <QuizAnalysis />
              </Suspense>
            </BaseLayout>
          }
        />
        <Route
          path="/quiz/:id/review"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <QuizReview />
              </Suspense>
            </BaseLayout>
          }
        />
        <Route
          path="/previousQuizzes"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <PreviousQuizzes />
              </Suspense>
            </BaseLayout>
          }
        />

        <Route
          path="/hiring"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <HiringUpdates />
              </Suspense>
            </BaseLayout>
          }
        />
        <Route
          path="/hiring/:id"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <HiringPage />
              </Suspense>
            </BaseLayout>
          }
        />
        <Route
          path="/developer"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <About />
              </Suspense>
            </BaseLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            </BaseLayout>
          }
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
