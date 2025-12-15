import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";

export default function AdminRoute() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (!user.role.includes("admin")) {
    return <Navigate to="/books" replace />;
  }

  return <Outlet />;
}
