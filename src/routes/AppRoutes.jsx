import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Auth/Login";
import Departments from "../pages/Dashboard/departments/Departments";
import Dashboard from "../pages/Dashboard/Dashboard";
import TestProfile from "../pages/Dashboard/testprofile/TestProfile";
import Consultant from "../pages/Dashboard/consultant/Consultant";
import Role from "../pages/Dashboard/role/Role";
import CollectionCenter from "../pages/Dashboard/collection-center/CollectionCenter";
import CCRateList from "../pages/Dashboard/cc-rate-list/CCRateList";
import AddReception from "../pages/Dashboard/reception-add/AddReception";
import AddTechnician from "../pages/Dashboard/technician-list/AddTechnician";
import AddPathologist from "../pages/Dashboard/pathologist-add/AddPathologist";
import AccountDepartment from "../pages/Dashboard/account-department/AccountDepartment";
import ManagerAccount from "../pages/Dashboard/manager-add/ManagerAccount";
import AddBank from "../pages/Dashboard/add-bank/AddBank";
import AddPanel from "../pages/Dashboard/add-panel/AddPanel";
import Payment from "../pages/Dashboard/add-payment/Payment";
import PaymentHistory from "../pages/Dashboard/payment-history/PaymentHistory";
import TestPackage from "../pages/Dashboard/test-package/TestPackage";
import Interpertation from "../pages/Dashboard/interpertation/Interpertation";
import RateList from "../pages/Dashboard/rate-list/RateList";
import CashAudit from "../pages/Accounts/cash-audit/CashAudit";
import CashReceiving from "../pages/Accounts/cash-receive/CashReceiving";
import CashReceiveReport from "../pages/Accounts/cash-receive-report/CashReceiveReport";
import SaleStatement from "../pages/Accounts/sale-statement/SaleStatement";
import StatementUser from "../pages/Accounts/statement-user/StatementUser";
import JazzCashReport from "../pages/Accounts/jazz-cash-report/JazzCashReport";
import DiscountReport from "../pages/Accounts/discount-report/DiscountReport";
import AdvancedReceiveReport from "../pages/Accounts/advanced-receive-report/AdvancedReceiveReport";
import RecoveryReport from "../pages/Accounts/recovery-report/RecoveryReport";
import ConsultantPayment from "../pages/Accounts/consultant-payment/ConsultantPayment";
import BankTransaction from "../pages/Accounts/bank-transaction/BankTransaction";
import Expenses from "../pages/Expenses/expenses/Expenses";
import ExpenseReport from "../pages/Expenses/expense-report/ExpenseReport";
import StockDashboard from "../pages/Stock/stock-dashboard/StockDashboard";
import AddStock from "../pages/Stock/add-stock/AddStock";
import CcWiseIssueReport from "../pages/Stock/cc-wise-issue-report/CcWiseIssueReport";
import StockIssue from "../pages/Stock/stock-issue/StockIssue";
import StockReport from "../pages/Stock/stock-report/StockReport";
import NearExpiry from "../pages/Stock/near-expiry/NearExpiry";
import CreateAccount from "../pages/Account-create/create-account/CreateAccount";
import JournalVocher from "../pages/Account-create/journal-vocher/JournalVocher";
import CRV from '../pages/Account-create/c-r-v/CRV';
import CPV from "../pages/Account-create/c-p-v/CPV";
import BRV from "../pages/Account-create/b-r-v/BRV";
import BPV from "../pages/Account-create/b-p-v/BPV";
import Voucher from "../pages/Account-create/voucher/Voucher";
import Ledger from "../pages/Account-create/ledger/Ledger";

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
import Cashbook from "../pages/Accounts/CashBook";
import TrialBalance from "../pages/Accounts/TrialBalance";
import BalanceSheet from "../pages/Accounts/BalanceSheet";
import ProfitLoss from "../pages/Accounts/ProfitLoss";
import IncomeExpenses from "../pages/Accounts/IncomeExpenses";
import CPVCashSUM from "../pages/Accounts/CPVCashSUM";
import Setting from "../pages/Accounts/Setting";
import PatientEntry from "../pages/Patients/patient-entry/PatientEntry";
import Parameter from "../pages/Dashboard/parameter/Parameter";
import RequireAuth from "./RequireAuth";
import AddResult from "../pages/Patients/add-result/AddResult";
import InvoicePrint from "../components/invoice/InvoicePrint";
import PrintReport from "../pages/Patients/print-report/PrintReport";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/invoice" element={<InvoicePrint />} />
      <Route path="/print-report" element={<PrintReport />} />
      {/* <Route element={<RequireAuth />}> */}
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
        <Route path="/patient-entry" element={<PatientEntry />} />
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
        <Route path="/parameter" element={<Parameter />} />
        <Route path="/interpertation" element={<Interpertation />} />
        <Route path="/add-result" element={<AddResult />} />
        {/* </Route> */}
      </Route >
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
