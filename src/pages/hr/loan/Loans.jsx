import { useState } from "react";
export default function Loans() {
    const [form, setForm] = useState({
        name: "",
        fatherName: "",
        cnic: "",
        address: "",
        cell: "",
        salary: "",
        designation: "",
        cc: ""
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const [sms, setSms] = useState("");
    const [activeTable, setActiveTable] = useState(null);
    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div className="card shadow-lg border-0 rounded-3 w-100">
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">Add Loans </h5>
                </div>

                <div className="card-body">
                    <form>
                        {/* Row 1 */}
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label className="form-label">Employee Name</label>
                                <div className="dropdown w-100">
                                    <button
                                        className="form-control text-start dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {form.cc || "Select employee name"}
                                    </button>

                                    <ul className="dropdown-menu w-100 p-2">
                                        {/* 🔍 Search box */}
                                        <li className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search..."
                                                value={form.cc || ""}
                                                onChange={(e) => setForm({ ...form, cc: e.target.value })}
                                            />
                                        </li>

                                        {/* Options */}
                                        {["Khizer", "Murtaza", "Ali","Qasim"].map((opt, i) => (
                                            <li key={i}>
                                                <button
                                                    className="dropdown-item"
                                                    type="button"
                                                    onClick={() => setForm({ ...form, cc: opt })}
                                                >
                                                    {opt}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Payment Method</label>
                                <div className="dropdown w-100">
                                    <button
                                        className="form-control text-start dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {form.paymentMethod || "Select payment method"}
                                    </button>

                                    <ul className="dropdown-menu w-100 p-2">
                                        {/* 🔍 Search box */}
                                        <li className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search..."
                                                value={form.paymentMethod || ""}
                                                onChange={(e) =>
                                                    setForm({ ...form, paymentMethod: e.target.value })
                                                }
                                            />
                                        </li>

                                        {/* Options */}
                                        {["Cash", "Bank Transfer", "Cheque", "Credit Card"].map((opt, i) => (
                                            <li key={i}>
                                                <button
                                                    className="dropdown-item"
                                                    type="button"
                                                    onClick={() => setForm({ ...form, paymentMethod: opt })}
                                                >
                                                    {opt}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Amount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cnic"
                                    value={form.cnic}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                />
                            </div>
                            <div className="col-md-3 mt-4">
                                <div  >
                                    <button type="submit" className="btn btn-success">
                                        Submit
                                    </button>
                                </div>
                            </div>


                        </div>

                    </form>
                    <hr />
                    {/* Table */}
                    <div className="mt-4">
                        <table className="table">
                            <thead className="bg-white text-black">
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-1">1</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">5000</td>

                                </tr>
                                <tr>
                                    <td className="py-1">2</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">7000</td>

                                </tr>
                                <tr>
                                    <td className="py-1">3</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">4500</td>

                                </tr>
                                <tr>
                                    <td className="py-1">4</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">4500</td>

                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}
