import React from 'react'
import Pagination from '../../Dashboard/consultant/Pagination'

export default function StockDashboard() {
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
                        Items Dashboard
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-1">
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Item Name :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Item Name"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Price :
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Type :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Select</option>
                                    <option value={1}>Philbatmy</option>
                                    <option value={2}>lab</option>
                                </select>
                            </div>
                        </div>
                       
                        <div className="col-md-2" style={{ marginTop: '3%' }}>
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
                                <thead className='bg-black'>
                                    <tr>
                                        <th
                                            className="ps-3 text-white"
                                            data-sort="sr"
                                        >
                                            Name
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="test">
                                            Price
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Type
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Edit
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3 name">Acid/Tezab</td>
                                        <td className="align-middle">0</td>
                                        <td className="align-middle">phil</td>
                                        <td className="align-middle text-center pe-0">
                                            <div className="btn-reveal-trigger">
                                                <button
                                                    className="btn "
                                                    style={{ backgroundColor: "#17a2b8", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        <span className="fas fa-edit me-2" size={25} /></div>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="align-middle text-center pe-0">
                                            <div className="btn-reveal-trigger">
                                                <button
                                                    className="btn"
                                                    style={{ backgroundColor: "#dc3545", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        <span className="fas fa-trash-alt me-2" size={25} /></div>
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
