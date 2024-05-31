import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./routes";
import useAuth from "@store/useAuth";
import { useEffect } from "react";

const App = () => {
  const { authenticateUser } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <main className="idacs-app h-[100vh] w-[100vw]">
      <Suspense fallback={<p>Preparing App...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </main>
  );
};

export default App;
