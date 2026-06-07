import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import { useActivityLogs } from "../hook/useActivityLogs";
import EditLogModal from "../components/EditLogModal";
import { apiFetch } from "../../utils/api";
import { Edit2, Calendar, CheckCircle2, Loader2, Filter } from "lucide-react";

export default function ActivityLogPage() {
  const { logs, loading, refetch } = useActivityLogs();
  const navigate = useNavigate();
  const [editingLog, setEditingLog] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const end = new Date();
    let start = new Date();
    if (value === "10 Hari Terakhir") start.setDate(end.getDate() - 10);
    else if (value === "20 Hari Terakhir") start.setDate(end.getDate() - 20);
    else if (value === "30 Hari Terakhir") start.setDate(end.getDate() - 30);
    else {
      setStartDate("");
      setEndDate("");
      return;
    }
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  const handleEditSave = async (updatedData) => {
    // 1. Ekstrak ID untuk URL, dan sisakan data lainnya untuk body
    const { id, ...dataForBody } = updatedData;

    try {
      // 2. Gunakan ID di URL, kirim dataForBody di dalam body
      const res = await apiFetch(`/analytics/predict/${id}`, {
        method: "PUT",
        body: JSON.stringify(dataForBody), // <--- ID sudah tidak ada di sini!
      });

      if (res.ok) {
        await refetch();
        navigate("/dashboard");
      } else {
        const errorData = await res.json();
        console.error("Detail Error Backend:", errorData);
        alert(`Failed to update log: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const logDate = new Date(log.log_date).setHours(0, 0, 0, 0);
      const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;
      if (start && logDate < start) return false;
      if (end && logDate > end) return false;
      return true;
    });
  }, [logs, startDate, endDate]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <DashboardLayout title="Activity Log">
      <div className="max-w-6xl mx-auto h-[calc(100vh-100px)] flex flex-col">
        <div className="mb-6 flex-none">
          <h1 className="text-2xl font-bold text-slate-900">
            Activity History Log 📜
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-light">
            A complete record of your past activities, helping you track
            progress and review your daily performance.
          </p>
          <div className="flex gap-3 mt-5 items-center">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium w-48 cursor-pointer"
                onChange={handleFilterChange}
              >
                <option value="">Date Filter</option>
                <option value="10 Hari Terakhir">Last 10 Days</option>
                <option value="20 Hari Terakhir">Last 20 Days</option>
                <option value="30 Hari Terakhir">Last 30 Days</option>
              </select>
              <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
                <Filter size={16} />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium">
              <Calendar size={16} className="text-slate-400" />
              <input
                type="date"
                value={startDate}
                className="outline-none bg-transparent w-28"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="text-slate-300">-</span>
              <input
                type="date"
                value={endDate}
                className="outline-none bg-transparent w-28"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1 overflow-auto">
          {loading ? (
            <div className="p-20 flex justify-center">
              <Loader2 className="animate-spin text-blue-500" />
            </div>
          ) : (
            <table className="w-full text-sm text-left border-separate border-spacing-0">
              <thead className="bg-slate-50 text-slate-600 font-semibold sticky top-0 z-10 shadow-sm">
                <tr>
                  {[
                    "Date",
                    "Mood",
                    "Focus",
                    "Stress",
                    "Sleep",
                    "Work",
                    "Exercise",
                    "Downtime", // Downtime sudah kembali
                    "Tasks",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 border-b border-slate-100 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium flex items-center gap-2 whitespace-nowrap">
                      <Calendar size={14} className="text-slate-400" />
                      {formatDate(log.log_date)}
                    </td>
                    <td className="px-6 py-4 font-bold">{log.mood_score}/10</td>
                    <td className="px-6 py-4">{log.focus_score}/10</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold ${log.stress_level <= 2 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                      >
                        Level {log.stress_level}
                      </span>
                    </td>
                    <td className="px-6 py-4">{log.sleep_duration}h</td>
                    <td className="px-6 py-4">{log.study_work_duration}h</td>
                    <td className="px-6 py-4">{log.exercise_duration}m</td>
                    <td className="px-6 py-4">{log.downtime_duration}h</td>{" "}
                    {/* Data Downtime */}
                    <td className="px-6 py-4">
                      {log.task_completed}/{log.task_planned}
                      <CheckCircle2
                        size={12}
                        className="inline text-emerald-500 ml-1"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setEditingLog({
                            ...log,
                            downtime_duration: log.downtime_duration,
                          });
                        }}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>{" "}
      </div>

      {editingLog && (
        <EditLogModal
          isOpen={!!editingLog}
          log={editingLog}
          onClose={() => setEditingLog(null)}
          onSave={handleEditSave}
        />
      )}
    </DashboardLayout>
  );
}
