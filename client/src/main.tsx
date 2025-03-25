// Apollo imports
import { ApolloProvider } from "@apollo/client";
import { client } from "./config/apollo";

// Redux imports
import { Provider } from "react-redux";
import store from "./redux/store";

// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";

// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Auth from "./utils/auth";
import PrivateRoute from "./auth/PrivateRoute";

import "./index.css";

// Import components for routes
import App from "./App.tsx";
import Rooms from "./pages/Rooms";
import Tasks from "./pages/Tasks";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
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
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      {
        element: <PrivateRoute />,
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
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </Provider>
    </ApolloProvider>
  );
}
