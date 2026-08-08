import { Outlet } from "react-router-dom";
import AdminSidebar from "./adminSidebar";

const adminDashboard = () => {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default adminDashboard;
