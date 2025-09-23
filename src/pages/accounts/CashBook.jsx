import { useState } from "react";

export default function Cashbook() {
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
        setShowTable(true); // ✅ Always show table on button click
    };

    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div className="card shadow-lg border-0 rounded-3 w-100">
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">LEDGRES</h5>
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
                                    VIEW
                                </button>
                            </div>
                        </div>
                    </form>

                    <hr />

                    {/* ✅ Always show after button click */}
                    {showTable && (
                        <div className="mt-4">
                            <p className="fw-bold"> 
                                GENERAL LEDGER : CASH
                            </p>
                            <table className="table table-striped table-bordered">
                                <thead style={{ backgroundColor: "#dadee2ff", color: "white" }}>
                                    <tr>
                                        <th scope="col">sr.</th>
                                        <th scope="col">V.No</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Dr</th>
                                        <th scope="col">Cr</th>
                                        <th scope="col">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>Otto</td>
                                        <td>Otto</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Jacob</td>
                                        <td>Jacob</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>the Bird</td>
                                        <td>the Bird</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
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
