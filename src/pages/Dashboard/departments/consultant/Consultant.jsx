import React from 'react'
import Pagination from './Pagination'

export default function Consultant() {
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
                        Consultants
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Doctor Name :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Lab's Name"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Contact No :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Contact No"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Hospital :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Address Here"
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
                                    placeholder="Enter UserName"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                   Age :
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Age"
                                />
                            </div>
                        </div>
                        <div className="col-md-2" style={{marginTop: '5%'}}>
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
                                            Sr.
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="test">
                                            Name
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Phone
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            Hospital
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            %Age
                                        </th>
                                        <th
                                            className="sort text-white border-top border-translucent" data-sort="view"

                                        >
                                           UserName
                                        </th>
                                         <th
                                            className="sort text-white border-top border-translucent" data-sort="view"

                                        >
                                            Password
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
                                        <td className="align-middle ps-3 name">3</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>oscar@example.com</td>
                                        <td className="align-middle age">52</td>
                                        <td className="align-middle email">anna@example.com</td>
                                        <td className="align-middle">18</td>
                                        <td className="align-middle">Waqas</td>
                                        <td className="align-middle">1323328</td>
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
                                        <td className="align-middle ps-3 name">3</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>oscar@example.com</td>
                                        <td className="align-middle age">52</td>
                                        <td className="align-middle email">anna@example.com</td>
                                        <td className="align-middle">18</td>
                                        <td className="align-middle">Waqas</td>
                                        <td className="align-middle">1323328</td>
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
                                                    style={{ backgroundColor: "#17a2b8", color: "#fff", width: "10px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-edit me-2" size={25} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle ps-3 name">3</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>oscar@example.com</td>
                                        <td className="align-middle age">52</td>
                                        <td className="align-middle email">anna@example.com</td>
                                        <td className="align-middle">18</td>
                                        <td className="align-middle">Waqas</td>
                                        <td className="align-middle">1323328</td>
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
