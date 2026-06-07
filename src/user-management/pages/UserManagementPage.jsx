import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import useUsers from "../hooks/useUsers";
import { Search, Trash2 } from "lucide-react";

export default function UserManagementPage() {
  const { users, isLoading, error, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    (user.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      {/* Main container dengan flex-col agar bisa membagi area header dan tabel */}
      <main className="flex-1 p-8 flex flex-col h-full overflow-hidden">
        <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
          {/* HEADER SECTION (TIDAK AKAN IKUT SCROLL) */}
          <div className="flex-none">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">
                User management
              </h1>
              <p className="text-slate-500 mt-1">
                Manage your team members and their account permissions here.
              </p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="relative w-72">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
              <div className="text-sm text-slate-500">
                Total: {filteredUsers.length} users
              </div>
            </div>
          </div>

          {/* ERROR STATE */}
          {error && (
            <div className="flex-none p-4 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* TABLE SECTION (YANG AKAN SCROLL) */}
          <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm mb-8">
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-sm text-left">
                {/* Sticky Header */}
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 font-medium">Full Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Joined Date</th>
                    <th className="px-6 py-4 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-slate-500"
                      >
                        Loading users data...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-slate-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user.id || index}
                        className="hover:bg-slate-50/50"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {user.full_name || "-"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-slate-600 capitalize">
                          {user.role}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.is_active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${user.is_active ? "bg-emerald-500" : "bg-red-500"}`}
                            ></span>
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {user.joined_date}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteUser(user.id)}
                            disabled={!user.is_active}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                              user.is_active
                                ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                                : "text-slate-400 cursor-not-allowed opacity-60"
                            }`}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
