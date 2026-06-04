import DashboardLayout from "../../dashboard/components/DashboardLayout";
import useHistory from "../hooks/useHistory";

export default function HistoryPage() {
  const { historyData } =
    useHistory();

  if (!historyData) {
    return (
      <DashboardLayout title="History">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          No historical data available.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="History">

      {/* Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Similar Productivity Summary
        </h2>

        <div className="text-5xl font-bold text-cyan-600">
          {
            historyData.average_productivity_from_similar_days
          }
        </div>

        <p className="mt-2 text-slate-500">
          Average productivity from similar days
        </p>

      </div>

      {/* Similar Days */}
      <div className="grid md:grid-cols-3 gap-6">

        {historyData.top_3_similar_days.map(
          (item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4">
                {item.date}
              </h3>

              <div className="space-y-3">

                <div>
                  <p className="text-sm text-slate-500">
                    Similarity Score
                  </p>

                  <p className="font-semibold text-cyan-600">
                    {item.similarity_score}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Productivity Score
                  </p>

                  <p className="font-semibold">
                    {
                      item.historical_productivity_score
                    }
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Category
                  </p>

                  <p className="font-semibold">
                    {
                      item.historical_category
                    }
                  </p>
                </div>

              </div>
            </div>
          )
        )}

      </div>

    </DashboardLayout>
  );
}