import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem("access");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}