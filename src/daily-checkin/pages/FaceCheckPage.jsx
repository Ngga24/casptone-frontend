import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { setFaceCheckedToday } from "../../utils/faceCheck";
import { apiFetch } from "../../utils/api";

export default function FaceCheckPage() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // START CAMERA
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Camera permission denied / not available");
    }
  };

  // CAPTURE IMAGE
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/jpeg", 0.8);
  };

  // HANDLE CHECK-IN
  const handleCheckIn = async () => {
    setError(null);

    const image_base64 = captureImage();

    if (!image_base64) {
      setError("Camera belum siap");
      return;
    }

    setLoading(true);

    try {
      const response = await apiFetch("/analytics/face-detection", {
        method: "POST",
        body: JSON.stringify({ image_base64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Face check-in gagal");
      }

      // ✅ MARK SUCCESS FACE CHECK TODAY
      setFaceCheckedToday();

      alert("Face check-in berhasil");

      // redirect ke dashboard
      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-slate-950 text-white p-6">

      <h1 className="text-2xl font-bold">
        Face Check-In
      </h1>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* CAMERA */}
      <video
        ref={videoRef}
        autoPlay
        className="w-80 rounded-xl border border-slate-700"
      />

      <canvas ref={canvasRef} className="hidden" />

      {/* BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={startCamera}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Start Camera
        </button>

        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="px-4 py-2 bg-green-600 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Check In"}
        </button>
      </div>

    </div>
  );
}