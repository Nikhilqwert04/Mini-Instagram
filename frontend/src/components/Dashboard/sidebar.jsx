import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-zinc-800"
    }`;

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      await axios.post(
        "/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
    } catch (err) {
      console.log("Logout error:", err?.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      navigate("/signin");
    }
  };

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col justify-between h-full min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-white">Mini Instagram</h1>

        <nav className="space-y-2">
          <NavLink to="/dashboard/profile" className={linkStyle}>
            👤 Profile
          </NavLink>

          <NavLink to="/dashboard/create-post" className={linkStyle}>
            ➕ Create Post
          </NavLink>

          <NavLink to="/dashboard/search" className={linkStyle}>
            🔍 Search
          </NavLink>

          <NavLink to="/dashboard/my-posts" className={linkStyle}>
            🖼 My Posts
          </NavLink>

          <NavLink to="/dashboard/chat" className={linkStyle}>
            💬 Chat
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

export default Sidebar;
