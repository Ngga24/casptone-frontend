export default function SummaryCard() {
  const items = [
    { label: "Durasi tidur", value: "7.0 jam", progress: 70 },
    { label: "Belajar / kerja", value: "6.5 jam", progress: 65 },
    { label: "Screen time", value: "5.2 jam", progress: 52 },
    { label: "Aktivitas fisik", value: "1.5 jam", progress: 25 },
    { label: "Tingkat stres", value: "4 / 10", progress: 40 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Ringkasan hari ini
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Overview aktivitas harian kamu
        </p>
      </div>

      <div className="space-y-5">

        {items.map((item) => (
          <div key={item.label} className="space-y-2">

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">
                {item.label}
              </span>

              <span className="text-slate-900 font-medium">
                {item.value}
              </span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${item.progress}%` }}
              />
            </div>

          </div>
        ))}

      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
        Terakhir diperbarui: 12 Mei 2026 09.45
      </div>

    </div>
  );
}