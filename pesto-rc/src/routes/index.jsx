import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const DashboardLayout = lazy(() => import("@layouts/DashboardLayout"));
const PublicLayout = lazy(() => import("@layouts/PublicLayout"));
const AuthLayout = lazy(() => import("@layouts/AuthLayout"));

// Public Pages
const Home = lazy(() => import("@pages/Public/Home"));

// Authentication Pages
const Login = lazy(() => import("@pages/Auth/Login"));
const Register = lazy(() => import("@pages/Auth/Register"));

// Dashboard Pages
const Dashboard = lazy(() => import("@pages/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
