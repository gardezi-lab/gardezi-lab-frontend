import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Auth/Login";
import Departments from "../pages/Dashboard/departments/Departments";
import Dashboard from "../pages/Dashboard/Dashboard";

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/patient_entry" element={<PatientEntry />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/discount_approval" element={<DiscountApproval />} />
        <Route path="/rejected_discount" element={<RejectedDiscount />} />
        <Route path="/discount_manager" element={<DiscountManager />} />
        <Route path="/delayed_test" element={<DelayedTest />} />
        <Route path="/delete_record" element={<DeleteRecord />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/business" element={<Business />} />
        <Route path="/patient-list" element={<PatientList />} />
        <Route path="/lab_report" element={<LabReport />} />
        <Route path="/technician_report" element={<TechnicianReport />} />
        <Route path="/reception_report" element={<ReceptionReport />} />
        <Route path="/department_report" element={<DepartmentReport />} />
        <Route path="/consultant_report" element={<ConsultantReport />} />
        <Route path="/general_sms" element={<GeneralSMS />} />
        <Route path="/customdb" element={<CustomDatabase />} />
        <Route path="/custom_sms" element={<CustomSMS />} />
        <Route path="/all_patient" element={<AllPatient />} />
        <Route path="/add_employ" element={<AddEmployees />} />
        <Route path="/addpay" element={<AddPay />} />
        <Route path="/loan" element={<Loans />} />
        <Route path="/advance" element={<Advance />} />
        <Route path="/pay_history" element={<PayHistory />} />
        <Route path="/cash_book" element={<Cashbook />} />
        <Route path="/trial_balance" element={<TrialBalance />} />
        <Route path="/balance_sheet" element={<BalanceSheet />} />
        <Route path="/profit_loss" element={<ProfitLoss />} />
        <Route path="/income_expenses" element={<IncomeExpenses />} />
        <Route path="/cash" element={<CPVCashSUM />} />
        <Route path="/setting" element={<Setting />} />


      </Route>
    </Routes>
  );
}

export default AppRoutes;
