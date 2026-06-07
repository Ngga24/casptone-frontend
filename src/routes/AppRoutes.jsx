import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import useAuthStore from "../store/authStore"; // 🔥 Sesuaikan path file store lu!
import { Loader2 } from "lucide-react"; // 🔥 Pastikan lucide-react udah di-install

// --- PUBLIC PAGES ---
import LandingPage from "../auth/pages/LandingPage";
import ForgotPasswordPage from "../auth/pages/ForgotPasswordPage";
import AuthForm from "../auth/components/AuthForm";

// --- PROTECTED PAGES (USER) ---
import DashboardPage from "../dashboard/pages/DashboardPage";
import AIInsightPage from "../ai-insight/pages/AIInsightPage";
import AnalyticsPage from "../analytics/pages/AnalyticsPage";
import HistoryPage from "../history/pages/HistoryPage";
import InputActivityPage from "../activity/pages/InputActivityPage";
import ProfilePage from "../dashboard/pages/ProfilePage";
import ActivityLogPage from "../activity-history/page/ActivityLogPage";

// --- PROTECTED PAGES (ADMIN) ---
import UserManagementPage from "../user-management/pages/UserManagementPage";
import LoginLogsPage from "../user-management/pages/LoginLogsPage";
import AdminProfilePage from "../user-management/pages/AdminProfilePage";

// --- FACE CHECK ---
import FaceCheckPage from "../daily-checkin/pages/FaceCheckPage";

export default function AppRoutes() {
  // 🔥 Tarik fungsi dan state dari Zustand
  const { hydrate, isCheckingAuth } = useAuthStore();

  // 🔥 Jalankan verifikasi token SEKALi pas layar pertama kali di-refresh
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // 🔥 Tahan render halaman kalau masih ngecek API
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium tracking-wide">
          Mengecek sesi login...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/face-check" element={<FaceCheckPage />} />

      {/* --- KHUSUS USER --- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/input-activity"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <InputActivityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-insights"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <AIInsightPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activity-log"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ActivityLogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* --- KHUSUS ADMIN --- */}
      <Route
        path="/user-management"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login-log"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <LoginLogsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile-admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminProfilePage />
          </ProtectedRoute>
        }
      />

      {/* CATCH ALL */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
