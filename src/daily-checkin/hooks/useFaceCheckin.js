// src/daily-checkin/hooks/useFaceCheckin.js
import { useState } from "react";
import { faceCheckIn } from "../services/faceCheckinService";

export default function useFaceCheckin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkIn = async (image_base64) => {
    setLoading(true);
    setError(null);

    try {
      const result = await faceCheckIn(image_base64);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { checkIn, loading, error };
}