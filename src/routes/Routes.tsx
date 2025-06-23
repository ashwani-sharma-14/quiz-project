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
const About = lazy(() => import("@/app/pages/About/About"));
const Profile = lazy(() => import("@/app/pages/Profile/Profile"));
const QuizPage = lazy(() => import("@/app/pages/QuizPage/QuizPage"));
const QuizAnalysis = lazy(
  () => import("@/app/pages/QuizAnalysis/QuizAnalysis")
);
const PreviousQuizzes = lazy(
  () => import("@/app/pages/PreviousQuizzes/PreviousQuizzes")
);


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
          path="/quizPage"
          element={
            
              <Suspense fallback={<div>Loading...</div>}>
                <QuizPage />
              </Suspense>
          }
        />
        <Route
          path="/quizAnalysis"
          element={
            <BaseLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <QuizAnalysis />
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
