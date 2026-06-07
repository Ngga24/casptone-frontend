import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";

export default function useDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const [aiResponse, summaryResponse] = await Promise.all([
        apiFetch("/analytics/latest-prediction"),
        apiFetch("/analytics/daily-summary"),
      ]);

      const aiResult = await aiResponse.json();
      const summaryResult = await summaryResponse.json();
      setDashboardData({
        data: aiResult.status === "success" ? aiResult.data : null,
        dailySummary:
          summaryResult.status === "success" && summaryResult.data
            ? summaryResult.data.dailySummary
            : null,
      });
    } catch (err) {
      console.error("Gagal menarik data dashboard:", err);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    window.addEventListener("analytics-updated", load);
    return () => window.removeEventListener("analytics-updated", load);
  }, []);

  return { dashboardData, loading };
}
