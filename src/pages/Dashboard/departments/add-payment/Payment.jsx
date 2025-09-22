import React from 'react'


export default function ManagerAccount() {
    return (
        <>
            <div className="card min-vh-50 px-0">
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
                       Add Manager Accounts
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                   Company Name :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Open this select menu</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Amount:
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Amount"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                    Payment Method :
                                </label>
                               <select className="form-select" aria-label="Default select example">
                                    <option selected="">Open this select menu</option>
                                    <option value={1}>Cash</option>
                                    <option value={2}>JazzCash</option>
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
                </div>
            </div>
        </>
    )
}
