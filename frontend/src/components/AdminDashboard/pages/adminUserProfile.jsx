import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminUserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Mock initial data representing GET /api/v1/admin/Adminuser/:username
  const [userData, setUserData] = useState({
    fullName: "Alex Jones",
    username: username || "alex_jones",
    email: "alex@example.com",
    isBlocked: false,
    posts: [
      {
        _id: "p1",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
        description: "Exploring new horizons 🌅 #travel #photography",
      },
      {
        _id: "p2",
        imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80",
        description: "Minimalist desk setup for late night coding sessions 💻✨",
      },
      {
        _id: "p3",
        imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80",
        description: "Finding peace in nature's embrace 🌲🎒",
      },
    ],
  });

  // Simulate API fetch on load
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Set username dynamically from param
      setUserData((prev) => ({
        ...prev,
        username: username,
        fullName: username.charAt(0).toUpperCase() + username.slice(1).replace("_", " "),
        email: `${username}@example.com`,
      }));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [username]);

  // Handle block/unblock action
  const handleToggleBlock = async () => {
    setActionLoading(true);

    // API INTEGRATION TO BE DONE BY USER
    // To block: PATCH /api/v1/admin/Adminuser/:username/block
    // To unblock: PATCH /api/v1/admin/Adminuser/:username/unblock
    try {
      console.log(`Action triggered for ${userData.username}`);
      
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 600));

      setUserData((prev) => ({
        ...prev,
        isBlocked: !prev.isBlocked,
      }));
    } catch (error) {
      console.log("Error updating user status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-6 px-4 animate-pulse">
        <div className="h-48 bg-zinc-900 rounded-t-3xl"></div>
        <div className="p-8 bg-zinc-900 rounded-b-3xl space-y-4">
          <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
          <div className="h-24 bg-zinc-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admindash/users")}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm mb-6 font-semibold"
      >
        ⬅️ Back to Users
      </button>

      {/* Profile Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl mb-8">
        <div className="h-48 w-full bg-gradient-to-br from-red-600/40 via-zinc-900/80 to-zinc-900 relative">
          <div className="absolute top-4 right-4">
            {userData.isBlocked ? (
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Account Blocked
              </span>
            ) : (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Account Active
              </span>
            )}
          </div>
        </div>

        <div className="relative px-6 md:px-8 pb-8">
          {/* Avatar and Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 -mt-16 mb-6 text-center sm:text-left">
            <div className="relative shrink-0 flex flex-col items-center sm:items-start">
              <div className="w-32 h-32 rounded-full bg-zinc-800 ring-4 ring-zinc-900 shadow-xl flex items-center justify-center font-black text-4xl text-zinc-400 border border-zinc-700/50">
                {userData.username.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="sm:mb-2 flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
              <div className="text-center sm:text-left mr-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {userData.fullName}
                </h2>
                <p className="text-sm font-semibold text-red-400 mt-0.5">
                  @{userData.username}
                </p>
              </div>

              {/* Administrative Action Button */}
              <button
                onClick={handleToggleBlock}
                disabled={actionLoading}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition duration-200 flex items-center justify-center gap-2 ${
                  userData.isBlocked
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/25"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-red-900/25"
                } disabled:opacity-50`}
              >
                {actionLoading ? (
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : userData.isBlocked ? (
                  "🟢 Unblock Account"
                ) : (
                  "🚫 Block Account"
                )}
              </button>
            </div>
          </div>

          {/* User Details Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-800/80">
            <div className="bg-zinc-800/30 rounded-2xl p-4 border border-zinc-800/80">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                Full Name
              </p>
              <p className="text-base font-semibold text-white">{userData.fullName}</p>
            </div>

            <div className="bg-zinc-800/30 rounded-2xl p-4 border border-zinc-800/80">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                Username
              </p>
              <p className="text-base font-semibold text-white">@{userData.username}</p>
            </div>

            <div className="sm:col-span-2 bg-zinc-800/30 rounded-2xl p-4 border border-zinc-800/80">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                Email Address
              </p>
              <p className="text-base font-semibold text-zinc-200">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User's Posts Grid Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>User Posts</span>
            <span className="text-xs bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded-full font-medium">
              {userData.posts.length} {userData.posts.length === 1 ? "post" : "posts"}
            </span>
          </h3>
        </div>

        {userData.posts.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500">
            <span className="text-4xl block mb-2">📷</span>
            This user has not uploaded any posts.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.posts.map((post) => (
              <div
                key={post._id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg hover:border-zinc-700 transition flex flex-col justify-between group"
              >
                <div className="relative aspect-square bg-black overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.description}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-zinc-900/50">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    Caption
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserProfile;
