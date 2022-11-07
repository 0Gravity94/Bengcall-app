import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role?.find((roles) => allowedRole?.includes(roles)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

export default RequireAuth;
