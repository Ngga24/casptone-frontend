export default function StatCard({
  title,
  value,
  description,
  trend,
  variant = "default",
}) {
  const variantStyle = {
    default: "text-slate-900",
    success: "text-emerald-500",
    warning: "text-yellow-500",
    danger: "text-red-500",
    info: "text-cyan-500",
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">

        <h3 className="text-sm font-medium text-slate-500">
          {title}
        </h3>

        {trend && (
          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
            {trend}
          </span>
        )}

      </div>

      {/* Value */}
      <div className={`text-3xl font-semibold ${variantStyle[variant]}`}>
        {value}
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">
        {description}
      </p>

    </div>
  );
}