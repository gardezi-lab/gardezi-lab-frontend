import { useEffect, useState } from "react";
import feather from "feather-icons";
import Modal from 'react-bootstrap/Modal';
// import TestProfilesModal from "../../others/modal/test-profile/TestProfilesModal";
import TestProfilesModal from "../../others/modal/company-panel/TestPanelModal";
// import Button from 'react-bootstrap/Button';
import TestProfileTable from "../../others/table/test-profile/TestProfileTable"
import httpClient from "../../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";

export default function TestProfile() {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
    const [showTestProfilesModal, setShowTestProfilesModal] = useState(false);
    const [selectedTestProfile, setSelectedTestProfile] = useState(null)
    const [loading, setLoading] = useState(false);
    const [testProfileList, setTestProfileList] = useState([])
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;

    const [search, setSearch] = useState("");

    const handleClose = () => {
        setShowTestProfilesModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedTestProfile(null);
    };
    const handleShow = () => setShowTestProfilesModal(true);

    const getTestProfileData = async () => {
        setLoading(true);
        try {
            const url = `/test_profile`;

            const response = await httpClient.get(url);
            if (response) {
                setTestProfileList(response.data || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error("Fetch testprofile Error:", err);
        } finally {
            setLoading(false);
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
                department_id: formData.department_id,
                delivery_time: formData.delivery_time,
                serology_elisa: formData.serology_elisa,
                interpretation: formData.interpretation,
                unit_ref_range: formData.unit_ref_range || true,
                test_formate: formData.test_formate || true,
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
        console.log("TestProfile", TestProfile)
        setSelectedTestProfile(TestProfile);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };


    useEffect(() => {
        feather.replace();
        getTestProfileData();
    }, [page, search]);



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
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />

                    <select className="form-select" style={{ width: "180px" }}>
                        <option value="">Filter by...</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                    {permissions["Test & Profile Delete"] === 1 &&
                        <button
                            className="btn btn-success primary"
                            type="button"
                            onClick={() => {
                                setIsCurrentEditModalOpen(false);
                                handleShow();
                            }}
                        >
                            <i className="fas fa-plus me-2"></i> Add Profile
                        </button>
                    }
                </div>
            </div>

            {/* Table Section */}
            <TestProfileTable
                TestProfileList={testProfileList}
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

            </div>

            <Modal show={showTestProfilesModal} onHide={handleClose}
                backdrop="static" keyboard={false} className="modal-md">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit Department" : "Test & Profile"}
                    </Modal.Title>
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
