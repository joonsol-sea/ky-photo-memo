import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const ProtectRoute = ({
 isAuthed,
 user,
 me,
 meloading = false,
 requiredRole,
 redirect = "/admin/login",
}) => {
 const location = useLocation();

 if (!isAuthed) {
  return <Navigate to={redirect} replace state={{ from: location }} />;
 }

 if (requiredRole && meloading) {
  return null;
 }
 const role = (me?.role ?? user?.role ?? "").toLowerCase();
 const need = (requiredRole ?? "").toLowerCase();
 if (need && role !== need) {
  return <Navigate to="/" replace />;
 }
 return <Outlet />;
};

export default ProtectRoute;
