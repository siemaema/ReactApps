import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

const AdminRoute = ({ children }) => {
  const { user, loggedIn } = useAppContext();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
