import { useState } from "react";
import { apiFetch } from "../../utils/api";

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  
  const login = async (payload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiFetch("/auth",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login gagal"
        );
      }

      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiFetch("/users",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registrasi gagal"
        );
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.reload();
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
}