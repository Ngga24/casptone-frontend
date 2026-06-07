import { create } from "zustand";
import { apiFetch } from "../utils/api";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  role: null,
  isCheckingAuth: true,

  hydrate: async () => {
    const token = localStorage.getItem("accessToken");

    const localIsCheckin = localStorage.getItem("isCheckin");

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
      const finalIsCheckin =
        userData?.isCheckin !== undefined ? userData.isCheckin : localIsCheckin;

      localStorage.setItem("role", userRole || "");
      localStorage.setItem("isCheckin", finalIsCheckin || "");

      set({
        isAuthenticated: true,
        user: userData,
        role: userRole,
        isCheckin: finalIsCheckin,
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
