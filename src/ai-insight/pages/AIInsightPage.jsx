import DashboardLayout from "../../dashboard/components/DashboardLayout";
import useDashboard from "../../dashboard/hooks/useDashboard";
import {
  Sparkles,
  TrendingUp,
  Lightbulb,
  Compass,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function AIInsightPage() {
  const { dashboardData, loading } = useDashboard();

  if (loading) {
    return (
      <DashboardLayout title="AI Insights">
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 p-6">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Memuat wawasan AI...</p>
        </div>
      </DashboardLayout>
    );
  }

  const insight = dashboardData?.data?.["3_ai_insight_and_recommendation"];

  if (!insight) {
    return (
      <DashboardLayout title="AI Insights">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 mx-auto sm:mx-0">
            <Sparkles size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight mb-1">
            Belum ada wawasan AI
          </h2>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Silakan masukkan aktivitas harian Anda terlebih dahulu agar AI dapat
            menyusun analisis mendalam di halaman ini.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const sections = [
    {
      title: "Condition Insight",
      content: insight.condition_insight,
      icon: <Sparkles size={18} />,
      iconBg: "bg-blue-50 text-blue-600",
      cardBorder: "border-slate-100",
    },
    {
      title: "Performance Cause",
      content: insight.performance_cause,
      icon: <TrendingUp size={18} />,
      iconBg: "bg-indigo-50 text-indigo-600",
      cardBorder: "border-slate-100",
    },
    {
      title: "Recommendation",
      content: insight.activity_recommendation,
      icon: <Lightbulb size={18} />,
      iconBg: "bg-emerald-50 text-emerald-600",
      cardBorder: "border-slate-100",
    },
    {
      title: "Tomorrow Prediction",
      content: insight.tomorrow_prediction,
      icon: <Compass size={18} />,
      iconBg: "bg-purple-50 text-purple-600",
      cardBorder: "border-slate-100",
    },
    {
      title: "Burnout Warning",
      content: insight.burnout_warning,
      icon: <AlertTriangle size={18} />,
      iconBg: "bg-rose-50 text-rose-600",
      cardBorder: "border-rose-100 bg-rose-50/10",
    },
  ];

  return (
    // Kita gunakan h-full agar bisa mengatur scroll di dalam
    <DashboardLayout title="AI Insights">
      <div className="flex flex-col h-[calc(100vh-120px)]">
        {/* HEADER: Dibuat flex-none supaya tidak ikut ter-scroll */}
        <div className="flex-none mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Insights & Recommendations 🧠
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-light">
            Artificial intelligence-based personal twin analysis of your
            activity data
          </p>
        </div>

        {/* CONTAINER GRID: Dibuat flex-1 dan overflow-y-auto agar bisa di-scroll secara mandiri */}
        <div className="flex-1 overflow-y-auto pr-2 pb-4">
          <div className="grid gap-5">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-200 ${section.cardBorder}`}
              >
                <div className="flex items-center gap-3 mb-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl ${section.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`}
                  >
                    {section.icon}
                  </div>
                  <h2 className="text-base font-bold text-slate-800 tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-0 sm:pl-12">
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {section.content || "Tidak ada data untuk bagian ini."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
