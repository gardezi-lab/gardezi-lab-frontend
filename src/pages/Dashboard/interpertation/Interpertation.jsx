import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import httpClient from "../../../services/httpClient";
import InterpertationTable from "./InterpertationTable";
import InterpertationModal from "./InterpertationModal";
import Pagination from "react-bootstrap/Pagination";


export default function Interpertation() {
    const [showInterpertationModal, setShowgetInterpertationDataModal] = useState(false);
    const [interpertationList, setInterpertationList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedInterpertation, setSelectedInterpertation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;
    const [search, setSearch] = useState("");

    const handleClose = () => {
        setShowgetInterpertationDataModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedInterpertation(null);
    };
    const handleShow = () => setShowgetInterpertationDataModal(true);

    const getInterpertationData = async () => {
        setLoading(true);
        try {
            const url = `/interpretations?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;


            const response = await httpClient.get(url);
            console.log(response);
            if (response) {
                setInterpertationList(response.data || []);
                setTotalPages(response.totalPages || 1);
            }
            console.log("Consultant Data:", data);
            console.log("Consultant list:", setInterpertationList);
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
        <>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
                <h5 className="fw-bold page-header">Add Interpertation For Tests</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Interpertation
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>

            <InterpertationTable
                interpertationList={interpertationList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading} />

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary primary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </button>

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


            <Modal show={showFilterModal} >
                <Modal.Header >
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Search by Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search name"
                            value={search}
                            onChange={(e) => {
                                setPage(1);
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowFilterModal(false)}>
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowFilterModal(false)}
                    >
                        Apply
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showInterpertationModal} className="modal-md">
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
