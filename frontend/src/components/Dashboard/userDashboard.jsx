import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const userDashboard = () => {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default userDashboard;