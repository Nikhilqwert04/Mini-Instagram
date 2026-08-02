import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-zinc-800"
    }`;

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-5">
      <h1 className="text-2xl font-bold mb-8">Mini Instagram</h1>

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
      </nav>
    </div>
  );
};

export default Sidebar;
