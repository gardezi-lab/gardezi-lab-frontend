import { useState } from "react";


export default function LabReport() {
    const [search, setSearch] = useState("2025-GL-");
    const [lab, setLab] = useState("");
    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div
                className="card shadow-lg border-0 rounded-3"
                style={{ width: "100%" }}
            >
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }} >
                    <h5 className="mb-1 text-white">Daily Performance Reports </h5>
                    <hr />
                </div>


                <div className="card-body">
                    <div className="dropdown w-100">
                        <label htmlFor="fromDate" className="form-label">
                            Lab
                        </label>

                        {/* Dropdown Button (input style) */}
                        <button
                            className="form-control text-start dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {lab || "Select Lab"}
                        </button>

                        {/* Dropdown Menu */}
                        <ul className="dropdown-menu w-100">
                            {["Microbiology", "Hematology", "Serology"].map((opt, i) => (
                                <li key={i}>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => setLab(opt)} // ✅ value set on click
                                    >
                                        {opt}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-2">
                        <label for="fromDate" class="form-label">From</label>
                        <input type="date" className="form-control" id="fromDate" name="fromDate" />
                    </div>
                    <div className="col-md-2">
                        <label for="toDate" class="form-label">To</label>
                        <input type="date" className="form-control" id="toDate" name="toDate" />
                    </div>
                    <button type="button" className="btn btn-success me-1 mt-2">
                        show
                    </button>

                    <form
                        className="d-flex align-items-center w-100 mb-4 mt-2"
                        role="search" >

                        <div className="d-flex ms-auto">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        SR.
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Name
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        MR#
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Fees
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Status
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Ref Consultant
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Stock
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Test
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>


                                </tr>
                                <tr>
                                    <td className="py-1">Routine</td>
                                    <td className="py-1">Routine</td>
                                    <td className="py-1">Routine</td>
                                    <td className="py-1">Routine</td>
                                    <td className="py-1">Routine</td>
                                    <td className="py-1">Routine</td>
                                    <td className="py-1">Routine</td>


                                </tr>
                                <tr>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>


                                </tr>
                                <tr>
                                    <td className="py-1">Serology</td>
                                    <td className="py-1">Serology</td>
                                    <td className="py-1">Serology</td>
                                    <td className="py-1">Serology</td>
                                    <td className="py-1">Serology</td>
                                    <td className="py-1">Serology</td>
                                    <td className="py-1">Serology</td>

                                </tr>
                                <tr>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>

                                </tr>
                                <tr>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>

                                </tr>
                                <tr>
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">Hematology</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <div>Showing 1 to 7 of 7 entries</div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination mb-0">
                            <li className="page-item disabled">
                                <a className="page-link">Previous</a>
                            </li>
                            <li className="page-item active" aria-current="page">
                                <a className="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
