import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  // belum login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // UPDATE: Cek status face check pakai data dari backend/localStorage yang baru
  const isCheckin = localStorage.getItem("isCheckin") === "true";

  // belum face check hari ini
  if (!isCheckin) {
    return <Navigate to="/face-check" replace />;
  }

  // boleh akses
  return children;
}
