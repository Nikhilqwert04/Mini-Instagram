import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive ? "bg-red-600 text-white font-semibold" : "text-gray-300 hover:bg-zinc-800"
    }`;

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/v1/admin/admin-logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      navigate("/admin");
    }
  };

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col justify-between h-full min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
          <span>Mini Insta</span>
          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Admin</span>
        </h1>

        <nav className="space-y-2">
          <NavLink to="/admindash/overview" className={linkStyle} end>
            📊 Overview
          </NavLink>

          <NavLink to="/admindash/users" className={linkStyle}>
            👥 User Management
          </NavLink>
        </nav>
      </div>

      <div className="pt-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-zinc-800 transition text-sm font-medium"
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
