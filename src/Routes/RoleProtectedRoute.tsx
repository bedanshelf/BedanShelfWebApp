import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";
import type { Role } from "../Components/Context/AuthContext";

interface PropsType {
  allowedRoles: Role[];
}

export default function RoleProtectedRoute({ allowedRoles }: PropsType) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasRoles = user.role.some((role) => allowedRoles.includes(role));

  if (!hasRoles) {
    return <Navigate to="*" replace />;
  }

  return <Outlet />;
}
