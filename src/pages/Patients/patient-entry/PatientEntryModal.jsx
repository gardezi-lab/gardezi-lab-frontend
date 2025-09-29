import { useState } from "react";

export default function PatientEntryModal({ show, onClose }) {
    const [form, setForm] = useState({
        cell: "",
        name: "",
        father: "",
        age: "",
        email: "",
        address: "",
        remarks: "",
        company: "",
        referredBy: "",
        gender: "",
        sample: "",
        packages: "",
        priority: "",
        test: "",
    });


    const [filters, setFilters] = useState({});
    const [selectedTests, setSelectedTests] = useState([]); // ✅ selected test list

    const handleSelect = (field, value) => {
        setForm({ ...form, [field]: value });
        setFilters({ ...filters, [field]: "" });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
    };

    // ✅ Add test in table
    const addTest = () => {
        if (form.test && !selectedTests.find((t) => t.description === form.test)) {
            setSelectedTests([
                ...selectedTests,
                {
                    sr: selectedTests.length + 1,
                    description: form.test,
                    sample: form.sample || "N/A",
                    price: 1000, // yahan API se ya manually price set karna hoga
                },
            ]);
            setForm({ ...form, test: "" }); // reset dropdown after add
        }
    };

    // ✅ Remove test
    const removeTest = (index) => {
        const updated = selectedTests.filter((_, i) => i !== index);
        setSelectedTests(updated.map((t, i) => ({ ...t, sr: i + 1 })));
    };

    const dropdowns = [
        { field: "company", label: "Company", options: ["ABC Corp", "XYZ Ltd", "Nestle", "Unilever"] },
        { field: "referredBy", label: "Referred By", options: ["Dr. Ali", "Dr. Khan", "Dr. Ayesha", "Dr. Bilal"] },
        { field: "gender", label: "Gender", options: ["Male", "Female", "Other"] },
        { field: "sample", label: "Sample", options: ["Blood", "Urine", "X-Ray", "MRI"] },
        { field: "packages", label: "Packages", options: ["Basic", "Standard", "Premium", "Corporate"] },
        { field: "priority", label: "Priority", options: ["Normal", "Urgent", "Emergency"] },
        { field: "test", label: "Test", options: ["CBC", "LFT", "X-Ray", "MRI", "CT Scan"] },
    ];

    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: "rgba(243,156,18,255)" }}>
                        <h5 className="modal-title text-white">Add Patient</h5>
                    </div>

                    <div className="modal-body">
                        <div className="row g-3">

                            {/* Basic Inputs */}
                            <div className="col-md-3">
                                <label className="form-label">Cell#</label>
                                <input
                                    type="text"
                                    name="cell"
                                    className="form-control"
                                    value={form.cell}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Father / Husband / MR#</label>
                                <input
                                    type="text"
                                    name="father"
                                    className="form-control"
                                    value={form.father}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    className="form-control"
                                    value={form.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            </div>


                            {/* Remarks */}
                            <div className="col-md-3">
                                <label className="form-label">Remarks</label>
                                <input
                                    name="remarks"
                                    className="form-control"
                                    value={form.remarks}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Dropdowns */}
                            {dropdowns.map((drop, i) => (
                                <div className="col-md-3" key={i}>
                                    <label className="form-label">{drop.label}</label>
                                    <div className="dropdown w-100 d-flex">
                                        <button
                                            className="form-control text-start dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {form[drop.field] || `Select ${drop.label}`}
                                        </button>
                                        <ul className="dropdown-menu w-100 p-2">
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                placeholder={`Search ${drop.label}`}
                                                value={filters[drop.field] || ""}
                                                onChange={(e) =>
                                                    handleFilterChange(drop.field, e.target.value)
                                                }
                                            />
                                            {drop.options
                                                .filter((opt) =>
                                                    opt.toLowerCase().includes((filters[drop.field] || "").toLowerCase())
                                                )
                                                .map((opt, j) => (
                                                    <li key={j}>
                                                        <button
                                                            className="dropdown-item"
                                                            type="button"
                                                            onClick={() => handleSelect(drop.field, opt)}
                                                        >
                                                            {opt}
                                                        </button>
                                                    </li>
                                                ))}
                                        </ul>

                                        {/* ✅ Plus button sirf Test dropdown ke liye */}
                                        {drop.field === "test" && (
                                            <button
                                                type="button"
                                                className="btn btn-success ms-2"
                                                onClick={addTest}
                                            >
                                                +
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ✅ Selected Tests Table */}
                        <div className="mt-4 table-responsive">
                            <table className="table table-bordered " style={{ color: "white" }}>
                                <thead className="" style={{ backgroundColor: "blue" }}>
                                    <tr>
                                        <th style={{ color: "white" }}>Sr.</th>
                                        {selectedTests.length === 0 ? (
                                            <>
                                                <th style={{ color: "white" }}>Description</th>
                                                <th style={{ color: "white" }}>Sample</th>
                                                <th style={{ color: "white" }}>Price</th>
                                                <th style={{ color: "white" }}>X</th>
                                            </>
                                        ) : (
                                            <>
                                                <th style={{ color: "white" }}>Test Description</th>
                                                <th style={{ color: "white" }}>Sample Required</th>
                                                <th style={{ color: "white" }}>Delivery time</th>
                                                <th style={{ color: "white" }}>Price</th>
                                                <th style={{ color: "white" }}>Del</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedTests.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">

                                            </td>
                                        </tr>
                                    ) : (
                                        selectedTests.map((test, index) => (
                                            <tr key={index}>
                                                <td>{test.sr}</td>
                                                <td>{test.description}</td>
                                                <td>{test.sample}</td>
                                                <td>{test.delivery || "2 hrs"}</td>
                                                <td>{test.price}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => removeTest(index)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    {/* ✅ Billing / Summary Section */}
                    <div className="mt-3 p-3 border rounded" style={{ backgroundColor: "#f8f9fa" }}>
                        <div className="row g-3 align-items-center">
                            <div className="col-md-2">
                                <label className="form-label">Total</label>
                                <input type="text" className="form-control" readOnly />
                            </div>
                            <div className="col-md-1">
                                <label className="form-label">DSC PKR</label>
                                <input type="number" className="form-control" />
                            </div>
                            <div className="col-md-1">
                                <label className="form-label">DSC %</label>
                                <input type="number" className="form-control" />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Net</label>
                                <input type="text" className="form-control" value="0" readOnly />
                            </div>
                            <div className="col-md-1">
                                <label className="form-label">Paid</label>
                                <input type="number" className="form-control" value="0" />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Balance</label>
                                <input type="text" className="form-control" value="0" readOnly />
                            </div>
                            <div className="col-md-3 mt-3">
                                <label className="form-label">Method</label>
                                <select className="form-select">
                                    <option>Cash</option>
                                    <option>Card</option>
                                    <option>Online</option>
                                </select>
                            </div>
                        </div>

                        {/* ✅ Buttons Row */}
                        <div className="row mt-4">
                            <div className="col text-end">
                                <button type="button" className="btn btn-warning me-2">
                                    Verify
                                </button>
                                <button type="button" className="btn btn-success">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-success">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
