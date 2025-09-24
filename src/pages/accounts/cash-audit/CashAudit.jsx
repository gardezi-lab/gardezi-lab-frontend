import React, { useState } from "react";

export default function CashAudit() {
    const [showTable, setShowTable] = useState(false);

    const handleShow = () => {
        setShowTable(true);
    };

    return (
        <>
            <div className="card min-vh-50 px-0">
                <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                        backgroundColor: "#f39c12",
                        color: "#fff",
                        padding: "2rem 1rem", // adjust top/bottom padding
                        height: "48px"          // optional fixed height
                    }}
                >
                    <h5 className="card-title mb-0" style={{ color: "#fff" }}>
                        Cash Audit
                    </h5>
                </div>


                <div className="card-body">
                    <div className="container-fluid">
                        {/* Filter Row */}
                        <div className="row g-2 align-items-end mb-3">
                            <div className="col-md-3">
                                <label className="fw-bold mb-1">Lab :</label>
                                <select className="form-control">
                                    <option>All</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label className="fw-bold mb-1">Receptionist:</label>
                                <select className="form-control">
                                    <option>Select Reception</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>

                            <div className="col-md-2">
                                <label className="fw-bold mb-1">Type:</label>
                                <select className="form-control">
                                    <option>Select Type</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>

                            <div className="col-md-2">
                                <label className="fw-bold mb-1">From:</label>
                                <input
                                    className="form-control datetimepicker flatpickr-input"
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    readOnly
                                />
                            </div>

                            <div className="col-md-2">
                                <label className="fw-bold mb-1">To:</label>
                                <input
                                    className="form-control datetimepicker flatpickr-input"
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row">
                            {/* Buttons inline */}
                            <div className="col-md-6 d-flex gap-1">
                                <button className="btn btn-success flex-fill" onClick={handleShow}>
                                    Show CC
                                </button>
                                <button className="btn btn-success flex-fill" onClick={handleShow}>
                                    Show Reception
                                </button>
                                <button className="btn btn-success flex-fill" onClick={handleShow}>
                                    Recovery / New Entry
                                </button>
                            </div>
                        </div>

                        {/* Table Displayed only after button click */}
                        {showTable && (
                            <div className="table-responsive mt-4">
                                <table className="table table-lg fs-9 mb-0 w-100">
                                    <thead className='bg-black'>
                                        <tr>
                                            <th
                                                className="ps-3 text-white"
                                                data-sort="sr"
                                            >
                                                Sr.
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="test">
                                                Date/Time
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="header">
                                                Debit
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="fee">
                                                Credit
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="date">
                                                Description
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="date">
                                                CC
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="date">
                                                Is Admin
                                            </th>
                                            <th
                                                className="sort text-white border-top border-translucent" data-sort="view"

                                            >
                                                Receptionist
                                            </th>
                                            <th
                                                className="sort text-white border-top border-translucent" data-sort="view"

                                            >
                                                Type
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>15-09-2025 / 04:14 pm</td>
                                            <td>6300</td>
                                            <td>0</td>
                                            <td>2025-GL-5761</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>entry</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
