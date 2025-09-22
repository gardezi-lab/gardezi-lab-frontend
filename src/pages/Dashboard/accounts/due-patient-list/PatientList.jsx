import React from 'react'
import Pagination from '../../departments/consultant/Pagination'

export default function PatientList() {
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
                        Patient Due List
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
                                            Date
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Name
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            MR#
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            CC
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            Total
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="view">
                                            Discount
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="view">
                                            Received
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="view">
                                            Credit(Due)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3"></td>
                                        <td className="align-middle"></td>
                                        <td className="align-middle"></td>
                                        <td className="align-middle text-start"></td>
                                        <td className="align-middle">No data available in table</td>
                                        <td className="align-middle text-start"></td>
                                        <td className="align-middle text-start"></td>
                                        <td className="align-middle text-start"></td>
                                        <td className="align-middle text-start"></td>
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
