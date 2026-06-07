import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children, allowedRoles }) {
  // 🔥 Tarik semua data dari Zustand
  const { isAuthenticated, role, isCheckingAuth } = useAuthStore();

  // 🔥 Kalau masih ngecek auth, JANGAN lakukan redirect apa-apa.
  // Biarkan AppRoutes yang nampilin layar Loading.
  if (isCheckingAuth) {
    return null;
  }

  // 1. Belum login? Tendang ke Landing Page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Fallback untuk role jika dari Zustand kosong (meski jarang terjadi)
  const currentRole = role || localStorage.getItem("role") || "user";
  const isCheckin = localStorage.getItem("isCheckin") === "true";

  // 2. Cek Hak Akses Role
  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    if (currentRole === "admin") {
      return <Navigate to="/user-management" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // 3. Cek Face Check (KHUSUS USER)
  if (currentRole === "user" && !isCheckin) {
    return <Navigate to="/face-check" replace />;
  }

  // Lolos semua hadangan, silakan masuk
  return children;
}
