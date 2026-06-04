export default function StatCard({
  title,
  value,
  description,
  trend,
  variant = "default",
}) {
  // Warna dioptimalkan untuk Light Mode yang cerah dan profesional
  const variantStyle = {
    default: "text-slate-900",
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger: "text-rose-600",
    info: "text-blue-600",
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </h3>
        {trend && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600">
            {trend}
          </span>
        )}
      </div>

      <div className={`text-3xl font-bold tracking-tight ${variantStyle[variant]}`}>
        {value}
      </div>

      <p className="mt-2 text-xs text-slate-500 leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}