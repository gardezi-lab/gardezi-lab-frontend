import React from 'react'
import Pagination from '../consultant/Pagination'

export default function CCRateList() {
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
                        CC Rate List
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-4">
                        <h5 className="text-start">Copy rates from one to another CC</h5>
                        <div className="col-md-3">
                            <div className="mb-2">
                                <select className="form-control" aria-label="Default select example">
                                    <option selected="">Open this select menu</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-2">
                                <select className="form-control" aria-label="Default select example">
                                    <option selected="">Open this select menu</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>

                            </div>
                        </div>
                        <div className="col-md-2" style={{ marginTop: '%' }}>
                            <button
                                className="btn btn-success"

                            >
                                Submit
                            </button>
                        </div>

                    </div>
                    <div className="row g-4 mt-2">
                        <h5 className="text-start">Change individual Rate List</h5>
                        <div className="col-md-3">
                            <div className="row">
                                <label className="col-sm-5 col-form-label" htmlFor="inputPassword">
                                    Lab Name
                                </label>
                                <div className="col-sm-7">
                                    <select className="form-control" aria-label="Default select example">
                                        <option selected="">Open this select menu</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2" style={{ marginTop: '%' }}>
                            <button
                                className="btn btn-success"

                            >
                                Submit
                            </button>
                        </div>

                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                        <button
                            className="btn"
                            style={{ backgroundColor: "#6c757d", color: "#fff" }}
                        >
                            Excel
                        </button>

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
                                <thead>
                                    <tr>
                                        <th
                                            className="ps-3"
                                            data-sort="sr"
                                        >
                                            Sr.
                                        </th>
                                        <th className="sort border-top border-translucent" data-sort="test">
                                            Test Name
                                        </th>
                                        <th className="sort border-top border-translucent" data-sort="header">
                                            Rates
                                        </th>
                                        <th
                                            className="sort border-top border-translucent" data-sort="view"

                                        >
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ">1</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>something else</td>
                                        <td className="align-middle age">550</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#28A745", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-edit me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td className="align-middle ">1</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>something else</td>
                                        <td className="align-middle age">550</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#28A745", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-edit me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td className="align-middle ">1</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>something else</td>
                                        <td className="align-middle age">550</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#28A745", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-edit me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    )
}
