// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Auth from "./utils/auth.ts";
import ProtectedRoute from "./utils/ProtectedRoute.js";

// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Rooms from "./pages/Rooms";
import Tasks from "./pages/Tasks";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const isAuthenticated = Auth.loggedIn();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      {
        element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/rooms", element: <Rooms /> },
          { path: "/tasks", element: <Tasks /> },
        ],
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
