import { useState } from "react";
export default function Business() {
    const [search, setSearch] = useState("2025-GL-");
    const [showExcel, setShowExcel] = useState(true);
    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div
                className="card shadow-lg border-0 rounded-3"
                style={{ width: "100%" }}
            >
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">Business Report</h5>
                    {/* <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                    >
                        Add Header
                    </button> */}
                </div>

                <div className="card-body">

                    <div className="d-flex align-items-end gap-2 mb-2">
                        <div className="col-md-2">
                            <label htmlFor="fromDate" className="form-label">From</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fromDate"
                                name="fromDate"
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="toDate" className="form-label">To</label>
                            <input
                                type="date"
                                className="form-control"
                                id="toDate"
                                name="toDate"
                            />
                        </div>
                        <div>
                            <button type="button" className="btn btn-success">
                                Filter on Dates
                            </button>
                        </div>
                    </div>
                    {/* 4 Column Cards */}
                    <div className="row">
                        <div className="col-md-3 mb-3" >
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#17A2B8",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">
                                        TOTAL PATIENTS</h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#28A745",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">PATIENTS PROCESSED</h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0"
                                style={{
                                    backgroundColor: "#DC3545",
                                }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">PENDING PATIENTS </h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#17A2B8",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">TOTAL TESTS</h6>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#DC3545",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white"> PROCESSED TESTS</h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#17A2B8",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">TOTAL SALE</h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#FFC107",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">TOTAL DISCOUNT</h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#28A745",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">NET AMOUNT</h6>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#17A2B8",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">NET CASH RCEIEVED</h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#FFC107",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">DUE</h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#28A745",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">EXPENSE</h6>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#DC3545",
                            }}>
                                <div className="card-body text-center ">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">CASH RCVD ADMIN</h6>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="card shadow-sm border-0" style={{
                                backgroundColor: "#17A2B8",
                            }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-white">0</h3>
                                    <h6 className="fw-bold text-white">PENDING URGENTS</h6>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                {/* Card Footer */}
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <div>Showing 1 to 7 of 7 entries</div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination mb-0">
                            <li className="page-item disabled">
                                <a className="page-link">Previous</a>
                            </li>
                            <li className="page-item active" aria-current="page">
                                <a className="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
