import DashboardLayout from "../../dashboard/components/DashboardLayout";

export default function AIInsightPage() {
  const result = JSON.parse(
    localStorage.getItem("analyticsResult")
  );

  const insight =
    result?.data?.[
      "3_ai_insight_and_recommendation"
    ];

  if (!insight) {
    return (
      <DashboardLayout title="AI Insights">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          No AI insight available.
        </div>
      </DashboardLayout>
    );
  }

  const sections = [
    {
      title: "Condition Insight",
      content:
        insight.condition_insight,
    },
    {
      title: "Performance Cause",
      content:
        insight.performance_cause,
    },
    {
      title: "Recommendation",
      content:
        insight.activity_recommendation,
    },
    {
      title: "Tomorrow Prediction",
      content:
        insight.tomorrow_prediction,
    },
    {
      title: "Burnout Warning",
      content:
        insight.burnout_warning,
    },
  ];

  return (
    <DashboardLayout title="AI Insights">

      <div className="space-y-6">

        {sections.map(
          (section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">
                {section.title}
              </h2>

              <p className="text-slate-700 leading-relaxed">
                {section.content}
              </p>
            </div>
          )
        )}

      </div>

    </DashboardLayout>
  );
}