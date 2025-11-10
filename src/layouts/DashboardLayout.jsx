import { Outlet } from "react-router-dom";
import Header from "../shared/components/header/Header";

export default function DashboardLayout() {
    return (
        <>
            <main className="main" id="top">
                <Header />
                <div className="content">
                    <div>
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    )
}
