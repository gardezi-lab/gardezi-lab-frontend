import React from 'react'
import Pagination from '../../departments/consultant/Pagination'

export default function ConsultantPayment() {
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
                        Commission To Consultan
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Doctor Name :
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
                                    Amount  :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Amount "
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
                                           Doctor
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Date
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            CC
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Amount
                                        </th>
                                        <th
                                            className="sort text-white border-top border-translucent" data-sort="view"

                                        >
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3 name">3</td>
                                        <td className="align-middle">18</td>
                                        <td className="align-middle">Waqas</td>
                                        <td className="align-middle">1323328</td>
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
