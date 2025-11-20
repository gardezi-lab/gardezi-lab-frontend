import { useState } from "react";
import { useEffect } from "react";

export default function UserDropdown() {
    const [profile, setProfile] = useState();

    const handleSignOut = () => {
        localStorage.removeItem("LoggedInUser");
    }

    useEffect(() => {
        const obj = JSON.parse(localStorage.getItem("LoggedInUser"));
        setProfile(obj);
    }, [])

    return (
        <li className="nav-item dropdown">
            <a style={{ color: "#ffffff", }}
                className="nav-link white-space-nowrap"
                id="navbarDropdownUser "
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                data-bs-auto-close="outside"
                aria-expanded="false"
            >
                {profile && profile.user.name}{" "}
                <span className="d-inline-block" >
                    <span className="fa-solid fa-chevron-down fs-10" />
                </span>
            </a>
            <div
                className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border"
                aria-labelledby="navbarDropdownUser "
            >
                <div className="card position-relative border-0">
                    <div className="card-body p-0">
                        <div className="text-center pt-4 pb-3">
                            <div className="avatar avatar-xl ">
                                <img className="rounded-circle " src="../assets/img/team/57.webp" alt="" />
                            </div>
                            <h6 className="mt-2 text-body-emphasis">
                                {profile && profile.user.name}{" "}
                            </h6>
                        </div>
                        {/* <div className="mb-3 mx-3">
                            <input
                                className="form-control form-control-sm"
                                id="statusUpdateInput"
                                type="text"
                                placeholder="Update your status"
                            />
                        </div> */}
                    </div>
                    {/* <div className="overflow-auto scrollbar" style={{ height: "10rem" }}>
                        <ul className="nav d-flex flex-column mb-2 pb-1">
                            {[
                                { label: "Profile", icon: "user" },
                                { label: "Dashboard", icon: "pie-chart" },
                                { label: "Posts & Activity", icon: "lock" },
                                { label: "Settings & Privacy", icon: "settings" },
                                { label: "Help Center", icon: "help-circle" },
                                { label: "Language", icon: "globe" },
                            ].map(({ label, icon }) => (
                                <li key={label} className="nav-item">
                                    <a className="nav-link px-3 d-block" href="#!">
                                        <span className="me-2 text-body align-bottom" data-feather={icon}
                                            style={{ width: 16, height: 16 }} />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                    <div className="card-footer  p-0">
                        {/* <ul className="nav d-flex flex-column my-3">
                            <li className="nav-item">
                                <a className="nav-link px-3 d-block" href="#!">
                                    <span className="me-2 text-body align-bottom" data-feather="user-plus"
                                        style={{ width: 16, height: 16 }} />
                                    Add another account
                                </a>
                            </li>

                        </ul> */}
                        <div className="px-1 mt-1 mb-1">
                            <a className="btn btn-phoenix-secondary d-flex flex-center w-100" href="/update-profile"
                                
                            >
                                <span className="me-2" data-feather="log-out"
                                    style={{ width: 16, height: 16,  }} />
                                Update Profile
                            </a>
                        </div>
                        {/* <hr /> */}
                        <div className="px-1">
                            <a className="btn btn-phoenix-secondary d-flex flex-center w-100" 
                           
                            href="/auth/login"
                                onClick={handleSignOut}
                            >
                                <span className="me-2" data-feather="log-out" 
                                    style={{ width: 16, height: 16, }} />
                                Sign out
                            </a>
                        </div>
                        <div className="my-2 text-center fw-bold fs-10 text-body-quaternary">
                            <a className="text-body-quaternary me-1" href="#!">
                                {/* Privacy policy */}
                            </a>
                            {/* • */}
                            <a className="text-body-quaternary mx-1" href="#!">
                                {/* Terms */}
                            </a>
                            {/* • */}
                            <a className="text-body-quaternary ms-1" href="#!">
                                {/* Cookies */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}