const menuItems = [
    {
        title: "Patients",
        iconClass: "uil-user",
        dropdown: [
            {
                label: "Patients List",
                icon: "users",
                href: "/patient-list",
            },
            {
                label: "Invoices",
                icon: "file-text",
                href: "/invoice",
            },
            {
                label: "Add Results",
                icon: "check-square",
                href: "/invoice",
            },
            {
                label: "Discount Approvals",
                icon: "check-circle",
                href: "/discount_approval",
            },
            {
                label: "Rejected Discounts",
                icon: "x-circle",
                href: "/rejected_discount",
            },
            {
                label: "Discount by Manager",
                icon: "user-check",
                href: "/discount_manager",
            },
            {
                label: "Delayed Tests",
                icon: "clock",
                href: "/delayed_test",
            },
            {
                label: "Delete Records",
                icon: "trash-2",
                href: "/delete_record",
            },
        ],
    },


    {
        title: "Dashboard",
        iconClass: "uil-chart-pie",
        dropdown: [
            {
                label: "Departments",
                href: "/departments",
            },
            {
                label: "Test & Profile",
                href: "/testprofile",
            },
            {
                label: "Consultants",
                href: "/consultant",
            },
            {
                label: "Collection Center",
                href: "/collection-center",
            },
            {
                label: "CC Rate List",
                href: "/cc-rate-list",
            },
            {
                label: "Add Reception",
                href: "/reception-add",
            },
            {
                label: "Technicians",
                href: "/technician-list",
            },
            {
                label: "Pathologist",
                href: "/pathologist-add",
            },
            {
                label: "Account Department",
                href: "/account-department",
            },
            {
                label: "Manager Account",
                href: "/manager-add",
            },
            {
                label: "Add Banks",
                href: "/add-bank",
            },
            {
                label: "Add Panels",
                href: "/add-panel",
            },
            {
                label: "Payments",
                href: "/add-payment",
            },
            {
                label: "History",
                href: "/payment-history",
            },
            {
                label: "Test Package",
                href: "/test-package",
            },
            {
                label: "Rate List",
                href: "/rate-list",
            },
        ],
    },

    {
        title: "Reportings",
        iconClass: "uil-chart",
        dropdown: [
            {
                label: "Lab Reports",
                icon: "file-text",
                href: "/lab_report",
            },
            {
                label: "Technician Report",
                icon: "user-check",
                href: "/technician_report",
            },
            {
                label: "Reception Report",
                icon: "users",
                href: "/reception_report",
            },
            {
                label: "Department Reports",
                icon: "layers",
                href: "/department_report",
            },
            {
                label: "Consultant Report",
                icon: "user",
                href: "/consultant_report",
            },
        ],
    },
    {
        title: "SMS",
        iconClass: "uil-message",
        dropdown: [
            {
                label: "General SMS",
                icon: "message-square",
                href: "/general_sms",
            },
            {
                label: "Custom Database",
                icon: "database",
                href: "/customdb",
            },
            {
                label: "Custom SMS",
                icon: "edit-3",
                href: "/custom_sms",
            },
            {
                label: "All Patients",
                icon: "users",
                href: "/all_patient",
            },
        ],
    },
    {
        title: "HR",
        iconClass: "uil-briefcase",
        dropdown: [
            {
                label: "Add Employees",
                icon: "user-plus",
                href: "/add_employ",
            },
            {
                label: "Add Pay",
                icon: "dollar-sign",
                href: "/addpay",
            },
            {
                label: "Loans",
                icon: "credit-card",
                href: "/loan",
            },
            {
                label: "Advances",
                icon: "trending-up",
                href: "/advance",
            },
            {
                label: "Pay History",
                icon: "file-text",
                href: "/pay_history",
            },
        ],
    },

    {
        title: "Account",
        iconClass: "uil-cube",
        dropdown: [
            {
                label: "Cash Audit",
                href: "/cash-audit",
            },
            {
                label: "Due Patients List",
                href: "/due-patient-list",
            },
            {
                label: "Cash Receiving",
                href: "/cash-receive",
            },
            {
                label: "Cash Receiving Report",
                href: "/cash-receive-report",
            },
            {
                label: "Sale Statement",
                href: "/sale-statement",
            },
            {
                label: "Statement By User",
                href: "/statement-user",
            },
            {
                label: "Jazz Cash Report",
                href: "/jazz-cash-report",
            },
            {
                label: "Discount Report",
                href: "/discount-report",
            },
            {
                label: "Advanced Received Report",
                href: "/advanced-receive-report",
            },
            {
                label: "Recovery Report",
                href: "/recovery-report",
            },
            {
                label: "Consultant Payment",
                href: "/consultant-payment",
            },
            {
                label: "Bank Transaction",
                href: "/bank-transaction",
            },
        ],

    },
    {
        title: "Expenses",
        iconClass: "uil-files-landscapes-alt",
        dropdown: [
            {
                label: "Expenses",
                href: "/expenses",
            },
            {
                label: "Expense Report",
                href: "/expense-report",
            },
        ],
    },
    {
        title: "Stock",
        iconClass: "uil-files-landscapes-alt",
        dropdown: [
            {
                label: "Stock Dashboard",
                href: "/stock-dashboard",
            },
            {
                label: "Add Stock",
                href: "/add-stock",
            },
            {
                label: "Stock Inventory",
                href: "/stock-inventory",
            },
            {
                label: "CC Wise Issue Report",
                href: "/cc-wise-issue-report",
            },
            {
                label: "Stock Issue",
                href: "/stock-issue",
            },
            {
                label: "Stock In Report",
                href: "/stock-report",
            },
            {
                label: "Near Expiry",
                href: "/near-expiry",
            },
        ],
    },
    {
        title: "ACCOUNTS",
        iconClass: "uil-files-landscapes-alt",
        dropdown: [
            {
                label: "Create Account",
                href: "/create-account",
            },
            {
                label: "Journal Vouchers",
                href: "/journal-vocher",
            },
            {
                label: "CRV",
                href: "/c-r-v",
            },
            {
                label: "CPV",
                href: "/c-p-v",
            },
            {
                label: "BRV",
                href: "/b-r-v",
            },
            {
                label: "BPV",
                href: "/b-p-v",
            },
            {
                label: "Vouchers",
                href: "/voucher",
            },
            {
                label: "Ledgers",
                href: "/ledger",
            },
        ],
    },

    {
        title: "ACCOUNTS",
        iconClass: "uil-wallet",
        dropdown: [
            {
                label: "Cash Book",
                icon: "book",
                href: "/cash_book",
            },
            {
                label: "Trial Balance",
                icon: "clipboard",
                href: "/trial_balance",
            },
            {
                label: "Balance Sheet",
                icon: "file-text",
                href: "/balance_sheet",
            },
            {
                label: "Profit & Loss",
                icon: "trending-down",
                href: "/profit_loss",
            },
            {
                label: "Income & Expenses",
                icon: "trending-up",
                href: "/income_expenses",
            },
            {
                label: "CPV CASH SUM",
                icon: "dollar-sign",
                href: "/cash",
            },
            {
                label: "Settings",
                icon: "settings",
                href: "/setting",
            },
        ],
    },
];

function DropdownItem({ label, icon, href, isSubDropdown }) {
    if (isSubDropdown) {
        return (
            <li className="dropdown">
                <a
                    className="dropdown-item dropdown-toggle"
                    href={href}
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                >
                    <div className="dropdown-item-wrapper ">
                        <span className="uil fs-8 lh-1 dropdown-indicator-icon " />
                        <span>
                            <span className="me-2 uil" data-feather={icon} style={{ width: 16, height: 16 }} />
                            {label}
                        </span>
                    </div>
                </a>
            </li>
        );
    }
    return (
        <li>
            <a className="dropdown-item" href={href}>
                <div className="dropdown-item-wrapper">
                    <span className="me-2" data-feather={icon} style={{ width: 16, height: 16 }} />
                    {label}
                </div>
            </a>
        </li>
    );
}



export default function NavMenu() {
    return (
        <ul className="navbar-nav navbar-nav-top"  data-dropdown-on-hover="data-dropdown-on-hover">
            {menuItems.map(({ title, iconClass, dropdown }) => (
                <li key={title} className="nav-item dropdown ">
                    <a
                        className="nav-link dropdown-toggle lh-1 color-white"
                        href="#!"
                        role="button"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className={`uil fs-8 color-white me-2 ${iconClass} `} />
                        {title}
                    </a>
                    <ul className="dropdown-menu  navbar-dropdown-caret dropdown-scroll">
                        {dropdown.map((item) => (
                            <DropdownItem key={item.label} {...item} />
                        ))}
                    </ul>

                </li>
            ))}
        </ul>
    );
}
