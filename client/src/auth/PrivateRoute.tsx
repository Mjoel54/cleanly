import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/auth";

interface PrivateRouteProps {
  redirectPath?: string;
}

const PrivateRoute = ({ redirectPath = "/login" }: PrivateRouteProps) => {
  const isAuthenticated = Auth.loggedIn();

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
