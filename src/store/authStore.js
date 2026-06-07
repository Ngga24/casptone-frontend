import { create } from "zustand";
import { apiFetch } from "../utils/api";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  role: null,
  isCheckingAuth: true,

  hydrate: async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      set({
        isAuthenticated: false,
        user: null,
        role: null,
        isCheckingAuth: false,
      });
      return;
    }

    try {
      const response = await apiFetch("/profiles");

      if (!response.ok) throw new Error("Auth failed");

      const data = await response.json();
      const userData = data.data.user;
      const userRole = data.data.role;

      localStorage.setItem("role", userRole || "");
      localStorage.setItem("isCheckin", userData?.isCheckin || "");

      set({
        isAuthenticated: true,
        user: userData,
        role: userRole,
        isCheckingAuth: false,
      });
    } catch (err) {
      localStorage.clear();
      set({
        isAuthenticated: false,
        user: null,
        role: null,
        isCheckingAuth: false,
      });
    }
  },

  login: (accessToken, userData, userRole) => {
    set({ isAuthenticated: true, user: userData, role: userRole });
  },

  logout: () => {
    localStorage.clear();
    set({ isAuthenticated: false, user: null, role: null });
  },
}));

export default useAuthStore;
