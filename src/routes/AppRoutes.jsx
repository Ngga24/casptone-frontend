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

// face check
import FaceCheckPage from "../daily-checkin/pages/FaceCheckPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* FACE CHECK (Bisa akses langsung atau setelah login) */}
      <Route path="/face-check" element={<FaceCheckPage />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/input-activity"
        element={
          <ProtectedRoute>
            <InputActivityPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-insights"
        element={
          <ProtectedRoute>
            <AIInsightPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />

      {/* CATCH ALL - Redirect ke login jika path tidak ditemukan */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}