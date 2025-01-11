import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
};
