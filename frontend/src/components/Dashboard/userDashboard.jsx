import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const userDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-zinc-950 text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-20 pb-20 md:pt-6 md:pb-6">
        <Outlet />
      </main>
    </div>
  );
};

export default userDashboard;