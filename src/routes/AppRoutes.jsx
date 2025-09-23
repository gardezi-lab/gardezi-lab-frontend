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


import Invoice from "../pages/Patients/invoice/Invoice";
import DiscountApproval from "../pages/Patients/discount-approval/DiscountApproval";
import RejectedDiscount from "../pages/Patients/rejected-discount/RejectedDiscount";
import DiscountManager from "../pages/Patients/discount-manager/DiscountManager";
import DelayedTest from "../pages/Patients/delayed-test/DelayedTest";
import DeleteRecord from "../pages/Patients/delete-record/DeleteRecord";
import Verification from "../pages/verification/Verification";
import Business from "../pages/business/Business";
import PatientList from "../pages/patient-list/PatientList";
import LabReport from "../pages/reportings/LabReport";
import TechnicianReport from "../pages/reportings/TechnicianReport";
import ReceptionReport from "../pages/reportings/ReceptionReport";
import DepartmentReport from "../pages/reportings/DepartmentReport";
import ConsultantReport from "../pages/reportings/ConsultantReport";
import GeneralSMS from "../pages/sms/GeneralSMS";
import CustomDatabase from "../pages/sms/CustomDatabase";
import CustomSMS from "../pages/sms/CustomSMS";
import AllPatient from "../pages/sms/AllPatient";
import AddEmployees from "../pages/hr/AddEmployees";
import AddPay from "../pages/hr/AddPay";
import Loans from "../pages/hr/Loans";
import Advance from "../pages/hr/Advance";
import PayHistory from "../pages/hr/PayHistory";
import Cashbook from "../pages/accounts/CashBook";
import TrialBalance from "../pages/accounts/TrialBalance";
import BalanceSheet from "../pages/accounts/BalanceSheet";
import ProfitLoss from "../pages/accounts/ProfitLoss";
import IncomeExpenses from "../pages/accounts/IncomeExpenses";
import CPVCashSUM from "../pages/accounts/CPVCashSUM";
import Setting from "../pages/accounts/Setting";
import PatientEntry from "../pages/Patients/patient-entry/PatientEntry";

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
