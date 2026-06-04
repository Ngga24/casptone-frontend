import { useEffect, useState } from "react";

export default function useDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);

      const raw = localStorage.getItem("analyticsResult");

      console.log("RAW analyticsResult:", raw);

      if (!raw) {
        setDashboardData(null);
        return;
      }

      const parsed = JSON.parse(raw);

      console.log("PARSED dashboardData:", parsed);

      setDashboardData(parsed);

    } catch (err) {
      console.error("useDashboard parse error:", err);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    dashboardData,
    loading,
  };
}