import { useState } from "react";

export default function CPVCashSUM() {
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
                    <h5 className="mb-1 text-white">CPV Cash SUM</h5>
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

                    <div>
                        <p>SUM CASH CPV=</p>
                        <p>SUM CASH ALL=</p>
                        <p>SUM CASH NET=</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
