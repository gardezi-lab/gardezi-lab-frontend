import React from 'react'
import Pagination from '../consultant/Pagination'

export default function AddTechnician() {
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
                       Add Technician
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Name :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Receptionist Name"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Password For Login :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Username :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Color For Graphical :
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="#123456"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Select CC :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Open this select menu</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-2" style={{ marginTop: '5%' }}>
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
                                            Password
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                           UserName
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            CC
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Graph Color
                                        </th>
                                        <th
                                            className="sort text-white border-top border-translucent" data-sort="view"

                                        >
                                            Delete
                                        </th>
                                        <th
                                            className="sort text-white border-top border-translucent" data-sort="view"

                                        >
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3 name">CBC</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>121343242</td>
                                        <td className="align-middle">Waqas</td>
                                        <td className="align-middle">CC13- CGL</td>
                                        <td className="align-middle">#C0392B</td>
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
                                    </tr>
                                    <tr>
                                        <td className="align-middle ps-3 name">CBC</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>121343242</td>
                                        <td className="align-middle">Waqas</td>
                                        <td className="align-middle">CC13- CGL</td>
                                        <td className="align-middle">#C0392B</td>
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
                                    </tr>
                                     <tr>
                                        <td className="align-middle ps-3 name">CBC</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>121343242</td>
                                        <td className="align-middle">Waqas</td>
                                        <td className="align-middle">CC13- CGL</td>
                                        <td className="align-middle">#C0392B</td>
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
