import feather from "feather-icons";
import Modal from "../../components/modal/Modal";
import { useEffect } from "react";

export default function ProfilesScreen() {
    useEffect(() => {
        feather.replace();
    }, []);

    return (
        <div>
            {/* Header Row */}
            <h5 className="fw-bold text-primary" >Profiles Management</h5>

            <div className="d-flex justify-content-end align-items-center mb-4">
                {/* Left side title */}

                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search profiles..."
                        style={{ width: "220px" }}
                    />

                    <select className="form-select" style={{ width: "180px" }}>
                        <option value="">Filter by...</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                    <button
                        className="btn btn-success"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addDealModal"
                    >
                        <i className="fas fa-plus me-2"></i> Add Profile
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Footer below table */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Left side export */}
                <button className="btn btn-secondary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </button>

                {/* Right side pagination */}
                <nav>
                    <ul className="pagination mb-0">
                        <li className="page-item disabled">
                            <button className="page-link">Previous</button>
                        </li>
                        <li className="page-item active">
                            <button className="page-link">1</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">2</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">3</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>

            <Modal />
        </div>
    );
}
