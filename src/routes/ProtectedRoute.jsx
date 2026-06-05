import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const isCheckin = localStorage.getItem("isCheckin") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isCheckin) {
    return <Navigate to="/face-check" replace />;
  }

  return children;
}