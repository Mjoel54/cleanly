// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import RoomsPage from "./pages/RoomsPage.tsx";
import TasksPage from "./pages/TasksPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";

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
        path: "/rooms",
        element: <RoomsPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
