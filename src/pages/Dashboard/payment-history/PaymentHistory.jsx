import React from 'react'

export default function PaymentHistory() {
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
                        Payment History Companies
                    </h5>
                </div>


                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label className="fw-bold mb-2">
                                   Select Panel :
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Open this select menu</option>
                                    <option value={1}>PANEL 1</option>
                                    <option value={2}>PANEL 2</option>
                                    <option value={3}>PANEL 3</option>
                                </select>
                            </div>
                        </div>
                       
                        <div className="col-md-2" style={{ marginTop: '5%' }}>
                            <button
                                className="btn btn-success"

                            >
                                Generate
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
