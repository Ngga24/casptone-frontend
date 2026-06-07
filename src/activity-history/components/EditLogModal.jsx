import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export default function EditLogModal({ isOpen, onClose, log, onSave }) {
  // Pastikan semua field dari backend ada di sini
  const [formData, setFormData] = useState({ ...log });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // EditLogModal.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Pastikan ID terbawa di sini
    const payload = {
      id: formData.id,
      sleep_duration: Number(formData.sleep_duration || 0),
      study_work_duration: Number(formData.study_work_duration || 0),
      exercise_duration: Number(formData.exercise_duration || 0),
      downtime_duration: Number(formData.downtime_duration || 0),
      task_planned: Number(formData.task_planned || 0),
      task_completed: Number(formData.task_completed || 0),
    };

    await onSave(payload); // Kirim objek ini ke ActivityLogPage
    setLoading(false);
    onClose();
  };
  return (
    // Di EditLogModal.jsx, pastikan div pembungkus seperti ini:
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
        <h2 className="text-xl font-bold mb-6">
          Edit Log - {new Date(log.log_date).toLocaleDateString()}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="text-xs font-bold text-slate-400 uppercase">
              Sleep (hrs)
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full p-3 bg-slate-50 rounded-xl mt-1"
              value={formData.sleep_duration}
              onChange={(e) =>
                setFormData({ ...formData, sleep_duration: e.target.value })
              }
            />
          </div>
          <div className="col-span-1">
            <label className="text-xs font-bold text-slate-400 uppercase">
              Work (hrs)
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full p-3 bg-slate-50 rounded-xl mt-1"
              value={formData.study_work_duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  study_work_duration: e.target.value,
                })
              }
            />
          </div>
          <div className="col-span-1">
            <label className="text-xs font-bold text-slate-400 uppercase">
              Exercise (min)
            </label>
            <input
              type="number"
              className="w-full p-3 bg-slate-50 rounded-xl mt-1"
              value={formData.exercise_duration}
              onChange={(e) =>
                setFormData({ ...formData, exercise_duration: e.target.value })
              }
            />
          </div>
          <div className="col-span-1">
            <label className="text-xs font-bold text-slate-400 uppercase">
              Downtime (hrs)
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full p-3 bg-slate-50 rounded-xl mt-1"
              value={formData.downtime_duration}
              onChange={(e) =>
                setFormData({ ...formData, downtime_duration: e.target.value })
              }
            />
          </div>
          <div className="col-span-1">
            <label className="text-xs font-bold text-slate-400 uppercase">
              Tasks Planned
            </label>
            <input
              type="number"
              className="w-full p-3 bg-slate-50 rounded-xl mt-1"
              value={formData.task_planned}
              onChange={(e) =>
                setFormData({ ...formData, task_planned: e.target.value })
              }
            />
          </div>
          <div className="col-span-1">
            <label className="text-xs font-bold text-slate-400 uppercase">
              Tasks Done
            </label>
            <input
              type="number"
              className="w-full p-3 bg-slate-50 rounded-xl mt-1"
              value={formData.task_completed}
              onChange={(e) =>
                setFormData({ ...formData, task_completed: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end col-span-2 gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
