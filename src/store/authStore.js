import { create } from "zustand";
import { apiFetch } from "../utils/api";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  role: null, // 🔥 Tambahin state role
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
      if (response.ok) {
        const data = await response.json();
        const userData = data.data.user;
        const userRole = data.data.role;

        if (userData && userData.isCheckin !== undefined) {
          localStorage.setItem("isCheckin", userData.isCheckin);
        }
        if (userRole) {
          localStorage.setItem("role", userRole);
        }

        // 🔥 Update state isAuthenticated, user, dan role
        set({
          isAuthenticated: true,
          user: userData,
          role: userRole || localStorage.getItem("role"),
          isCheckingAuth: false,
        });
      } else {
        const errData = await response.json();
        console.error("Alasan ditolak:", errData);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isCheckin");
        localStorage.removeItem("role");
        set({
          isAuthenticated: false,
          user: null,
          role: null,
          isCheckingAuth: false,
        });
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isCheckin");
    localStorage.removeItem("role");
    set({ isAuthenticated: false, user: null, role: null });
  },
}));

export default useAuthStore;
