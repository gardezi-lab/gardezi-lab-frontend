import { useEffect, useState } from "react";
import feather from "feather-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import httpClient from "../../../services/httpClient";
import AddResultTable from "./AddResultTable"
import AddResultModal from "./AddResultModal"
import Pagination from "react-bootstrap/Pagination";

export default function AddResult() {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [selectedAddResult, setSelectedAddResult] = useState(null)
    const [loading, setLoading] = useState(false);
    const [AddResultList, setAddResultList] = useState([])
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);



    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;

    const [search, setSearch] = useState("");



    const getAddResultData = async () => {
        setLoading(true);
        try {
            const url = `/results?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

            const response = await httpClient.get(url);
            if (response.data) {
                setAddResultList(response.data || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error("Fetch Add Result Error:", err);
        } finally {
            setLoading(false); // ✅ stop loader
        }
    };

    const handleSave = async (formData) => {
        setLoading(true);

        try {
            const obj = {
                name: formData.name,
                date: formData.date,
                add_results: formData.add_results,
                mr: formData.mr,
                sample: formData.sample
            };

            if (isCurrentEditModalOpen && selectedAddResult) {
                await httpClient.put(
                    `/results/${selectedAddResult.id}`,
                    obj
                );
            } else {
                await httpClient.post("/results", obj);
            }
            console.log("formData:", obj)

            getAddResultData();
        } catch (err) {
            console.error("Save AddResult Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };


    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/results/${id}`);
            getAddResultData();
        } catch (err) {
            console.error("Delete Add Result Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (TestPackage) => {
        setSelectedAddResult(TestPackage);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    const handleClose = () => {
        setShow(false);
        setSelectedAddResult(null);
        setIsCurrentEditModalOpen(false);
    };

    useEffect(() => {
        feather.replace();
        getAddResultData();
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
            <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
                <h5 className="fw-bold page-header mb-0">Add Results</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">

                    {/* <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Result
                    </button> */}
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            <AddResultTable
                AddResultList={AddResultList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
            />
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
                <Modal.Header className="primary">
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

            <Modal show={show} className="modal sm">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">Add Resut</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddResultModal
                        onSave={handleSave}
                        AddResult={selectedAddResult}
                        onCancel={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}
