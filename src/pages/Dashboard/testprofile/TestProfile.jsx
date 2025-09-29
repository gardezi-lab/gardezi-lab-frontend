import { useEffect, useState } from "react";
import feather from "feather-icons";
import Modal from 'react-bootstrap/Modal';
import TestProfilesModal from "./TestProfilesModal";
import Button from 'react-bootstrap/Button';
import TestProfileTable from "./TestProfileTable";
import httpClient from "../../../services/httpClient";

export default function ProfilesScreen() {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [selectedTestProfile, setSelectedTestProfile] = useState(null)
    const [loading, setLoading] = useState(false);
    const [TestProfileList, setTestProfileList] = useState([])
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);

    const getTestProfileData = async () => {
        console.log("testa and profile",)
        setLoading(true);
        try {
            const data = await httpClient.get("/test_profile/");
            console.log("response data:", data)
            if (data) {
                setTestProfileList(data);
            }
            console.log("TestProfile Data:", data);
        } catch (err) {
            console.error("Fetch TestProfile Error:", err);
        } finally {
            setLoading(false); // ✅ stop loader
        }
    };

    const handleSave = async (formData) => {
        setLoading(true);
        console.log("formData:", formData)
        try {
            const obj = {
                test_name: formData.test_name,
                test_code: formData.test_code,
                sample_required: formData.sample_required,
                select_header: formData.select_header,
                fee: formData.fee,
                delivery_time: formData.delivery_time,
                serology_elisa: formData.serology_elisa,
                interpretation: formData.interpretation,
            };

            if (isCurrentEditModalOpen && selectedTestProfile) {
                await httpClient.put(
                    `/test_profile/${selectedTestProfile.id}`,
                    obj
                );
            } else {
                await httpClient.post("/test_profile", obj);
            }

            getTestProfileData();
        } catch (err) {
            console.error("Save TestProfile Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/test_profile/${id}`);
            getTestProfileData();
        } catch (err) {
            console.error("Delete TestPrfile Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (TestProfile) => {
        setSelectedTestProfile(TestProfile);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    const handleClose = () => {
        setShow(false);
        setSelectedTestProfile(null);   // ✅ reset selected profile
        setIsCurrentEditModalOpen(false); // ✅ reset edit mode
    };

    useEffect(() => {
        feather.replace();
        getTestProfileData();
    }, []);

    return (
        <div>
            <h5 className="fw-bold page-header">Profiles Management</h5>

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

                    <select className="form-select" style={{ width: "180px" }}>
                        <option value="">Filter by...</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Profile
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <TestProfileTable
                TestProfileList={TestProfileList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
            />

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

            <Modal show={show} onHide={handleClose} className="modal-xl">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">Test Name or Profile Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TestProfilesModal
                        onSave={handleSave}
                        TestProfile={selectedTestProfile}
                        onCancel={handleClose}

                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}
