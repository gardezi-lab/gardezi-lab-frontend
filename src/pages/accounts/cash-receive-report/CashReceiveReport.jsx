import React from 'react'

export default function CashReceiveReport() {
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
                        Cash Rcv Report
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-2">
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Lab :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">All</option>
                                    <option value={1}>Aqeel Qureshi</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Reception :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Select Reception</option>
                                    <option value={1}>Aqeel Qureshi</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    From :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Amount"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    To  :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Description "
                                />
                            </div>
                        </div>
                        <div className="col-md-3 gap-2" style={{ marginTop: '4%' }}>
                            <button type="button" class="btn btn-success btn-sm">Show CC</button>
                            <button type="button" class="btn btn-success btn-sm">Show Reception</button>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}
