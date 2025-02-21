// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Auth from "./utils/auth";
import ProtectedRoute from "./utils/ProtectedRoute.js";

import "./index.css";

import App from "./App.tsx";
import Rooms from "./pages/Rooms";
import Tasks from "./pages/Tasks";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const isAuthenticated = Auth.loggedIn();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: isAuthenticated ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <Home />
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
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
