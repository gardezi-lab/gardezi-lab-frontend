import { useState } from "react";
export default function REjectedDiscount() {
    const [search, setSearch] = useState("2025-GL-");
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
                    <h5 className="mb-1 text-white">Rejected Discount</h5>
                    {/* <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                    >
                        Add Header
                    </button> */}
                </div>

                <div className="card-body">

                    <form
                        className="d-flex align-items-center w-100 mb-4"
                        role="search"
                    >
                        <button type="button" className="btn btn-secondary me-1 ">
                            Excel
                        </button>
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
                                        MR
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Consultant
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Cell#
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
                                        Reception
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Total
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        Discount
                                    </th>
                                    <th
                                        className="bg-black text-white"
                                        scope="col"
                                    >
                                        ✅ 
                                    </th>
                                    <th
                                        className="bg-black text-nowrap text-white"
                                        scope="col"
                                    >
                                        Permanent Remove
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
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">Microbiology</td>
                                    <td className="py-1">
                                        Routine
                                    </td>
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
                                    <td className="py-1">Routine</td>
                                    <td className="py-1">Routine</td>
                                    <td className="py-1">
                                        Routine
                                    </td>
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
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">Special Chemistry</td>
                                    <td className="py-1">
                                        Routine
                                    </td>
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
                                    <td className="py-1">Serology</td>
                                    <td className="py-1">Serology</td>
                                    <td className="py-1">
                                        Routine
                                    </td>
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
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">Molecular</td>
                                    <td className="py-1">
                                        Routine
                                    </td>
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
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">Serology Elisa</td>
                                    <td className="py-1">
                                        Routine
                                    </td>
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
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">Hematology</td>
                                    <td className="py-1">
                                        Routine
                                    </td>
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
