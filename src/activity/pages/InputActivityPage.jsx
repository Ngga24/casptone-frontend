import { useState } from "react";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import useActivity from "../../activity/hooks/useActivity";

export default function InputActivityPage() {
  const { submitActivity, loading, error } = useActivity();

  const [form, setForm] = useState({
    sleep_duration: "",
    study_work_duration: "",
    exercise_duration: "",
    downtime_duration: "",
    task_planned: "",
    task_completed: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await submitActivity({
      sleep_duration: Number(form.sleep_duration),
      study_work_duration: Number(form.study_work_duration),
      exercise_duration: Number(form.exercise_duration),
      downtime_duration: Number(form.downtime_duration),
      task_planned: Number(form.task_planned),
      task_completed: Number(form.task_completed),
    });
  };

  const inputClass =
    "w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition";

  return (
    <DashboardLayout title="Input Activity">

      <div className="max-w-4xl mx-auto">

        {/* CARD WRAPPER */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10">

          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-800">
              Daily Activity
            </h2>
            <p className="text-slate-500 mt-2">
              Fill your daily activity to generate AI productivity analysis
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100">
              {error}
            </div>
          )}

          {/* FORM 1 COLUMN */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm text-slate-600 mb-2 block">
                Sleep Duration (hours)
              </label>
              <input
                name="sleep_duration"
                value={form.sleep_duration}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g 7.5"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600 mb-2 block">
                Study / Work Duration
              </label>
              <input
                name="study_work_duration"
                value={form.study_work_duration}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g 6"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600 mb-2 block">
                Exercise Duration
              </label>
              <input
                name="exercise_duration"
                value={form.exercise_duration}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g 1"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600 mb-2 block">
                Downtime Duration
              </label>
              <input
                name="downtime_duration"
                value={form.downtime_duration}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g 3"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600 mb-2 block">
                Task Planned
              </label>
              <input
                name="task_planned"
                value={form.task_planned}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g 10"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600 mb-2 block">
                Task Completed
              </label>
              <input
                name="task_completed"
                value={form.task_completed}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g 8"
                required
              />
            </div>

            {/* BUTTON FULL WIDTH */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "SAVE"}
            </button>

          </form>
        </div>
      </div>

    </DashboardLayout>
  );
}