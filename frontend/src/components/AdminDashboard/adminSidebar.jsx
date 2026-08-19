import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BarChart3, Users, LogOut } from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive ? "bg-red-600 text-white font-semibold" : "text-gray-300 hover:bg-zinc-800"
    }`;

  const mobileLinkStyle = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-1 rounded-lg transition-colors ${
      isActive ? "text-red-500 font-semibold" : "text-gray-400"
    }`;

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token") || localStorage.getItem("accessToken");
    try {
      await axios.post(
        "/api/v1/admin/admin-logout",
        {},
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("adminToken");
      navigate("/admin");
    }
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="flex md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 px-4 items-center justify-between z-50 shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Mini Insta</span>
          <span className="text-[10px] bg-red-600/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">Admin</span>
        </h1>
        <button
          onClick={handleLogout}
          className="p-2 text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
          title="Sign Out"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 h-16 bg-zinc-900 border-t border-zinc-800 px-2 justify-around items-center z-50 shadow-lg">
        <NavLink to="/admindash/overview" className={mobileLinkStyle} end>
          <BarChart3 size={20} />
          <span className="text-[10px] mt-0.5">Overview</span>
        </NavLink>

        <NavLink to="/admindash/users" className={mobileLinkStyle}>
          <Users size={20} />
          <span className="text-[10px] mt-0.5">Users</span>
        </NavLink>
      </div>

      {/* Desktop/Tablet Sidebar */}
      <div className="hidden md:flex md:w-20 lg:w-64 bg-zinc-900 border-r border-zinc-800 p-4 lg:p-5 flex-col justify-between h-full min-h-screen transition-all duration-300">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold mb-8 text-white flex items-center gap-2 justify-center lg:justify-start">
            <span className="hidden lg:inline">Mini Insta</span>
            <span className="inline lg:hidden text-lg">⚙️</span>
            <span className="hidden lg:inline-block text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Admin</span>
          </h1>

          <nav className="space-y-2">
            <NavLink to="/admindash/overview" className={linkStyle} end>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <BarChart3 size={22} className="shrink-0" />
                <span className="hidden lg:inline">Overview</span>
              </div>
            </NavLink>

            <NavLink to="/admindash/users" className={linkStyle}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <Users size={22} className="shrink-0" />
                <span className="hidden lg:inline">User Management</span>
              </div>
            </NavLink>
          </nav>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-lg text-red-400 hover:bg-zinc-800 transition text-sm font-medium flex items-center gap-4 justify-center lg:justify-start cursor-pointer"
          >
            <LogOut size={22} className="shrink-0" />
            <span className="hidden lg:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
