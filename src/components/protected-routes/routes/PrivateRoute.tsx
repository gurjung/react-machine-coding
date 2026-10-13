import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PublicRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
