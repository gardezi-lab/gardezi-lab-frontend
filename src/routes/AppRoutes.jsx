import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Auth/Login";
import Departments from "../pages/Dashboard/departments/Departments";
import Dashboard from "../pages/Dashboard/Dashboard";
import TestProfile from "../pages/testprofile/TestProfile";
import Consultant from "../pages/consultant/Consultant";
import CollectionCenter from "../pages/collectioncenter/CollectionCenter";
import CCRateList from "../pages/cc-rate-list/CCRateList";
import AddReception from "../pages/reception-add/AddReception";
import AddTechnician from "../pages/technician-list/AddTechnician";
import AddPathologist from "../pages/pathologist-add/AddPathologist";
import AccountDepartment from "../pages/account-department/AccountDepartment";
import ManagerAccount from "../pages/manager-add/ManagerAccount";
import AddBank from "../pages/add-bank/AddBank";
import AddPanel from "../pages/add-panel/AddPanel";
import Payment from "../pages/add-payment/Payment";


function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={ <Dashboard /> } />
        <Route path="/departments" element={ <Departments /> } />
        <Route path="/testprofile" element={ <TestProfile /> } />
        <Route path="/consultant" element={ <Consultant /> } />
        <Route path="/collectioncenter" element={ <CollectionCenter /> } />
        <Route path="/cc-rate-list" element={ <CCRateList /> } />
        <Route path="/reception-add" element={ <AddReception /> } />
        <Route path="/technician-list" element={ <AddTechnician /> } />
        <Route path="/pathologist-add" element={ <AddPathologist /> } />
        <Route path="/account-department" element={ <AccountDepartment /> } />
        <Route path="/manager-add" element={ <ManagerAccount /> } />
        <Route path="/add-bank" element={ <AddBank /> } />
        <Route path="/add-panel" element={ <AddPanel /> } />
        <Route path="/add-payment" element={ <Payment /> } />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
