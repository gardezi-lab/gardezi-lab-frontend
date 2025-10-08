import { useEffect, useState } from "react";
import feather from "feather-icons";
import Modal from 'react-bootstrap/Modal';
import TestProfilesModal from "./TestProfilesModal";
// import Button from 'react-bootstrap/Button';
import TestProfileTable from "./TestProfileTable";
import httpClient from "../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";

export default function TestProfile() {

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
            const url = `/test_profile?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

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
        setSelectedTestProfile(TestProfile);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };


    useEffect(() => {
        feather.replace();
        getTestProfileData();
    }, [page, search]);

    const renderPaginationItems = () => {
        let items = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            items.push(
                <Pagination.Item key={1} active={page === 1} onClick={() => setPage(1)}>
                    1
                </Pagination.Item>
            );

            if (page > 3) items.push(<Pagination.Ellipsis key="start-ellipsis" />);

            if (page > 2 && page < totalPages - 1) {
                items.push(
                    <Pagination.Item key={page} active onClick={() => setPage(page)}>
                        {page}
                    </Pagination.Item>
                );
            }

            if (page < totalPages - 2) items.push(<Pagination.Ellipsis key="end-ellipsis" />);

            items.push(
                <Pagination.Item
                    key={totalPages}
                    active={page === totalPages}
                    onClick={() => setPage(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }
        return items;
    };

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
                <Pagination>
                    <Pagination.Prev
                        onClick={() => page > 1 && setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Pagination.Prev>
                    {renderPaginationItems()}
                    <Pagination.Next

                        onClick={() => page < totalPages && setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </Pagination.Next>
                </Pagination>
            </div>

            <Modal show={showTestProfilesModal} onHide={handleClose}
                backdrop="static" keyboard={false} className="modal-md">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit Department" : "Test & Profile"}
                    </Modal.Title>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={handleClose} // ✅ sirf is button pe close hoga
                        aria-label="Close"
                    ></button>
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
