// file ini untuk logic zuztand
import { create } from "zustand";

const useAuthStore = create((set) => ({
  // state
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: null,

  // login (dipanggil setelah login sukses)
  login: (accessToken, userData = null) => {
    localStorage.setItem("accessToken", accessToken);

    set({
      isAuthenticated: true,
      user: userData,
    });
  },

  // logout
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      isAuthenticated: false,
      user: null,
    });
  },

  // optional: sync ulang dari localStorage
  hydrate: () => {
    const token = localStorage.getItem("accessToken");

    set({
      isAuthenticated: !!token,
    });
  },
}));

export default useAuthStore;