// import { StrictMode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";

// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import RoomsPage from "./pages/RoomsPage.tsx";
import TasksPage from "./pages/TasksPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql", // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache(), // Caching strategy for GraphQL data
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/rooms",
        element: <RoomsPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
