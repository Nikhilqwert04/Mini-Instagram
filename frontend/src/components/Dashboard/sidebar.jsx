import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, PlusSquare, Search, Image, MessageSquare, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive ? "bg-blue-600 text-white font-semibold" : "text-gray-300 hover:bg-zinc-800"
    }`;

  const mobileLinkStyle = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-1 rounded-lg transition-colors ${
      isActive ? "text-blue-500 font-semibold" : "text-gray-400"
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
    <>
      {/* Mobile Top Header */}
      <div className="flex md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 px-4 items-center justify-between z-50 shadow-md">
        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Mini Instagram
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
        <NavLink to="/dashboard/profile" className={mobileLinkStyle}>
          <User size={20} />
          <span className="text-[10px] mt-0.5">Profile</span>
        </NavLink>

        <NavLink to="/dashboard/create-post" className={mobileLinkStyle}>
          <PlusSquare size={20} />
          <span className="text-[10px] mt-0.5">Post</span>
        </NavLink>

        <NavLink to="/dashboard/search" className={mobileLinkStyle}>
          <Search size={20} />
          <span className="text-[10px] mt-0.5">Search</span>
        </NavLink>

        <NavLink to="/dashboard/my-posts" className={mobileLinkStyle}>
          <Image size={20} />
          <span className="text-[10px] mt-0.5">My Posts</span>
        </NavLink>

        <NavLink to="/dashboard/chat" className={mobileLinkStyle}>
          <MessageSquare size={20} />
          <span className="text-[10px] mt-0.5">Chat</span>
        </NavLink>
      </div>

      {/* Desktop/Tablet Sidebar */}
      <div className="hidden md:flex md:w-20 lg:w-64 bg-zinc-900 border-r border-zinc-800 p-4 lg:p-5 flex-col justify-between h-full min-h-screen transition-all duration-300">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold mb-8 text-white text-center lg:text-left truncate">
            <span className="hidden lg:inline">Mini Instagram</span>
            <span className="inline lg:hidden text-2xl">📸</span>
          </h1>

          <nav className="space-y-2">
            <NavLink to="/dashboard/profile" className={linkStyle}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <User size={22} className="shrink-0" />
                <span className="hidden lg:inline">Profile</span>
              </div>
            </NavLink>

            <NavLink to="/dashboard/create-post" className={linkStyle}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <PlusSquare size={22} className="shrink-0" />
                <span className="hidden lg:inline">Create Post</span>
              </div>
            </NavLink>

            <NavLink to="/dashboard/search" className={linkStyle}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <Search size={22} className="shrink-0" />
                <span className="hidden lg:inline">Search</span>
              </div>
            </NavLink>

            <NavLink to="/dashboard/my-posts" className={linkStyle}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <Image size={22} className="shrink-0" />
                <span className="hidden lg:inline">My Posts</span>
              </div>
            </NavLink>

            <NavLink to="/dashboard/chat" className={linkStyle}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <MessageSquare size={22} className="shrink-0" />
                <span className="hidden lg:inline">Chat</span>
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

export default Sidebar;
