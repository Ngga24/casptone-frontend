import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: null,

  login: (accessToken, userData = null) => {
    localStorage.setItem("accessToken", accessToken);
    set({
      isAuthenticated: true,
      user: userData,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      isAuthenticated: false,
      user: null,
    });
  },

  hydrate: () => {
    const token = localStorage.getItem("accessToken");

    set({
      isAuthenticated: !!token,
    });
  },
}));

export default useAuthStore;