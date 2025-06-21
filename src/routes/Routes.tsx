// routes.tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import BaseLayout from "@/app/layouts/BaseLayout";


const Home = lazy(() => import("@/app/pages/Home"));
const Quiz = lazy(() => import("@/app/pages/Quiz"));
const HiringUpdates = lazy(() => import("@/app/pages/Hiring"));
const About = lazy(() => import("@/app/pages/About"));
const Profile = lazy(() => import("@/app/pages/Profile"));
const QuizPage = lazy(() => import("@/app/pages/QuizPage/QuizPage"));



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
