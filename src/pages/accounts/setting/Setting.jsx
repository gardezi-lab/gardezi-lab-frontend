import { useState } from "react";

export default function Setting() {
    const accounts = [
        "Cash Account",
        "Commission Account",
        "Bank Account",
        "Salary Account",
        "Income Account",
        "Employee Account",
        "Discount Account",
        "Receivable Account",
        "Exp Account",
        "Loan Head",
        "Advances Head",
        "Main Stock Head"
    ];

    const [form, setForm] = useState({});
    const [updated, setUpdated] = useState(null);
    const [search, setSearch] = useState({}); // ✅ har dropdown ke liye search filter

    const handleSelect = (field, value) => {
        setForm({ ...form, [field]: value });
        setSearch({ ...search, [field]: "" }); // reset search
    };

    const handleSearch = (field, value) => {
        setSearch({ ...search, [field]: value });
    };

    // const handleUpdate = (field) => {
    //     if (form[field]) {
    //         setUpdated(`${field} → ${form[field]}`);
    //     } else {
    //         setUpdated(`${field} not selected`);
    //     }
    // };

    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div className="card shadow-lg border-0 rounded-3 w-100">
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">DEFAULT ACCOUNT SETTING</h5>
                </div>

                <div className="card-body">
                    <div className="row">
                        {accounts.map((acc, index) => {
                            const field = `account${index}`;
                            const filterText = search[field] || "";
                            const filteredAccounts = accounts.filter((opt) =>
                                opt.toLowerCase().includes(filterText.toLowerCase())
                            );

                            return (
                                <div key={index} className="col-md-6 mb-3">
                                    <div className="d-flex gap-2">
                                        {/* Dropdown with search */}
                                        <div className="dropdown flex-grow-1">
                                            <button
                                                className="btn dropdown-toggle w-100 text-start border border-dark"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {form[field] || `Select ${acc}`}
                                            </button>

                                            <ul className="dropdown-menu w-100 p-2">
                                                {/* 🔍 Search box inside dropdown */}
                                                <li className="mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search..."
                                                        value={filterText}
                                                        onChange={(e) =>
                                                            handleSearch(field, e.target.value)
                                                        }
                                                        autoFocus
                                                    />
                                                </li>

                                                {/* Filtered options */}
                                                {filteredAccounts.length > 0 ? (
                                                    filteredAccounts.map((opt, i) => (
                                                        <li key={i}>
                                                            <button
                                                                className="dropdown-item"
                                                                type="button"
                                                                onClick={() =>
                                                                    handleSelect(field, opt)
                                                                }
                                                            >
                                                                {opt}
                                                            </button>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-muted px-2">No results</li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* ✅ Update Button */}
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => handleUpdate(field)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* {updated && (
                        <div className="alert alert-info mt-3">
                            Last Updated: <strong>{updated}</strong>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
