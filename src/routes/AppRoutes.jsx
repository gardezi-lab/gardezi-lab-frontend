import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Auth/Login";
import Departments from "../pages/Dashboard/departments/Departments";
import Dashboard from "../pages/Dashboard/Dashboard";
import TestProfile from "../pages/Dashboard/departments/testprofile/TestProfile";
import Consultant from "../pages/Dashboard/departments/consultant/Consultant";
import CollectionCenter from "../pages/Dashboard/departments/collection-center/CollectionCenter";
import CCRateList from "../pages/Dashboard/departments/cc-rate-list/CCRateList";
import AddReception from "../pages/Dashboard/departments/reception-add/AddReception";
import AddTechnician from "../pages/Dashboard/departments/technician-list/AddTechnician";
import AddPathologist from "../pages/Dashboard/departments/pathologist-add/AddPathologist";
import AccountDepartment from "../pages/Dashboard/departments/account-department/AccountDepartment";
import ManagerAccount from "../pages/Dashboard/departments/manager-add/ManagerAccount";
import AddBank from "../pages/Dashboard/departments/add-bank/AddBank";
import AddPanel from "../pages/Dashboard/departments/add-panel/AddPanel";
import Payment from "../pages/Dashboard/departments/add-payment/Payment";
import PaymentHistory from "../pages/Dashboard/departments/payment-history/PaymentHistory";
import TestPackage from "../pages/Dashboard/departments/test-package/TestPackage";
import RateList from "../pages/Dashboard/departments/rate-list/RateList";
import CashAudit from "../pages/Dashboard/accounts/cash-audit/CashAudit";
// import PatientList from "../pages/Dashboard/accounts/due-patient-list/PatientList";
import CashReceiving from "../pages/Dashboard/accounts/cash-receive/CashReceiving";
import CashReceiveReport from "../pages/Dashboard/accounts/cash-receive-report/CashReceiveReport";
import SaleStatement from "../pages/Dashboard/accounts/sale-statement/SaleStatement";
import StatementUser from "../pages/Dashboard/accounts/statement-user/StatementUser";
import JazzCashReport from "../pages/Dashboard/accounts/jazz-cash-report/JazzCashReport";
import DiscountReport from "../pages/Dashboard/accounts/discount-report/DiscountReport";
import AdvancedReceiveReport from "../pages/Dashboard/accounts/advanced-receive-report/AdvancedReceiveReport";
import RecoveryReport from "../pages/Dashboard/accounts/recovery-report/RecoveryReport";
import ConsultantPayment from "../pages/Dashboard/accounts/consultant-payment/ConsultantPayment";
import BankTransaction from "../pages/Dashboard/accounts/bank-transaction/BankTransaction";
import Expenses from "../pages/Dashboard/expenses/expenses/Expenses";
import ExpenseReport from "../pages/Dashboard/expenses/expense-report/ExpenseReport";
import StockDashboard from "../pages/Dashboard/stock/stock-dashboard/StockDashboard";
import AddStock from "../pages/Dashboard/stock/add-stock/AddStock";
import CcWiseIssueReport from "../pages/Dashboard/stock/cc-wise-issue-report/CcWiseIssueReport";
import StockIssue from "../pages/Dashboard/stock/stock-issue/StockIssue";
import StockReport from "../pages/Dashboard/stock/stock-report/StockReport";
import NearExpiry from "../pages/Dashboard/stock/near-expiry/NearExpiry";
import CreateAccount from "../pages/Dashboard/account-create/create-account/CreateAccount";
import JournalVocher from "../pages/Dashboard/account-create/journal-vocher/JournalVocher";
import CRV from '../pages/Dashboard/account-create/c-r-v/CRV';
import CPV from "../pages/Dashboard/account-create/c-p-v/CPV";
import BRV from "../pages/Dashboard/account-create/b-r-v/BRV";
import BPV from "../pages/Dashboard/account-create/b-p-v/BPV";
import Voucher from "../pages/Dashboard/account-create/voucher/Voucher";
import Ledger from "../pages/Dashboard/account-create/ledger/Ledger";

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
        <Route path="/testprofile" element={<TestProfile />} />
        <Route path="/consultant" element={<Consultant />} />
        <Route path="/collection-center" element={<CollectionCenter />} />
        <Route path="/cc-rate-list" element={<CCRateList />} />
        <Route path="/reception-add" element={<AddReception />} />
        <Route path="/technician-list" element={<AddTechnician />} />
        <Route path="/pathologist-add" element={<AddPathologist />} />
        <Route path="/account-department" element={<AccountDepartment />} />
        <Route path="/manager-add" element={<ManagerAccount />} />
        <Route path="/add-bank" element={<AddBank />} />
        <Route path="/add-panel" element={<AddPanel />} />
        <Route path="/add-payment" element={<Payment />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/test-package" element={<TestPackage />} />
        <Route path="/rate-list" element={<RateList />} />
        <Route path="/cash-audit" element={<CashAudit />} />
        <Route path="/due-patient-list" element={<PatientList />} />
        <Route path="/cash-receive" element={<CashReceiving />} />
        <Route path="/cash-receive-report" element={<CashReceiveReport />} />
        <Route path="/sale-statement" element={<SaleStatement />} />
        <Route path="/statement-user" element={<StatementUser />} />
        <Route path="/jazz-cash-report" element={<JazzCashReport />} />
        <Route path="/discount-report" element={<DiscountReport />} />
        <Route path="/advanced-receive-report" element={<AdvancedReceiveReport />} />
        <Route path="/recovery-report" element={<RecoveryReport />} />
        <Route path="/consultant-payment" element={<ConsultantPayment />} />
        <Route path="/bank-transaction" element={<BankTransaction />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expense-report" element={<ExpenseReport />} />
        <Route path="/stock-dashboard" element={<StockDashboard />} />
        <Route path="/add-stock" element={<AddStock />} />
        <Route path="/cc-wise-issue-report" element={<CcWiseIssueReport />} />
        <Route path="/stock-issue" element={<StockIssue />} />
        <Route path="/stock-report" element={<StockReport />} />
        <Route path="/near-expiry" element={<NearExpiry />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/journal-vocher" element={<JournalVocher />} />
        <Route path="/c-r-v" element={<CRV />} />
        <Route path="/c-p-v" element={<CPV />} />
        <Route path="/b-r-v" element={<BRV />} />
        <Route path="/b-p-v" element={<BPV />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/ledger" element={<Ledger />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
