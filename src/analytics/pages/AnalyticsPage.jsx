import DashboardLayout from "../../dashboard/components/DashboardLayout";
import useAnalytics from "../hooks/useAnalytics";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const {
    chartData,
    heatmap,
    summary,
    loading,
    error,
  } = useAnalytics();

  if (loading) {
    return (
      <DashboardLayout title="Analytics">
        <div className="p-6 text-slate-500">
          Loading analytics...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Analytics">
        <div className="p-6 text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Analytics">

      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-slate-500 text-sm">
            Weekly Trend
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {summary.weeklyTrend}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-slate-500 text-sm">
            Dominant Activity
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {summary.dominantActivity}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-slate-500 text-sm">
            Peak Hours
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {summary.peakHours}
          </h2>
        </div>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">

        <h3 className="font-semibold mb-4">
          Daily Productivity Trend
        </h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#06b6d4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">

        <h3 className="font-semibold mb-4">
          Activity Heatmap
        </h3>

        <div className="grid grid-cols-7 gap-3">

          {Object.entries(heatmap).map(([day, value]) => (
            <div
              key={day}
              className="p-3 rounded-xl border text-center hover:shadow-sm transition"
            >
              <p className="text-xs text-slate-500">
                {day}
              </p>

              <p className="font-bold text-slate-800">
                {value}
              </p>
            </div>
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}