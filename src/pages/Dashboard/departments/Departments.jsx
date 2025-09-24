import { useEffect, useState } from "react";
import feather from "feather-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DepartmentTable from "./DepartmentTable";
import DepartmentModal from "./DepartmentModal";

export default function Departments() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        feather.replace();
    }, []);

    return (
        <div>
            <h5 className="fw-bold page-header">Department</h5>

            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
                {/* Left side title */}

                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search name"
                        style={{ width: "220px" }}
                    />
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Department
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <DepartmentTable />
            {/* Footer below table */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Left side export */}
                <button className="btn btn-secondary primary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </button>

                {/* Right side pagination */}
                <nav>
                    <ul className="pagination mb-0 ">
                        <li className="page-item disabled">
                            <button className="page-link ">Previous</button>
                        </li>
                        <li className="page-item active ">
                            <button className="page-link primary">1</button>
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

            <Modal show={show} onHide={handleClose} className="modal sm">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DepartmentModal />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
