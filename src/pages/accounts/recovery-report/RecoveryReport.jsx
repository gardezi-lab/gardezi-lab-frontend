import React, { useState } from "react";
import Pagination from '../../Dashboard/consultant/Pagination'

export default function RecoveryReport() {
    const [activeTable, setActiveTable] = useState(null);

    return (
        <>
            <div className="card  px-0">
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
                        Reception Recovery Received
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-1">
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Reception :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Select</option>
                                    <option value={1}>Aqeel Qureshi</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    CC :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Select</option>
                                    <option value={1}>Aqeel Qureshi</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    From :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    To :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        <div className="col-md-2" style={{ marginTop: '3%' }}>
                            <button
                                className="btn btn-success flex-fill" onClick={() => setActiveTable("reception")}

                            >
                                Show
                            </button>
                        </div>
                        <div className="col-md-2" style={{ marginTop: '3%' }}>
                            <button
                                className="btn btn-success flex-fill" onClick={() => setActiveTable("cc")}

                            >
                                Show CC
                            </button>
                        </div>
                    </div>
                    {activeTable === "reception" && (
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
                                            Receptionist
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            CC
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Pt Name
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            MR #
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Amount Received
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>0</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#dc3545", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-trash-alt me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>

                            </table>
                            <Pagination />
                        </div>

                    )}

                    {activeTable === "cc" && (
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
                                            Receptionist
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            CC
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Pt Name
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            MR #
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Amount Received
                                        </th>
                                         <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>0</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#dc3545", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-trash-alt me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
