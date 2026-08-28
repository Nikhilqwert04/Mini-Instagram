import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StatefulButton } from "@/components/ui/stateful-button";
const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState({}); // Track status of block/unblock actions
  const [users, setUsers] = useState([]);

  // Fetch users from API on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token") || localStorage.getItem("accessToken");
      try {
        const response = await axios.get("/api/v1/admin/UserandNoofPost", {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (response.data?.success && response.data?.data?.AllUserNmandCoun) {
          setUsers(response.data.data.AllUserNmandCoun);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter users locally based on query
  const filteredUsers = users.filter((user) =>
    (user.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle user block/unblock state
  const handleToggleBlock = async (user) => {
    const userId = user._id;
    setActionStatus((prev) => ({ ...prev, [userId]: "loading" }));

    const token = localStorage.getItem("adminToken") || localStorage.getItem("token") || localStorage.getItem("accessToken");
    const isCurrentlyBlocked = user.isBlocked;
    const url = `/api/v1/admin/Adminuser/${user.username}/${isCurrentlyBlocked ? "unblock" : "block"}`;

    try {
      const response = await axios.patch(
        url,
        {},
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (response.data?.success) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId ? { ...u, isBlocked: !isCurrentlyBlocked } : u
          )
        );
        setActionStatus((prev) => ({ ...prev, [userId]: "success" }));
      } else {
        setActionStatus((prev) => ({ ...prev, [userId]: "error" }));
      }
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      setActionStatus((prev) => ({ ...prev, [userId]: "error" }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      {/* Header and Search */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Search profiles, view post counts, and moderate accounts.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by username or full name..."
            className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition text-sm shadow-inner"
          />
        </div>
      </div>

      {/* Users Table / List */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-zinc-900 border border-zinc-800 rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">
              <span className="text-4xl block mb-3">🔍</span>
              No users found matching your search.
            </div>
          ) : (
            <div>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Posts</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-zinc-800/20 transition-colors group"
                      >
                        {/* User Info */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-zinc-800 ring-2 ring-zinc-700/50 flex items-center justify-center font-bold text-zinc-300">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                                @{user.username}
                              </div>
                              <div className="text-xs text-zinc-400">
                                {user.fullName}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Post Count */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300 font-medium">
                          {user.postcount} {user.postcount === 1 ? "post" : "posts"}
                        </td>

                        {/* Account Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.isBlocked ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                              Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Active
                            </span>
                          )}
                        </td>

                        {/* Action buttons */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate(`/admindash/user/${user.username}`)}
                              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition border border-zinc-700"
                            >
                              View
                            </button>

                            <StatefulButton
                              onClick={() => handleToggleBlock(user)}
                              status={actionStatus[user._id] || "idle"}
                              onReset={() => setActionStatus((prev) => ({ ...prev, [user._id]: "idle" }))}
                              disabled={actionStatus[user._id] && actionStatus[user._id] !== "idle"}
                              loadingText={user.isBlocked ? "Unblocking..." : "Blocking..."}
                              successText="Done!"
                              errorText="Error"
                              variant="ghost"
                              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1 min-w-[76px] justify-center border-0 ${
                                user.isBlocked
                                  ? "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border-emerald-500/30"
                                  : "bg-red-600/20 text-red-400 hover:bg-red-600/30 border-red-500/30"
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {user.isBlocked ? "Unblock" : "Block"}
                            </StatefulButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="block md:hidden divide-y divide-zinc-800/60">
                {filteredUsers.map((user) => (
                  <div key={user._id} className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-zinc-800 ring-2 ring-zinc-700/50 flex items-center justify-center font-bold text-zinc-300">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white">
                          @{user.username}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {user.fullName}
                        </div>
                      </div>
                      <div>
                        {user.isBlocked ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                            Blocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-800/40 pt-3">
                      <span className="text-xs text-zinc-400">
                        {user.postcount} {user.postcount === 1 ? "post" : "posts"}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admindash/user/${user.username}`)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition border border-zinc-700 shadow-sm"
                        >
                          View
                        </button>

                        <StatefulButton
                          onClick={() => handleToggleBlock(user)}
                          status={actionStatus[user._id] || "idle"}
                          onReset={() => setActionStatus((prev) => ({ ...prev, [user._id]: "idle" }))}
                          disabled={actionStatus[user._id] && actionStatus[user._id] !== "idle"}
                          loadingText={user.isBlocked ? "Unblocking..." : "Blocking..."}
                          successText="Done!"
                          errorText="Error"
                          variant="ghost"
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1 min-w-[76px] justify-center border-0 ${
                            user.isBlocked
                              ? "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30"
                              : "bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </StatefulButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
