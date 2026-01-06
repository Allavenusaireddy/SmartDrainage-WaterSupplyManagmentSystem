import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

export default function AdminRoute({ children }) {
  const user = getCurrentUser();

  // If NOT logged in → send to ADMIN login
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // If logged in but NOT admin → redirect to home
  if (user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // If admin → allow access
  return children;
}
