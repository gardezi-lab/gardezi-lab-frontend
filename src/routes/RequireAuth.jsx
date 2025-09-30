// src/routes/RequireAuth.js
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
    const token = localStorage.getItem("token"); // 👈 check login
    const location = useLocation();

    
    if (!token) {
        // login pe bhejo aur us route ka path bhi save karo
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // agar token hai to children routes allow karo
    return <Outlet />;
}
