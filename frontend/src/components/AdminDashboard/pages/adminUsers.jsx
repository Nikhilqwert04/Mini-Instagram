import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({}); // Track loading state of block/unblock actions for specific users

  // Mock initial users data representing GET /api/v1/admin/UserandNoofPost
  // structure: Array of { _id, username, fullName, email, postcount, isBlocked }
  const [users, setUsers] = useState([
    { _id: "1", username: "alex_jones", fullName: "Alex Jones", email: "alex@example.com", postcount: 14, isBlocked: false },
    { _id: "2", username: "julia_k", fullName: "Julia Kern", email: "julia@example.com", postcount: 32, isBlocked: false },
    { _id: "3", username: "sam_smith", fullName: "Sam Smith", email: "sam@example.com", postcount: 0, isBlocked: true },
    { _id: "4", username: "emily_rose", fullName: "Emily Rose", email: "emily@example.com", postcount: 5, isBlocked: false },
    { _id: "5", username: "mike_d", fullName: "Mike Davidson", email: "mike@example.com", postcount: 27, isBlocked: false },
  ]);

  // Simulate API fetch on component mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter users locally based on query (can be replaced with API search GET /api/v1/admin/searchUsername)
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle user block/unblock state
  const handleToggleBlock = async (user) => {
    const userId = user._id;
    setActionLoading((prev) => ({ ...prev, [userId]: true }));

    // API INTEGRATION TO BE DONE BY USER
    // To block: PATCH /api/v1/admin/Adminuser/:username/block
    // To unblock: PATCH /api/v1/admin/Adminuser/:username/unblock
    try {
      console.log(`Toggle block state for user: ${user.username}`);
      
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 600));

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
    } catch (error) {
      console.log("Error blocking/unblocking user:", error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
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
            <div className="overflow-x-auto">
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

                          <button
                            onClick={() => handleToggleBlock(user)}
                            disabled={actionLoading[user._id]}
                            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1 min-w-[76px] justify-center ${
                              user.isBlocked
                                ? "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30"
                                : "bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {actionLoading[user._id] ? (
                              <svg className="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : user.isBlocked ? (
                              "Unblock"
                            ) : (
                              "Block"
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
