import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return null; // ✅ wait until auth info is loaded
  if (!token) return <Navigate to="/" />; // redirect if not logged in

  return children;
};

export default ProtectedRoute;
