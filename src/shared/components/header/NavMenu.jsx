import { href, NavLink } from "react-router-dom";



const menuItems = [
    {
        title: "Dashboard",
        iconClass: "uil uil-dashboard",
        dropdown: [
            {
                label: "Departments",
                icon: "uil uil-building",
                href: "/dashboard/department",
            },
            {
                label: "Test & Profile",
                icon: "flask",
                href: "/dashboard/testprofile",
            },
            {
                label: "Company Panels",
                icon: "sliders-v-alt",
                href: "/dashboard/company-panel",
            },
            {
                label: "Test Package",
                icon: "box",
                href: "/dashboard/test-package",
            },
            {
                label: "Interpertation ",
                icon: "receipt",
                href: "/dashboard/interpertation ",
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
                icon: "uil-flask",
                href: "/access-management/role",
            },
            {
                label: "User",
                icon: "uil-building",
                href: "/access-management/users",
            },
            {
                label: "User Management",
                icon: "uil-flask",
                href: "/access-management/user-manage",
            },
        ],

    },
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

    // ✅ Normal dropdown item (auto close after click)
    return (
        <li>
            <NavLink
                to={href}
                className={({ isActive }) =>
                    `dropdown-item ${isActive ? "active" : ""}`
                }
                onClick={handleClick} // 👈 add auto-close here
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
    return (
        <ul className="navbar-nav navbar-nav-top" data-dropdown-on-hover="data-dropdown-on-hover">
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
