import { useState } from "react";
export default function AddEmployees() {
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
                    <h5 className="mb-1 text-white">Add Employees</h5>
                </div>

                <div className="card-body">
                    <form>
                        {/* Row 1 */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Father Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fatherName"
                                    value={form.fatherName}
                                    onChange={handleChange}
                                    placeholder="Enter Father Name"
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">CNIC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cnic"
                                    value={form.cnic}
                                    onChange={handleChange}
                                    placeholder="Enter CNIC"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Enter Address"
                                />
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Cell</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cell"
                                    value={form.cell}
                                    onChange={handleChange}
                                    placeholder="Enter Cell Number"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Monthly Salary</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="salary"
                                    value={form.salary}
                                    onChange={handleChange}
                                    placeholder="Enter Monthly Salary"
                                />
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Designation</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="designation"
                                    value={form.designation}
                                    onChange={handleChange}
                                    placeholder="Enter Designation"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Select CC</label>
                                <div className="dropdown w-100">
                                    <button
                                        className="btn btn-outline-primary dropdown-toggle w-100 text-start"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {form.cc || "Select CC"}
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

                                        {/* Options dynamically */}
                                        {["C19-UCGL", "CC18-SGL", "CC17-SADAAT GL","CC16-MIDWEST GL","CC15-MPGL","CC14-SAGL","CC04-BGL"].map((opt, i) => (
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


                        </div>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    </form>
                    {/* Table */}
                    <div className="mt-4">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th>sr.</th>
                                    <th>Name</th>
                                    <th>Father Name</th>
                                    <th>CNIC</th>
                                    <th>Address</th>
                                    <th>Cell</th>
                                    <th>Pay</th>
                                    <th>Designation</th>
                                    <th>CC</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-1">1</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                </tr>
                                <tr>
                                    <td className="py-1">2</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>


                                </tr>
                                <tr>
                                    <td className="py-1">3</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                </tr>
                                <tr>
                                    <td className="py-1">4</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>


                                </tr>
                                <tr>
                                    <td className="py-1">5</td>
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
