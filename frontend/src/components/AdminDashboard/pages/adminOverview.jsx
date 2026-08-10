import axios from "axios";
import React, { useState, useEffect } from "react";

const AdminOverview = () => {
  useEffect(() => {
    const fetchpost = async () => {
      try {
        const res = await axios.get("/api/v1/admin/admin-dashboard");
        setStats(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchpost();
  }, []);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // To simulate API loading and UX transitions
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Admin Overview
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            System status, engagement metrics, and administrative oversight.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2 self-start md:self-auto">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-zinc-300 font-medium">
            System Online
          </span>
        </div>
      </div>

      {loading ? (
        // Loading Skeleton
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-36 bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >
              <div className="h-4 bg-zinc-800 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-zinc-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Users Card */}
            <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl transition hover:border-zinc-700/80 group">
              <div className="absolute top-0 right-0 h-24 w-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Total Users
                </span>
                <span className="text-xl">👥</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {stats.totalUsers}
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  +12.4%
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Active accounts on platform
              </p>
            </div>

            {/* Total Posts Card */}
            <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl transition hover:border-zinc-700/80 group">
              <div className="absolute top-0 right-0 h-24 w-24 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-all duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Total Posts
                </span>
                <span className="text-xl">🖼️</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {stats.totalposts}
                </span>
                <span className="text-xs font-semibold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
                  +24.1%
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Shared moments & updates
              </p>
            </div>

            {/* Blocked Users Card */}
            <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl transition hover:border-zinc-700/80 group">
              <div className="absolute top-0 right-0 h-24 w-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Blocked Users
                </span>
                <span className="text-xl">🚫</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-red-500 tracking-tight">
                  {stats.blockedUser}
                </span>
                <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
                  Restricted
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Violated community guidelines
              </p>
            </div>
          </div>

          {/* Quick Platform Health & Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Performance Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4">
                System Performance
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 font-medium mb-1">
                    <span>API Response Success Rate</span>
                    <span className="text-white">99.8%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                      style={{ width: "99.8%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-400 font-medium mb-1">
                    <span>ImageKit CDN Delivery Speed</span>
                    <span className="text-white">96 ms</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-400 font-medium mb-1">
                    <span>Database CPU Load</span>
                    <span className="text-white">12.5%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-full rounded-full"
                      style={{ width: "12.5%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Guidance / Help */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-white mb-2">
                  Administrator Panel Note
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  This dashboard gives you quick oversight of Mini-Instagram
                  users and posts. You can search, block, and unblock accounts
                  instantly in the{" "}
                  <strong className="text-white font-semibold">
                    User Management
                  </strong>{" "}
                  view.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOverview;
