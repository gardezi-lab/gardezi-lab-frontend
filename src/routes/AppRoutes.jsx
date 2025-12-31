// import {useState} from 'react';
// import { Routes, Route, Navigate } from "react-router-dom";

// import DashboardLayout from "../layouts/DashboardLayout";

// import DepartmentListing from "../pages/dashboard-management/pages/department-listing/DepartmentListing";

// import Dashboard from '../pages/dashboard-management/pages/dashboard/Dashboard';

// import TestProfile from '../pages/dashboard-management/pages/test-profile/TestProfile';

// import SystemUsers from "../pages/access-management/pages/system-user/SystemUsers"
// import UsersRole from "../pages/access-management/pages/users-role/UsersRole"
// import AddPanel from "../pages/dashboard-management/pages/company-panel/AddPanel";
// import TestPackage from "../pages/dashboard-management/pages/test-package/TestPackage";

// import Interpertation from "../pages/dashboard-management/pages/interpertation/Interpertation";
// import PatientManagement from "../pages/Patient-management/pages/patient-listing/PatientManagement"
// import PatientReport from "../pages/Patient-management/pages/patient-listing/patient-report/PatientReport"
// import PatientInvoice from "../pages/Patient-management/pages/patient-listing/patient-invoice/PatientInvoice"
// import CashManagement from "../pages/Patient-management/pages/patient-cash/PatientCash"
// import DelayedTest from "../pages/Patient-management/pages/delayed-test/DelayedTest"
// import PanelReport from "../pages/Patient-management/pages/panel-report/PanelReport"

// import Login from "../pages/authentication/Login";
// import RoleUserManagement from "../pages/access-management/pages/user-management/UserManagement";
import UpdateProfile from '../pages/authentication/UpdateProfile';

// function AppRoutes() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("LoggedInUser"));
//   return (
//     <Routes>
//       {
//         isLoggedIn ? (
//           <>
//             <Route element={<DashboardLayout />}>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/dashboard/department" element={<DepartmentListing />} />
//               <Route path="/dashboard/testprofile" element={<TestProfile />} />
//               <Route path="/dashboard/company-panel" element={<AddPanel />} />
//               <Route path="/dashboard/test-package" element={<TestPackage />} />
//               <Route path="/dashboard/interpertation" element={<Interpertation />} />

//               <Route path="/patient-management/patient" element={<PatientManagement />} />

//               <Route path="/patient-management/cash" element={<CashManagement />} />
//               <Route path="/patient-management/delayed-test" element={<DelayedTest />} />
//               <Route path="/patient-management/panel-report" element={<PanelReport />} />

//               <Route path="/access-management/users" element={<SystemUsers />} />
//               <Route path="/access-management/role" element={<UsersRole />} />
//               <Route path="/access-management/user-manage" element={<RoleUserManagement />} />

//               <Route path='/update-profile' element={<UpdateProfile />} />

//             </Route>
//             <Route path="/patient-management/invoice" element={<PatientInvoice />} />
//             <Route path="/patient-management/report" element={<PatientReport />} />
//           </>
//         ) : (
//           <>
//             <Route path="/auth/login" element={<Login setIsLoggedIn={setIsLoggedIn}/> } />
//             <Route path="*" element={<Navigate to="/auth/login" replace/>} />
//           </>
//         )
//       }
//     </Routes>
//   );
// }

// export default AppRoutes;


import { useState } from 'react';
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

import AddStock from '../pages/stock-management/pages/add-stock/AddStock';
import StockPurchase from '../pages/stock-management/pages/stock-purchase/StockPurchase';
import StockUsage from "../pages/stock-management/pages/stock-usage/StockUsage";
import StockInventory from '../pages/stock-management/pages/stock-inventory/StockInventory';

import CreateAccount from "../pages/account-management/pages/create-account/CreateAccount";
import JournalVoucher from '../pages/account-management/pages/journal-voucher/JournalVoucher';
import CRV from '../pages/account-management/pages/c-r-v/CRV';
import CPV from "../pages/account-management/pages/c-p-v/CPV";
import BRV from '../pages/account-management/pages/b-r-v/BRV';
import BPV from '../pages/account-management/pages/c-p-v/CPV';
import Ledger from '../pages/account-management/pages/ledger/Ledger';
import Setting from "../pages/account-management/pages/settings/Setting";


import Login from "../pages/authentication/Login";
import RoleUserManagement from "../pages/access-management/pages/user-management/UserManagement";
import LogReport from '../pages/report-management/pages/log-report/LogReport';
import DuePatient from '../pages/report-management/pages/due-patient/DuePatient';
import SaleStatment from '../pages/report-management/pages/sale-statement/SaleStatment';
import DiscountReport from '../pages/report-management/pages/discount-report/DiscountReport';
import ConsultantReport from '../pages/report-management/pages/consultant-report/ConsultantReport';
import LabReport from '../pages/report-management/pages/lab-report/LabReport';
import ReceiptionesReport from '../pages/report-management/pages/receiptiones-report/ReceiptionesReport';
import BusinessReport from '../pages/report-management/pages/business-report/BusinessReport';
// import CollectionCenter from '../pages/report-management/pages/collection-center/CollectionCenter';
import CollectionCenter from '../pages/report-management/pages/collection-center/CollectionCenter';
import Lab from '../pages/dashboard-management/pages/lab/Lab';
import RoleProtectedRoute from './RoleProtectedRoute';
import AccessDenied from './AccessDenied';


function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  return (
    <Routes>
      {
        isLoggedIn ? (
          <>
            <Route element={<DashboardLayout />}>

              <Route path="/" element={
                // <RoleProtectedRoute allowedRoles={["Reception"]}>
                  <Dashboard />
                // </RoleProtectedRoute>
              } />

              <Route path="/dashboard/department" element={
                // <RoleProtectedRoute allowedRoles={["Reception"]}>
                  <DepartmentListing />
                // </RoleProtectedRoute>
              } />
              <Route path="/dashboard/testprofile" element={<TestProfile />} />
              <Route path="/dashboard/company-panel" element={
                // <RoleProtectedRoute allowedRoles={["Reception"]}>
                  <AddPanel />
                // </RoleProtectedRoute>
                } />
              <Route path="/dashboard/test-package" element={<TestPackage />} />
              <Route path="/dashboard/interpertation" element={<Interpertation />} />

              <Route path="/patient-management/patient" element={<PatientManagement />} />
              <Route path="/patient-management/cash" element={<CashManagement />} />
              <Route path="/patient-management/delayed-test" element={<DelayedTest />} />
              <Route path="/patient-management/panel-report" element={<PanelReport />} />
              <Route path="/access-management/users" element={<SystemUsers />} />
              <Route path="/access-management/role" element={<UsersRole />} />
              <Route path="/access-management/user-manage" element={<RoleUserManagement />} />

              <Route path="/stock-management/add-stock" element={<AddStock />} />
              <Route path="/stock-management/stock-purchase" element={<StockPurchase />} />
              <Route path="/stock-management/stock-usage" element={<StockUsage />} />
              <Route path="/stock-management/stock-inventory" element={<StockInventory />} />

              <Route path="/account-management/create-account" element={<CreateAccount />} />
              <Route path="/account-management/journal-voucher" element={<JournalVoucher />} />
              <Route path="/account-management/c-r-v" element={<CRV />} />
              <Route path="/account-management/c-p-v" element={<CPV />} />
              <Route path="/account-management/b-r-v" element={<BRV />} />
              <Route path="/account-management/b-p-v" element={<BPV />} />
              <Route path="/account-management/ledger" element={<Ledger />} />
              <Route path="/account-management/settings" element={<Setting />} />

              <Route path='/update-profile' element={<UpdateProfile />} />
              <Route path="/report-management/log-report" element={<LogReport />} />
              <Route path="/report-management/due-patient" element={<DuePatient />} />
              <Route path="/report-management/sale-statement" element={<SaleStatment />} />
              <Route path="/report-management/discount-report" element={<DiscountReport />} />
              <Route path="/report-management/consultant-report" element={<ConsultantReport />} />
              <Route path="/report-management/lab-report" element={<LabReport />} />
              <Route path="/report-management/receiptiones-report" element={<ReceiptionesReport />} />
              <Route path="/report-management/Business-report" element={<BusinessReport />} />
              <Route path="/report-management/collection-center" element={<CollectionCenter />} />
              <Route path='/dashboard-management/lab' element={<Lab />} />
              <Route path="/access-denied" element={<AccessDenied />} />
            </Route>
            <Route path="/patient-management/invoice" element={<PatientInvoice />} />
            <Route path="/patient-management/report" element={<PatientReport />} />
          </>
        ) : (
          <>
            <Route path="/auth/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </>
        )
      }
    </Routes>
  );
}

export default AppRoutes;
