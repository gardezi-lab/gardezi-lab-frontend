import { useState } from "react";

export default function PatientEntry() {
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

    const [filters, setFilters] = useState({
        company: "",
        referredBy: "",
        gender: "",
        sample: "",
        packages: "",
        priority: "",
        test: "",
    });

    const handleSelect = (field, value) => {
        setForm({ ...form, [field]: value });
        setFilters({ ...filters, [field]: "" }); // reset filter
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
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

    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div className="card shadow-lg border-0 rounded-3" style={{ width: "100%" }}>
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">New Patient</h5>
                </div>

                <div className="card-body">
                    <div className="row g-3">
                        {/* First Row - 4 Inputs */}
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

                        {/* Second Row - 4 Inputs */}
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

                        {/* Dropdowns (4 per row) */}
                        {dropdowns.map((drop, i) => (
                            <div className="col-md-3" key={i}>
                                <label className="form-label">{drop.label}</label>
                                <div className="dropdown w-100">
                                    <button
                                        className="form-control text-start dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {form[drop.field] || `Select ${drop.label}`}
                                    </button>
                                    <ul className="dropdown-menu w-100 p-2">
                                        {/* Search inside dropdown */}
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder={`Search ${drop.label}`}
                                            value={filters[drop.field]}
                                            onChange={(e) => handleFilterChange(drop.field, e.target.value)}
                                        />
                                        {drop.options
                                            .filter((opt) =>
                                                opt.toLowerCase().includes(filters[drop.field].toLowerCase())
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
                                </div>
                            </div>
                        ))}

                        {/* Last Row - 2 Inputs */}
                        <div className="col-md-6">
                            <label className="form-label">Remarks</label>
                            <input
                                name="remarks"
                                className="form-control"
                                
                                value={form.remarks}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Test</label>
                            <div className="dropdown w-100">
                                <button
                                    className="form-control text-start dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {form.test || "Select Test"}
                                </button>
                                <ul className="dropdown-menu w-100 p-2">
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Search Test"
                                        value={filters.test}
                                        onChange={(e) => handleFilterChange("test", e.target.value)}
                                    />
                                    {dropdowns
                                        .find((d) => d.field === "test")
                                        .options.filter((opt) =>
                                            opt.toLowerCase().includes(filters.test.toLowerCase())
                                        )
                                        .map((opt, j) => (
                                            <li key={j}>
                                                <button
                                                    className="dropdown-item"
                                                    type="button"
                                                    onClick={() => handleSelect("test", opt)}
                                                >
                                                    {opt}
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
