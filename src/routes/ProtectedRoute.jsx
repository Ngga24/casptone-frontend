import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { isFaceCheckedToday } from "../utils/faceCheck";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  // belum login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // belum face check hari ini
  if (!isFaceCheckedToday()) {
    return <Navigate to="/face-check" replace />;
  }

  // boleh akses
  return children;
}