import React from 'react'

export default function CashReceiving() {
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
                        Cash Transaction
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-2">
                        <div className="col-md-3">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Reception Name :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Select Reception</option>
                                    <option value={1}>Aqeel Qureshi</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Amount :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Amount"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Description  :
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Description "
                                />
                            </div>
                        </div>
                        <div className="col-md-3" style={{ marginTop: '3%' }}>
                            <button className="btn btn-success"  >
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
