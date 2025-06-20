import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { lazy, Suspense } from "react";
const LoginPage = lazy(() => import("@/app/pages/Login"));
export default function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <Suspense>
              <LoginPage />
            </Suspense>
          }
        />
      </>
    )
  );
  return <RouterProvider router={router} />;
}
