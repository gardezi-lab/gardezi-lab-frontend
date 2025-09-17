import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Auth/Login";
import Departments from "../pages/Dashboard/departments/Departments";
import Dashboard from "../pages/Dashboard/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={ <Dashboard /> } />
        <Route path="/departments" element={ <Departments /> } />

      </Route>
    </Routes>
  );
}

export default AppRoutes;
