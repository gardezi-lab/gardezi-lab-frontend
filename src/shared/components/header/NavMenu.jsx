import { NavLink } from "react-router-dom";


const menuItems = [
    {
        title: "Dashboard",
        iconClass: "uil uil-dashboard",
        dropdown: [
            {
                label: "Departments",
                icon: "layers",
                href: "/dashboard/department",

            },
            {
                label: "Test & Profile",
                icon: "clipboard",
                href: "/dashboard/testprofile",

            },
            {
                label: "Company Panels",
                icon: "briefcase",
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
        href: "/patient-management/patient"
        // dropdown: [
        //     {
        //         label: "Patients Management",
        //         icon: "users",
        //         href: "/patient-management/patient",

        //     },
        //     {
        //         label: "Cash Management",
        //         icon: "dollar-sign",
        //         href: "/patient-management/cash"
        //     },
        //     {
        //         label: "Delayed Tests",
        //         icon: "clock",
        //         href: "/patient-management/delayed-test"
        //     },
        //     {
        //         label: "Panel Report",
        //         icon: "file-text",
        //         href: "/patient-management/panel-report",
        //     },
        // ],
    },

    {
        title: "User",
        iconClass: "uil uil-user",
        dropdown: [
            // {
            //     label: "Role",
            //     icon: "shield",
            //     href: "/access-management/role",
            // },
            {
                label: "User",
                icon: "user",
                href: "/access-management/users",
            },
            {
                label: "Acess Management",
                icon: "user-check",
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
                icon: "plus-square",
                href: "/stock-management/add-stock",
            },
            {
                label: "Stock Purchase",
                icon: "shopping-cart",
                href: "/stock-management/stock-purchase",
            },
            {
                label: "Stock Usage",
                icon: "trending-down",
                href: "/stock-management/stock-usage",
            },
            {
                label: "Stock Inventory",
                icon: "archive",
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
                icon: "clipboard",
                href: "/account-management/journal-voucher",
            },
            {
                label: "CRV",
                icon: "dollar-sign",
                href: "/account-management/c-r-v",
            },
            {
                label: "CPV",
                icon: "dollar-sign",
                href: "/account-management/c-p-v",
            },
            {
                label: "BRV",
                icon: "book-open",
                href: "/account-management/b-r-v",
            },
            {
                label: "BPV",
                icon: "book-open",
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
                icon: "activity",
                href: "/report-management/log-report",
            },
            {
                label: "Business Report",
                icon: "trending-up",
                href: "/report-management/business-report",
            },
            {
                label: "Due Patient",
                icon: "clock",
                href: "/report-management/due-patient",
            },
            {
                label: "Sale Statement",
                icon: "bar-chart-2",
                href: "/report-management/sale-statement",
            },
            {
                label: "Discount Report",
                icon: "percent",
                href: "/report-management/discount-report",
            },
            {
                label: "Consultant Report",
                icon: "user",
                href: "/report-management/consultant-report",
            },
            {
                label: "Lab Report",
                icon: "layers",
                href: "/report-management/lab-report",
            },
            {
                label: "Receptiones Report",
                icon: "users",
                href: "/report-management/receiptiones-report",
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
        .map(menu => {
            // 🔴 STEP 1: Parent permission strictly check
            // agar parent ka permission explicitly 0 hai → poora menu hide
            if (permission.hasOwnProperty(menu.title) && permission[menu.title] == 0) {
                return null;
            }
     
            // 🟢 STEP 2: Filter dropdown items
            const filteredDropdown = menu?.dropdown?.filter(ddItem => {
                // 1️⃣ exact label permission (rare case)
                if (permission[ddItem.label] == 1) return true;

                // 2️⃣ match sub-permissions like:
                // "Departments Add", "Departments Edit", etc.
                return Object.entries(permission).some(([key, value]) => {
                    if (value !== 1) return false;
                    return key.toLowerCase().startsWith(ddItem.label.toLowerCase());
                });
            });

            // 🔴 STEP 3: agar koi child bacha hi nahi → parent bhi hide
            // if (filteredDropdown.length === 0) return null;

            return {
                ...menu,
                dropdown: filteredDropdown
            };
        })
        .filter(Boolean);

    console.log('filteredMenuItems', filteredMenuItems)
    return (
        <ul className="navbar-nav navbar-nav-top" data-dropdown-on-hover="data-dropdown-on-hover">
            {/* {filteredMenuItems.map(({ title, iconClass, dropdown }) => (
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
                        {dropdown?.map((item) => (
                            <DropdownItem key={item.label} {...item} />
                        ))}
                    </ul>
                </li>
            ))} */}
            {filteredMenuItems.map(({ title, iconClass, dropdown, href }) => {
    const hasDropdown = Array.isArray(dropdown) && dropdown.length > 0;

    return (
        <li key={title} className={`nav-item ${hasDropdown ? "dropdown" : ""}`}>
            {hasDropdown ? (
                <>
                    <a
                        className="nav-link dropdown-toggle lh-1 color-white"
                        href="#!"
                        role="button"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
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
                </>
            ) : (
                <NavLink
                    to={href}
                    className="nav-link lh-1 color-white"
                >
                    <span className={`uil fs-8 color-white me-2 ${iconClass}`} />
                    {title}
                </NavLink>
            )}
        </li>
    );
})}

        </ul>
    );
}

