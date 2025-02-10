// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Rooms from "./pages/Rooms";
import Tasks from "./pages/Tasks";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
