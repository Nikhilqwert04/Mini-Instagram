import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ allowedRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

    axios
      .get("/api/v1/auth/current-user", {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((response) => {
        if (response.status === 200 || response.data?.success) {
          setIsAuthenticated(true);
          setUserRole(response.data?.data?.role);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return allowedRole === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/signin" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return allowedRole === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;