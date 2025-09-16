import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function DashboardLayout() {
    return (
        <>
            <main className="main position-relative min-vh-100 d-flex flex-column" id="top">
                <Header />

                {/* Changing part */}
                <div className="content flex-grow-1">
                    <div className="pb-5">
                        <Outlet /> {/* This will load page content */}
                    </div>

                    <Footer />
                </div>
            </main>
        </>
    )
}
