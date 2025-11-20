import React from 'react'

export default function Voucher() {
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
                        VOUCHERS
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-4 mb-2">
                        <div className="col-md-4">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Voucher No   :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Voucher No "
                                />
                            </div>
                        </div>
                        <div className="col-md-2" style={{ marginTop: '5%' }}>
                            <button
                                className="btn btn-success"

                            >
                                Print
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="row g-2 mt-2">
                        <div className="col-md-4">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    From Voucher   :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="From Voucher"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    To Voucher   :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="To Voucher"
                                />
                            </div>
                        </div>
                        <div className="col-md-2" style={{ marginTop: '3%' }}>
                            <button
                                className="btn btn-success"

                            >
                                View
                            </button>
                        </div>
                    </div>

                    <div
                        id="tableExample"
                        data-list='{"valueNames":["name","email","age"],"page":5,"pagination":true}'
                    >
                        <div className="table-responsive mt-4">
                            <table className="table table-bordered table-lg fs-9 mb-0 w-100">
                                <thead className='bg-black'>
                                    <tr>
                                        <th
                                            className="ps-3 text-white"
                                            data-sort="sr"
                                        >
                                            Sr.
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="test">
                                            V no
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="header">
                                            Print
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="fee">
                                            Delete
                                        </th>
                                        <th className="sort text-white border-top border-translucent" data-sort="date">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3 name">1</td>
                                        <td className="align-middle">Test Entry-10082</td>
                                        <td className="align-middle">Print</td>
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
                    </div>
                </div>
            </div>
        </>
    )
}
