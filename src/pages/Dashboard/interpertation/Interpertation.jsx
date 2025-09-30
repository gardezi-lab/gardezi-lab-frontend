import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import httpClient from "../../../services/httpClient";
import InterpertationTable from "./InterpertationTable";
import InterpertationModal from "./InterpertationModal";

export default function Interpertation() {
    const [showInterpertationModal, setShowgetInterpertationDataModal] = useState(false);
    const [interpertationList, setInterpertationList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedInterpertation, setSelectedInterpertation] = useState(null);
    const [loading, setLoading] = useState(false); // ✅ new state for loader

    const handleClose = () => {
        setShowgetInterpertationDataModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedInterpertation(null);
    };
    const handleShow = () => setShowgetInterpertationDataModal(true);

    const getInterpertationData = async () => {
        setLoading(true); // ✅ start loader
        try {
            const data = await httpClient.get("/interpretations");
            console.log(data);
            if (data) {

                setInterpertationList(data);
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
                type: formData.interpertationType,
                code: formData.interpertationCode,
                heading: formData.interpertationHeading,
                detail: formData.interpertationDetail,
            };

            if (isCurrentEditModalOpen && selectedInterpertation) {
                await httpClient.put(
                    `/interpretations/${selectedInterpertation.id}`,
                    obj
                );
            } else {
                await httpClient.post("/interpretations/", obj);
            }

            getInterpertationData();
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
            await httpClient.delete(`/interpretations/${id}`);
            getInterpertationData();
        } catch (err) {
            console.error("Delete Consultant Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dep) => {
        setSelectedInterpertation(dep);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    useEffect(() => {
        getInterpertationData();
    }, []);

    return (
        <>
            <h5 className="fw-bold page-header">Add Interpertation For Tests</h5>
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
                        <i className="fas fa-plus me-2"></i> Add Interpertation
                    </button>
                </div>
            </div>

            <InterpertationTable
                interpertationList={interpertationList}
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

            <Modal show={showInterpertationModal} onHide={handleClose} className="modal-md">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit Interpertation" : "Add Interpertation"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InterpertationModal
                        onSave={handleSave}
                        interpertation={selectedInterpertation}
                        onCancel={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    )
}
