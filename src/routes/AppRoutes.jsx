import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LandingPage from "../auth/pages/LandingPage";
import ForgotPasswordPage from "../auth/pages/ForgotPasswordPage";
import AuthForm from "../auth/components/AuthForm";

import DashboardPage from "../dashboard/pages/DashboardPage";
import AIInsightPage from "../ai-insight/pages/AIInsightPage";
import AnalyticsPage from "../analytics/pages/AnalyticsPage";
import HistoryPage from "../history/pages/HistoryPage";
import InputActivityPage from "../activity/pages/InputActivityPage";
import ProfilePage from "../dashboard/pages/ProfilePage";

import FaceCheckPage from "../daily-checkin/pages/FaceCheckPage";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      <Route path="/face-check" element={<FaceCheckPage />} />

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

      <Route path="/profile" element={<ProfilePage />} />

      {/* Redirect ke login jika path tidak ditemukan */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}