import { useState } from "react";
import PatientEntryModal from "../Patients/patient-entry/PatientEntryModal";
export default function PatientList() {
    const [search, setSearch] = useState("2025-GL-");
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div
                className="card shadow-lg border-0 rounded-3"
                style={{ width: "100%" }}
            >
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">Patient List</h5>
                    <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                        onClick={() => setShowModal(true)}
                    >
                        Add Patient
                    </button>
                    {showModal && (
                        <PatientEntryModal show={showModal} onClose={() => setShowModal(false)} />
                    )}
                </div>

                <div className="card-body">
                    <div className="d-flex align-items-end gap-2 mb-2">

                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            style={{ width: "200px" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />


                        <div className="dropdown mb-2">
                            <div className="dropdown">
                                <input
                                    type="text"
                                    className="form-control dropdown-toggle"
                                    placeholder="Select Lab"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                />
                                <ul className="dropdown-menu w-100">
                                    <li><a className="dropdown-item" href="#">Microbiology</a></li>
                                    <li><a className="dropdown-item" href="#">Hematology</a></li>
                                    <li><a className="dropdown-item" href="#">Serology</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <hr />
                    <div className="d-flex align-items-center gap-3 mb-2">

                        {/* Lab Name */}
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="lab" className="form-label mb-0">Lab:</label>
                            <div className="dropdown">
                                <input
                                    type="text"
                                    id="lab"
                                    className="form-control dropdown-toggle"
                                    placeholder="Select Lab"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ width: "180px" }}
                                />
                                <ul className="dropdown-menu w-100">
                                    <li><a className="dropdown-item" href="#">Microbiology</a></li>
                                    <li><a className="dropdown-item" href="#">Hematology</a></li>
                                    <li><a className="dropdown-item" href="#">Serology</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Receptionist */}
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="reception" className="form-label mb-0">Receptionist:</label>
                            <div className="dropdown">
                                <input
                                    type="text"
                                    id="reception"
                                    className="form-control dropdown-toggle"
                                    placeholder="Select Receptionist"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ width: "180px" }}
                                />
                                <ul className="dropdown-menu w-100">
                                    <li><a className="dropdown-item" href="#">Ali</a></li>
                                    <li><a className="dropdown-item" href="#">Sara</a></li>
                                    <li><a className="dropdown-item" href="#">Ahmed</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* From Date */}
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="fromDate" className="form-label mb-0">From:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fromDate"
                                name="fromDate"
                                style={{ width: "160px" }}
                            />
                        </div>

                        {/* To Date */}
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="toDate" className="form-label mb-0">To:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="toDate"
                                name="toDate"
                                style={{ width: "160px" }}
                            />
                        </div>

                        {/* Buttons */}
                        <button type="button" className="btn btn-success btn-sm">Show </button>
                        <button type="button" className="btn btn-primary">Show Reception</button>
                    </div>



                    <form
                        className="d-flex align-items-center w-100 mb-4"
                        role="search" >
                        <div className="mb-2 mt-2">
                            <button type="button" className="btn btn-success btn-sm me-1">
                                Excel
                            </button>
                            <button type="button" className="btn btn-danger btn-sm me-1">
                                PDF
                            </button>
                            <button type="button" className="btn btn-primary btn-sm">
                                Print
                            </button>
                        </div>

                        <div className="d-flex ms-auto mt-2">
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
                                        *
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Date
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
                                        Recp
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        fees
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
