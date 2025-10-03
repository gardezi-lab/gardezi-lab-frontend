import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import httpClient from "../../../services/httpClient";
import TestConsultantTable from "./TestConsultantTable";
import TestConsultantModal from "./TestConsultantModal";
import Pagination from "react-bootstrap/Pagination";

export default function Consultant() {
    const [showConsultantModal, setShowConsultantModal] = useState(false);
    const [consultantList, setConsultantList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 10;
    const [search, setSearch] = useState("");

    const handleClose = () => {
        setShowConsultantModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedConsultant(null);
    };
    const handleShow = () => setShowConsultantModal(true);

    const getConsultantData = async () => {
        setLoading(true);
        try {
            const url = `/users?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

            const response = await httpClient.get(url);
            if (response) {
                setConsultantList(response.data || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error("Fetch Consultant Error:", err);
        } finally {
            setLoading(false);
        }
    };



    const handleSave = async (formData) => {
        setLoading(true);
        try {
            const obj = {
                name: formData.consultantName,
                user_name: formData.consultantUserName,
                contact_no: formData.consultantContact,
                role: formData.consultantRole,
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
    }, [page, search]);

    const renderPaginationItems = () => {
        let items = [];
        if (totalPages <= 10) {
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
                        value={search}
                        onChange={(e) => {
                            setPage(1); // ✅ reset page on search change
                            setSearch(e.target.value);
                        }}
                    />

                    < button
                        className="btn btn-success primary"
                        type="button"
                        onClick={() => {
                            setIsCurrentEditModalOpen(false);
                            handleShow();
                        }}
                    >
                        <i className="fas fa-plus me-2"></i> Add Consultant
                    </button>
                </div>
            </div >

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
