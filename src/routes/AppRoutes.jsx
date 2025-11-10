import {useState} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DepartmentListing from "../pages/dashboard-management/pages/department-listing/DepartmentListing";
// import Dashboard from "../pages/dashboard-management/Dashboard"
import Dashboard from '../pages/dashboard-management/pages/dashboard/Dashboard';
// import TestProfile from "../pages/dashboard-management/test-profile/TestProfile"
import TestProfile from '../pages/dashboard-management/pages/test-profile/TestProfile';

import SystemUsers from "../pages/access-management/pages/system-user/SystemUsers"
import UsersRole from "../pages/access-management/pages/users-role/UsersRole"
import AddPanel from "../pages/dashboard-management/pages/company-panel/AddPanel";
import TestPackage from "../pages/dashboard-management/pages/test-package/TestPackage";
// import Interpertation from "../pages/dashboard-management/interpertation/Interpertation";
import Interpertation from "../pages/dashboard-management/pages/interpertation/Interpertation";
import PatientManagement from "../pages/Patient-management/pages/patient-listing/PatientManagement"
import PatientReport from "../pages/Patient-management/pages/patient-listing/patient-report/PatientReport"
import PatientInvoice from "../pages/Patient-management/pages/patient-listing/patient-invoice/PatientInvoice"
import CashManagement from "../pages/Patient-management/pages/patient-cash/PatientCash"
import DelayedTest from "../pages/Patient-management/pages/delayed-test/DelayedTest"
import PanelReport from "../pages/Patient-management/pages/panel-report/PanelReport"

import Login from "../pages/authentication/Login";
import RoleUserManagement from "../pages/access-management/pages/user-management/UserManagement";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("LoggedInUser"));
  return (
    <Routes>
      {
        isLoggedIn ? (
          <>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard/department" element={<DepartmentListing />} />
              <Route path="/dashboard/testprofile" element={<TestProfile />} />
              <Route path="/dashboard/company-panel" element={<AddPanel />} />
              <Route path="/dashboard/test-package" element={<TestPackage />} />
              <Route path="/dashboard/interpertation" element={<Interpertation />} />

              <Route path="/patient-management/patient" element={<PatientManagement />} />

              <Route path="/patient-management/cash" element={<CashManagement />} />
              <Route path="/patient-management/delayed-test" element={<DelayedTest />} />
              <Route path="/patient-management/panel-report" element={<PanelReport />} />

              <Route path="/access-management/users" element={<SystemUsers />} />
              <Route path="/access-management/role" element={<UsersRole />} />
              <Route path="/access-management/user-manage" element={<RoleUserManagement />} />
            </Route>
            <Route path="/patient-management/invoice" element={<PatientInvoice />} />
            <Route path="/patient-management/report" element={<PatientReport />} />
          </>
        ) : (
          <>
            <Route path="/auth/login" element={<Login setIsLoggedIn={setIsLoggedIn}/> } />
            <Route path="*" element={<Navigate to="/auth/login" replace/>} />
          </>
        )
      }
    </Routes>
  );
}

export default AppRoutes;
