import DashboardLayout from "../components/DashboardLayout";
import useDashboard from "../hooks/useDashboard";

export default function DashboardPage() {
  const username = localStorage.getItem("username") || "User";

  const { dashboardData } = useDashboard();

  if (!dashboardData) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            Belum ada data analisis
          </h2>
          <p className="text-slate-500">
            Silakan isi aktivitas harian terlebih dahulu.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const main = dashboardData?.["1_main_dashboard"] || {};
  const summary = dashboardData?.["daily_summary"] || {};

  return (
    <DashboardLayout title="Dashboard">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {username} 👋
        </h1>
        <p className="text-slate-500">
          AI Productivity Overview
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <Card
          title="Productivity Status"
          value={main.productivity_status || "-"}
        />

        <Card
          title="Productivity Score"
          value={`${main.productivity_score ?? 0}%`}
        />

        <Card
          title="Prediction Confidence"
          value={`${main.prediction_confidence ?? 0}%`}
        />

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <Card
          title="Fatigue Level"
          value={`${main.fatigue_level ?? 0}%`}
        />

        <Card
          title="Task Completion Rate"
          value={`${main.completion_rate ?? 0}%`}
        />

        <Card
          title="Risk Signal"
          value={main.risk_signal || "-"}
        />

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">

        <h3 className="text-xl font-semibold mb-6">
          Daily Summary
        </h3>

        <div className="grid md:grid-cols-5 gap-4 text-sm">

          <div>
            <p className="text-slate-500">Sleep</p>
            <p className="font-bold">
              {summary.sleep_duration ?? 0} hrs
            </p>
          </div>

          <div>
            <p className="text-slate-500">Study / Work</p>
            <p className="font-bold">
              {summary.study_work_duration ?? 0} hrs
            </p>
          </div>

          <div>
            <p className="text-slate-500">Downtime</p>
            <p className="font-bold">
              {summary.downtime_duration ?? 0} hrs
            </p>
          </div>

          <div>
            <p className="text-slate-500">Exercise</p>
            <p className="font-bold">
              {summary.exercise_duration ?? 0} mnt
            </p>
          </div>

          <div>
            <p className="text-slate-500">Stress</p>
            <p className="font-bold">
              {summary.stress_level ?? 0} hrs
            </p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}