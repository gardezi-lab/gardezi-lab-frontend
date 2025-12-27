import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({ allowedRoles, children }) {
  const user = JSON.parse(localStorage.getItem("LoggedInUser") || "{}");
  const role = user?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
