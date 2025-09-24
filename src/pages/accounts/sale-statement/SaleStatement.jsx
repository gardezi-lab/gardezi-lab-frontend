import React from 'react'
import Pagination from '../../Dashboard/consultant/Pagination'

export default function SaleStatement() {
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
                       Sale Statement Report
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-2">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                                className="btn btn-success"

                            >
                                Generate
                            </button>
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
                                            Lab
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Total Sale
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            Discount
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Expenses
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="view">
                                           Payment(Advance)
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="view">
                                            Payment(Recoveries)
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="view">
                                            Payment(Total)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3 name">1</td>
                                        <td className="align-middle">CC02- GCR</td>
                                        <td className="align-middle"></td>
                                        <td className="align-middle"></td>
                                        <td className="align-middle"></td>
                                        <td className="align-middle"></td>
                                        <td className="align-middle"></td>
                                        <td className="align-middle">0</td>
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
