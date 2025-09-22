import React from 'react'
import Pagination from '../../departments/consultant/Pagination'

export default function StatementUser() {
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
                        Cash Statement By User
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-1">
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
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    User :
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

                        <div className="col-md-2" style={{ marginTop: '3%' }}>
                            <button
                                className="btn btn-success"

                            >
                                Generate CC
                            </button>
                        </div>
                        <div className="col-md-2" style={{ marginTop: '3%' }}>
                            <button
                                className="btn btn-success"

                            >
                                Generate
                            </button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                        <h4 className="" >Income</h4>

                        <div className="d-flex align-items-center">
                            <label
                                className="form-label me-2 mb-0"
                                htmlFor="inputPassword"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Search:
                            </label>
                            <input
                                className="form-control"
                                id="inputPassword"
                                type="password"
                                style={{ width: "200px" }}
                            />
                        </div>
                    </div>

                    <div
                        id="tableExample"
                        data-list='{"valueNames":["name","email","age"],"page":5,"pagination":true}'
                    >
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
                                            Particulars
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3 name">1</td>
                                        <td className="align-middle">Cash Receipt</td>
                                        <td className="align-middle"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                        <h4 className="" >Expense</h4>

                        <div className="d-flex align-items-center">
                            <label
                                className="form-label me-2 mb-0"
                                htmlFor="inputPassword"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Search:
                            </label>
                            <input
                                className="form-control"
                                id="inputPassword"
                                type="password"
                                style={{ width: "200px" }}
                            />
                        </div>
                    </div>

                    <div
                        id="tableExample"
                        data-list='{"valueNames":["name","email","age"],"page":5,"pagination":true}'
                    >
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
                                            Expense Head
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3 name"></td>
                                        <td className="align-middle">No data available in table</td>
                                        <td className="align-middle"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                    </div>

                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row summary-row">
                                    <div className="col-6 summary-label">Total Income</div>
                                    <div className="col-6 text-end summary-value">0</div>
                                </div>
                                <div className="row summary-row">
                                    <div className="col-6 summary-label">Total Expense</div>
                                    <div className="col-6 text-end summary-value">0</div>
                                </div>
                                <div className="row summary-row">
                                    <div className="col-6 summary-label">Net</div>
                                    <div className="col-6 text-end summary-value">0</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
