import { useState } from "react";

export default function ProfitLoss() {
    const [form, setForm] = useState({
        fromDate: "",
        toDate: "",
    });

    const [showTable, setShowTable] = useState(false); // ✅ table toggle state

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowTable(true);
    };

    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div className="card shadow-lg border-0 rounded-3 w-100">
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">PROFIT & LOSS</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <hr className="mt-3" />
                        <div className="row mb-3">

                            <div className="col-md-2">
                                <label htmlFor="fromDate" className="form-label">From</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fromDate"
                                    name="fromDate"
                                    value={form.fromDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-2">
                                <label htmlFor="toDate" className="form-label">To</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="toDate"
                                    name="toDate"
                                    value={form.toDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3 mt-4">
                                <button type="submit" className="btn btn-success">
                                    SHOW
                                </button>
                            </div>
                        </div>
                    </form>

                    <hr />

                    {/* ✅ Always show after button click */}
                    {showTable && (
                        <div className="mt-4">
                            <p className="fw-bold">
                                Income
                            </p>
                            <table className="table table-striped table-bordered table-hover">
                                <thead style={{ backgroundColor: "#c5c7caff", color: "white" }}>
                                    <tr>
                                        <th>sr.</th>
                                        <th>Account Title</th>
                                        <th>Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>1000</td>

                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>2000</td>

                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry</td>
                                        <td>1000</td>

                                    </tr>
                                </tbody>
                            </table>
                              <p className="fw-bold">
                                Expenses
                            </p>
                            <table className="table table-striped table-bordered table-hover">
                                <thead style={{ backgroundColor: "#c5c7caff", color: "white" }}>
                                    <tr>
                                        <th>sr.</th>
                                        <th>Account Title</th>
                                        <th>Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>1000</td>

                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>2000</td>

                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry</td>
                                        <td>1000</td>

                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Larry</td>
                                        <td>1000</td>

                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Larry</td>
                                        <td>1000</td>

                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Larry</td>
                                        <td>1000</td>

                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Larry</td>
                                        <td>1000</td>

                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>Larry</td>
                                        <td>1000</td>

                                    </tr>
                                </tbody>
                            </table>
                            <p className="fw-bold">
                                Profit
                            </p>
                            <table className="table table-striped table-bordered table-hover">
                                <thead style={{ backgroundColor: "#c5c7caff", color: "white" }}>
                                    <tr>
                                        <th>sr.</th>
                                        <th>Account Title</th>
                                        <th>Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>1000</td>

                                    </tr>
                                 
                                </tbody>
                            </table>


                            <button className="btn btn-sm btn-success">
                                Print
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
