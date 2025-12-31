import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBuilding,
    FaUserCircle,
    FaSlidersH,
    FaBoxOpen,
    FaFileAlt,
    FaUserNurse,
    FaUsers,
    FaDollarSign,
    FaClock,
    FaFlask,
    FaBookOpen,
    FaCog,
    FaChartLine,
    FaHistory,
    FaPercentage,
    FaReceipt,
    FaFileInvoiceDollar,
    FaMoneyCheckAlt,
    FaExchangeAlt,
    FaClipboardList
} from "react-icons/fa";

const menuItems = [
    {
        title: "Dashboard",
        iconClass: "uil uil-dashboard",
        dropdown: [
            {
                label: "Departments",
                icon: <FaBuilding />,
                href: "/dashboard/department",

            },
            {
                label: "Test & Profile",
                icon: "user-circle",
                href: "/dashboard/testprofile",

            },
            {
                label: "Company Panels",
                icon: "sliders",
                href: "/dashboard/company-panel",
            },
            {
                label: "Test Package",
                icon: "package",
                href: "/dashboard/test-package",
            },
            {
                label: "Interpertation",
                icon: "file-text",
                href: "/dashboard/interpertation",
            },
        ],
    },

    {
        title: "Patients",
        iconClass: "uil uil-user-nurse",

        dropdown: [
            {
                label: "Patients Management",
                icon: "users",
                href: "/patient-management/patient",

            },
            {
                label: "Cash Management",
                icon: "dollar-sign",
                href: "/patient-management/cash"
            },
            {
                label: "Delayed Tests",
                icon: "clock",
                href: "/patient-management/delayed-test"
            },
            {
                label: "Panel Report",
                icon: "file-text",
                href: "/patient-management/panel-report",
            },
        ],
    },

    {
        title: "User",
        iconClass: "uil uil-user",
        dropdown: [
            {
                label: "Role",
                icon: "flask",
                href: "/access-management/role",
            },
            {
                label: "User",
                icon: "building",
                href: "/access-management/users",
            },
            {
                label: "User Management",
                icon: "flask",
                href: "/access-management/user-manage",
            },
        ],

    },
    {
        title: "Stock",
        iconClass: "uil-files-landscapes-alt",
        dropdown: [
            {
                label: "Add Stock",
                href: "/stock-management/add-stock",
            },
            {
                label: "Stock Purchase",
                href: "/stock-management/stock-purchase",
            },
            {
                label: "Stock Usage",
                href: "/stock-management/stock-usage",
            },
            {
                label: "Stock Inventory",
                href: "/stock-management/stock-inventory",
            },
        ],
    },

    {
        title: "Accounts",
        iconClass: "uil uil-file-bookmark-alt",
        dropdown: [
            {
                label: "Create Account",
                icon: "file-plus",
                href: "/account-management/create-account",
            },
            {
                label: "Journal Vouchers",
                icon: "notes",
                href: "/account-management/journal-voucher",
            },
            {
                label: "CRV",
                icon: "uil-receipt",
                href: "/account-management/c-r-v",
            },
            {
                label: "CPV",
                icon: "receipt-alt",
                href: "/account-management/c-p-v",
            },
            {
                label: "BRV",
                icon: "bill",
                href: "/account-management/b-r-v",
            },
            {
                label: "BPV",
                icon: "transaction",
                href: "/account-management/b-p-v",
            },
            {
                label: "Ledgers",
                icon: "book-open",
                href: "/account-management/ledger",
            },
            {
                label: "Settings",
                icon: "settings",
                href: "/account-management/settings",
            },
        ],
    },
    {
        title: "Reportings",
        iconClass: "uil uil-chart",
        dropdown: [
            {
                label: "Log Report",
                icon: "history",
                href: "/report-management/log-report",
            },
            {
                label: "Business Report",
                icon: "chart-line",
                href: "/report-management/business-report",
            },
            {
                label: "Due Patient",
                icon: "user-clock",
                href: "/report-management/due-patient",
            },
            {
                label: "Sale Statement",
                icon: "receipt",
                href: "/report-management/sale-statement",
            },
            {
                label: "Discount Report",
                icon: "percentage",
                href: "/report-management/discount-report",
            },
            {
                label: "Consultant Report",
                icon: "user-md",
                href: "/report-management/consultant-report",
            },
            {
                label: "Lab Report",
                icon: "flask",
                href: "/report-management/lab-report",
            },
            {
                label: "Receptiones Report",
                icon: "user-nurse",
                href: "/report-management/receiptiones-report",
            },
        ],
    }
];

function DropdownItem({ label, icon, href, isSubDropdown }) {
    const handleClick = () => {
        const dropdowns = document.querySelectorAll(".dropdown-menu.show");
        dropdowns.forEach((dropdown) => {
            const parent = dropdown.closest(".dropdown");
            if (parent) {
                const toggle = parent.querySelector('[data-bs-toggle="dropdown"]');
                if (toggle) {
                    const bsDropdown = bootstrap.Dropdown.getInstance(toggle);
                    if (bsDropdown) {
                        bsDropdown.hide();
                    }
                }
            }
        });
    };

    if (isSubDropdown) {
        return (
            <li className="dropdown">
                <NavLink
                    to={href}
                    className={({ isActive }) =>
                        `dropdown-item dropdown-toggle ${isActive ? "active" : ""}`
                    }
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                >
                    <div className="dropdown-item-wrapper">
                        <span className="uil fs-8 lh-1 dropdown-indicator-icon " />
                        <span>
                            <span
                                className="me-2 uil"
                                data-feather={icon}
                                style={{ width: 16, height: 16 }}
                            />
                            {label}
                        </span>
                    </div>
                </NavLink>
            </li>
        );
    }

    return (
        <li>
            <NavLink
                to={href}
                className={({ isActive }) =>
                    `dropdown-item ${isActive ? "active" : ""}`
                }
                onClick={handleClick}
            >
                <div className="dropdown-item-wrapper">
                    <span
                        className="me-2"
                        data-feather={icon}
                        style={{ width: 16, height: 16 }}
                    />
                    {label}
                </div>
            </NavLink>
        </li>
    );
}

export default function NavMenu() {
    const user = localStorage.getItem("LoggedInUser");
    const permission = JSON.parse(localStorage.getItem("permissions") || "{}");
    const role = JSON.parse(user)?.role;

    const filteredMenuItems = menuItems
        .map(item => {
            if (item.roles && !item.roles.includes(role)) return null;
            const filteredDropdown = item.dropdown?.filter(ddItem => {
                const labelKey = ddItem.label; 
                if (ddItem.roles && !ddItem.roles.includes(role)) return false;
                if (permission[labelKey] === 0) return false;
                return true;
            });

            if (filteredDropdown?.length === 0) return null;
            return {
                ...item,
                dropdown: filteredDropdown,
            };
        })
        .filter(Boolean);

    return (
        <ul className="navbar-nav navbar-nav-top" data-dropdown-on-hover="data-dropdown-on-hover">
            {filteredMenuItems.map(({ title, iconClass, dropdown }) => (
                <li key={title} className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle lh-1 color-white"
                        href="#!"
                        role="button"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className={`uil fs-8 color-white me-2 ${iconClass}`} />
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

