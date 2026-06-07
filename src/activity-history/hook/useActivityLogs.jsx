import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "../../utils/api";

export const useActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bungkus fetchLogs dengan useCallback agar tidak membuat infinite loop
  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiFetch("/analytics/daily-logs");
      const data = await response.json();
      setLogs(data.dailyLogs || []);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, refetch: fetchLogs }; // Return refetch
};
