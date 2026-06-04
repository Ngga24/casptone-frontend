import { Users, LogOut } from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("analyticsResult");

    navigate("/");
  };

  const menuClass = ({ isActive }) =>
    `
    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
    transition-all duration-200
    ${
      isActive
        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }
  `;

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white flex flex-col border-r border-white/5">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-base font-semibold tracking-wide">
              Digital Twin
            </h1>
            <p className="text-xs text-slate-500">Admin & User Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {/* Hanya Menu User Management */}
        <NavLink to="/user-management" className={menuClass}>
          <Users size={18} />
          User Management
        </NavLink>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
              {username.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {username}
              </p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center justify-center gap-2
            px-4 py-3 rounded-xl text-sm font-medium
            text-red-400
            bg-red-500/5 border border-red-500/10
            hover:bg-red-500/10 hover:text-red-300
            transition-all duration-200
          "
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
