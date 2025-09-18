import React from 'react'
import Pagination from '../consultant/Pagination'

export default function AddPanel() {
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
                        Panel Companies
                    </h5>
                </div>

                <div className="card-body">

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
                                <thead className='bg-black'>
                                    <tr>
                                        <th
                                            className="ps-3 text-white"
                                            data-sort="sr"
                                        >
                                            Sr.
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="test">
                                            Name
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Head Name
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            Contact No.
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            Username
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            Password
                                        </th>
                                        <th
                                            className="sort text-white border-top border-translucent" data-sort="view"

                                        >
                                            Edit
                                        </th>
                                        <th
                                            className="sort text-white border-top border-translucent" data-sort="view"

                                        >
                                            Rate List
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3">1</td>
                                        <td className="align-middle">INSAAF SEHAT CARD</td>
                                        <td className="align-middle">1</td>
                                        <td className="align-middle text-start">2423153436</td>
                                        <td className="align-middle">insaaf2</td>
                                        <td className="align-middle text-start">gah1324434</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#17a2b8", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-edit me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="align-middle text-start text-danger fw-bold">Rate List</td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle ps-3">1</td>
                                        <td className="align-middle">INSAAF SEHAT CARD</td>
                                        <td className="align-middle">1</td>
                                        <td className="align-middle text-start">2423153436</td>
                                        <td className="align-middle">insaaf2</td>
                                        <td className="align-middle text-start">gah1324434</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#17a2b8", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-edit me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="align-middle text-start text-danger fw-bold">Rate List</td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle ps-3">1</td>
                                        <td className="align-middle">INSAAF SEHAT CARD</td>
                                        <td className="align-middle">1</td>
                                        <td className="align-middle text-start">2423153436</td>
                                        <td className="align-middle">insaaf2</td>
                                        <td className="align-middle text-start">gah1324434</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#17a2b8", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-edit me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="align-middle text-start text-danger fw-bold">Rate List</td>
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
