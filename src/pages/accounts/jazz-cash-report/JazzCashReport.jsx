import React, { useState } from "react";

export default function JazzCashReport() {
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
                        Jazz Cash Report
                    </h5>
                </div>


                <div className="card-body">
                    <div className="container-fluid">
                        {/* Filter Row */}
                        <div className="row g-2 align-items-end mb-3">
                            <div className="col-md-3">
                                <label className="fw-bold mb-1">Reception :</label>
                                <select className="form-control">
                                    <option>Select Reception</option>
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
                            <div className="col-md-2">
                                <button className="btn btn-success flex-fill" onClick={handleShow}>
                                    Show 
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
                                                Date
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="header">
                                                Name
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="fee">
                                                MR #
                                            </th>
                                            <th className="sort text-white border-top border-translucent" data-sort="date">
                                                Amount Recieved
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>Total</td>
                                            <td></td>
                                            <td></td>
                                            <td>0</td>
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
