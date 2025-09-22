const menuItems = [
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
                    <div className="dropdown-item-wrapper">
                        <span className="uil fs-8 lh-1 dropdown-indicator-icon" />
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
        <ul className="navbar-nav navbar-nav-top" data-dropdown-on-hover="data-dropdown-on-hover">
            {menuItems.map(({ title, iconClass, dropdown }) => (
                <li key={title} className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle lh-1"
                        href="#!"
                        role="button"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className={`uil fs-8 me-2 ${iconClass}`} />
                        {title}
                    </a>
                    <ul className="dropdown-menu navbar-dropdown-caret dropdown-scroll">
                        {dropdown.map((item) => (
                            <DropdownItem key={item.label} {...item} />
                        ))}
                    </ul>

                </li>
            ))}
        </ul>
    );
}
