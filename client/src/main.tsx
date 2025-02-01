// import { StrictMode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";

// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import RoomsPage from "./pages/RoomsPage.tsx";
import ModuleProgress from "./pages/ModuleProgress.tsx";
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
        path: "/module-progress",
        element: <ModuleProgress />,
      },
    ],
  },
]);

// Runtime check: Check if the root element exists in the DOM before rendering to ensure the app fails gracefully with a clear error if the element is missing.
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Please ensure the HTML contains a <div id='root'></div>."
  );
}

ReactDOM.createRoot(rootElement).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
