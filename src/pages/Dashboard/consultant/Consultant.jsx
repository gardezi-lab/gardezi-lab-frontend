import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import httpClient from "../../../services/httpClient";
import TestConsultantTable from "./TestConsultantTable";
import TestConsultantModal from "./TestConsultantModal";

export default function Consultant() {
    const [showConsultantModal, setShowConsultantModal] = useState(false);
    const [consultantList, setConsultantList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [loading, setLoading] = useState(false); // ✅ new state for loader

    const handleClose = () => {
        setShowConsultantModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedConsultant(null);
    };
    const handleShow = () => setShowConsultantModal(true);

    const getConsultantData = async () => {
        setLoading(true); // ✅ start loader
        try {
            const data = await httpClient.get("/users/");
            if (data) {
                setConsultantList(data);
            }
            console.log("Consultant Data:", data);
        } catch (err) {
            console.error("Fetch Consultant Error:", err);
        } finally {
            setLoading(false); // ✅ stop loader
        }
    };

    const handleSave = async (formData) => {
        setLoading(true);
        try {
            const obj = {
                name: formData.consultantName,
                user_name: formData.consultantUserName,
                contact_no: formData.consultantContact,
                role: formData.role,
                age: Number(formData.consultantAge),
            };

            if (isCurrentEditModalOpen && selectedConsultant) {
                await httpClient.put(
                    `/users/${selectedConsultant.id}`,
                    obj
                );
            } else {
                await httpClient.post("/users/", obj);
            }

            getConsultantData();
        } catch (err) {
            console.error("Save Consultant Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/users/${id}`);
            getConsultantData();
        } catch (err) {
            console.error("Delete Consultant Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dep) => {
        setSelectedConsultant(dep);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    useEffect(() => {
        getConsultantData();
    }, []);

    return (
        <>
            <h5 className="fw-bold page-header">Users</h5>
            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
                {/* Left side title */}

                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search profiles..."
                        style={{ width: "220px" }}
                    />

                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Consultant
                    </button>
                </div>
            </div>

            <TestConsultantTable
                consultantList={consultantList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading} />

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

            <Modal show={showConsultantModal} onHide={handleClose} className="modal sm">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit Consultant" : "Add Consultant"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TestConsultantModal
                        onSave={handleSave}
                        consultant={selectedConsultant}
                        onCancel={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    )
}
