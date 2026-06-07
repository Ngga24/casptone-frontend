import { useMemo } from "react";
import useDashboard from "../../dashboard/hooks/useDashboard";

export default function useHistory() {
  // Ambil dari hook dashboard yang udah narik data backend
  const { dashboardData, loading } = useDashboard();

  const historyData = useMemo(() => {
    return dashboardData?.data?.["4_similar_productivity_history"] || null;
  }, [dashboardData]);

  return {
    historyData,
    loading,
  };
}
