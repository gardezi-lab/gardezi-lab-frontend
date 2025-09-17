import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


export default function DashboardLayout() {
    return (
        <>
            <main className="main position-relative min-vh-100 d-flex flex-column" id="top">
                <Header />
                <div className="content flex-grow-1">
                    <div>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </main>
        </>
    )
}
