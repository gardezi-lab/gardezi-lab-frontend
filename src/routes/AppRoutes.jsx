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

import StockPurchase from "../pages/Stock/stock-purchase/StockPurchase";
import StockUsage from "../pages/Stock/stock-usage/StockUsage";
import StockInventory from "../pages/Stock/stock-inventory/StockInventory"
import AddStock from "../pages/Stock/add-stock/AddStock";
import AddVendor from "../pages/Stock/add-vendor/AddVender";
import CcWiseIssueReport from "../pages/Stock/cc-wise-issue-report/CcWiseIssueReport";
import StockIssue from "../pages/Stock/stock-issue/StockIssue";
import NearExpiry from "../pages/Stock/near-expiry/NearExpiry";
import CreateAccount from "../pages/Account-create/create-account/CreateAccount";
import JournalVocher from "../pages/Account-create/journal-vocher/JournalVocher";
import CRV from '../pages/Account-create/c-r-v/CRV';
import CPV from "../pages/Account-create/c-p-v/CPV";
import BRV from "../pages/Account-create/b-r-v/BRV";
import BPV from "../pages/Account-create/b-p-v/BPV";
import Voucher from "../pages/Account-create/voucher/Voucher";
import Ledger from "../pages/Account-create/ledger/Ledger";
import PrintVoucher from "../pages/Account-create/print-voucher/PrintVoucher";
import Settings from "../pages/Account-create/settings/Settings";

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

              <Route path="/stock-purchase" element={<StockPurchase />} />
              <Route path="/stock-usage" element={<StockUsage />} />
              <Route path="/stock-inventory" element={<StockInventory />} />
              <Route path="/add-stock" element={<AddStock />} />
              <Route path="/add-vendor" element={<AddVendor />} />
              <Route path="/cc-wise-issue-report" element={<CcWiseIssueReport />} />
              <Route path="/stock-issue" element={<StockIssue />} />
              <Route path="/near-expiry" element={<NearExpiry />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/journal-vocher" element={<JournalVocher />} />
              <Route path="/c-r-v" element={<CRV />} />
              <Route path="/c-p-v" element={<CPV />} />
              <Route path="/b-r-v" element={<BRV />} />
              <Route path="/b-p-v" element={<BPV />} />
              <Route path="/voucher" element={<Voucher />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/ledger" element={<Ledger />} />
               <Route path='/update-profile' element={<UpdateProfile />} />
            </Route>
            <Route path="/patient-management/invoice" element={<PatientInvoice />} />
            <Route path="/patient-management/report" element={<PatientReport />} />
            <Route path="/print-voucher" element={<PrintVoucher />} />
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
