import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Brain,
  ClipboardList,
  LogOut,
  BarChart3,
  History,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { apiFetch } from "../../utils/api";
import logoTwin from "../../assets/logo.png";

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User",
  );
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null,
  );

  // 🔥 Status buka/tutup sidebar yang persisten (tersimpan meski pindah halaman)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    // 🔥 Nembak DB buat mastiin foto selalu update (tanpa nunggu refresh)
    const fetchProfileFromDB = async () => {
      try {
        const res = await apiFetch("/profiles");
        if (res.ok) {
          const result = await res.json();
          const data = result.data;

          const freshUsername = data.username || data.fullname || "User";
          setUsername(freshUsername);
          localStorage.setItem("username", freshUsername);

          if (data.profileimage) {
            const path = data.profileimage.replace(/^\//, "");
            const imageUrl = `${BASE_URL}/${path}`;
            setProfileImage(imageUrl);
            localStorage.setItem("profileImage", imageUrl);
          }
        }
      } catch (error) {
        console.error("Gagal sinkron data profil:", error);
      }
    };

    fetchProfileFromDB();

    const updateSidebarData = () => {
      setUsername(localStorage.getItem("username") || "User");
      setProfileImage(localStorage.getItem("profileImage"));
    };

    window.addEventListener("profileUpdated", updateSidebarData);
    return () =>
      window.removeEventListener("profileUpdated", updateSidebarData);
  }, []);

  const handleLogout = () => {
    logout();

    const keysToRemove = [
      "accessToken",
      "refreshToken",
      "username",
      "profileImage",
      "isCheckin",
      "role",
      "analyticsResult",
      "sidebarCollapsed",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    navigate("/");
  };

  const menuClass = ({ isActive }) => `
    flex items-center ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3 rounded-xl text-sm font-medium
    transition-all duration-200 relative group
    ${isActive ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}
  `;

  return (
    <aside
      className={`h-screen sticky top-0 bg-white text-slate-800 flex flex-col border-r border-slate-200/60 shadow-sm transition-all duration-300 z-40 ${isCollapsed ? "w-20" : "w-72"}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 rounded-full p-1 shadow-sm z-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <Link
        to="/dashboard"
        className={`p-6 border-b border-slate-100 flex items-center hover:bg-slate-50 transition-all duration-200 ${isCollapsed ? "justify-center px-0" : "gap-3"}`}
      >
        <div className="w-12 h-12 shrink-0 flex items-center justify-center overflow-hidden">
          <img
            src={logoTwin}
            alt="Digital Twin Logo"
            className="w-full h-full object-contain"
          />
        </div>
        {!isCollapsed && (
          <div className="min-w-0 transition-opacity duration-300">
            <h1 className="text-sm font-bold text-slate-900 truncate">
              Smart Digital Twin
            </h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase truncate">
              AI Productivity System
            </p>
          </div>
        )}
      </Link>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
        <NavLink to="/dashboard" className={menuClass}>
          <LayoutDashboard size={18} className="shrink-0" />
          {!isCollapsed && <span className="truncate">Dashboard</span>}
        </NavLink>
        <NavLink to="/ai-insights" className={menuClass}>
          <Brain size={18} className="shrink-0" />
          {!isCollapsed && <span className="truncate">AI Insights</span>}
        </NavLink>
        <NavLink to="/input-activity" className={menuClass}>
          <ClipboardList size={18} className="shrink-0" />
          {!isCollapsed && <span className="truncate">Input Activity</span>}
        </NavLink>
        <NavLink to="/analytics" className={menuClass}>
          <BarChart3 size={18} className="shrink-0" />
          {!isCollapsed && <span className="truncate">Analytics</span>}
        </NavLink>
        <NavLink to="/activity-log" className={menuClass}>
          <FileText size={18} className="shrink-0" />
          {!isCollapsed && <span className="truncate">Activity Log</span>}
        </NavLink>
        <NavLink to="/history" className={menuClass}>
          <History size={18} className="shrink-0" />
          {!isCollapsed && <span className="truncate">Similar History</span>}
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <Link
          to="/profile"
          className={`block bg-white rounded-xl mb-3 border border-slate-100 shadow-sm hover:border-slate-200 transition-all ${isCollapsed ? "p-2" : "p-3.5"}`}
        >
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}
          >
            <div className="w-9 h-9 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold overflow-hidden border">
              {profileImage ? (
                <img
                  src={`${profileImage}?t=${new Date().getTime()}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                username.charAt(0).toUpperCase()
              )}
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">{username}</p>
                <p className="text-[10px] text-slate-400">Active AI User</p>
              </div>
            )}
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center py-2.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 ${isCollapsed ? "px-0" : "px-4 gap-2"}`}
        >
          <LogOut size={14} />
          {!isCollapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
