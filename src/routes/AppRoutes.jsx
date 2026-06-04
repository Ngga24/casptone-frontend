import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// public
import LandingPage from "../auth/pages/LandingPage";
import ForgotPasswordPage from "../auth/pages/ForgotPasswordPage";
import AuthForm from "../auth/components/AuthForm";

// protected pages
import DashboardPage from "../dashboard/pages/DashboardPage";
import AIInsightPage from "../ai-insight/pages/AIInsightPage";
import AnalyticsPage from "../analytics/pages/AnalyticsPage";
import HistoryPage from "../history/pages/HistoryPage";
import InputActivityPage from "../activity/pages/InputActivityPage";
import UserManagementPage from "../user-management/pages/UserManagementPage";
import LoginLogsPage from "../user-management/pages/LoginLogsPage";

// face check
import FaceCheckPage from "../daily-checkin/pages/FaceCheckPage";

export default function AppRoutes() {
  return (
    <Routes>
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
        path="/history"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <HistoryPage />
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

      {/* CATCH ALL */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
