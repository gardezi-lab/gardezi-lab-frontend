const menuItems = [
    {
        title: "Dashboard",
        iconClass: "uil-chart-pie",
        dropdown: [
            {
                label: "Departments",
                icon: "share-2",
                href: "/departments",
            },
            {
                label: "Test & Profile",
                icon: "share-2",
                href: "/testprofile",
            },
            {
                label: "Consultants",
                icon: "share-2",
                href: "/consultant",
            },
            {
                label: "Collection Center",
                icon: "share-2",
                href: "/collectioncenter",
            },
             {
                label: "CC Rate List",
                icon: "share-2",
                href: "/cc-rate-list",
            },
            {
                label: "Add Reception",
                icon: "share-2",
                href: "/reception-add",
            },
            {
                label: "Technicians",
                icon: "share-2",
                href: "/technician-list",
            },
             {
                label: "Pathologist",
                icon: "share-2",
                href: "/pathologist-add",
            },
             {
                label: "Account Department",
                icon: "share-2",
                href: "/account-department",
            },
             {
                label: "Manager Account",
                icon: "share-2",
                href: "/manager-add",
            },
             {
                label: "Add Banks",
                icon: "share-2",
                href: "/add-bank",
            },
             {
                label: "Add Panels",
                icon: "share-2",
                href: "/add-panel",
            },
             {
                label: "Payments",
                icon: "share-2",
                href: "/add-payment",
            },
        ],
    },
    {
        title: "Apps",
        iconClass: "uil-cube",
        dropdown: [
            {
                label: "Email",
                icon: "mail",
                href: "/",
                isSubDropdown: true,
            },
        ],
    },
    {
        title: "Pages",
        iconClass: "uil-files-landscapes-alt",
        dropdown: [
            {
                label: "Authentication",
                icon: "lock",
                href: "/",
                isSubDropdown: true,
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
                    <ul className="dropdown-menu navbar-dropdown-caret">
                        {dropdown.map((item) => (
                            <DropdownItem key={item.label} {...item} />
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
