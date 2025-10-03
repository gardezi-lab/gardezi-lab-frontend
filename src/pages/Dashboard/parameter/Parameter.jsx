import { useEffect, useState } from "react";
import feather from "feather-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ParameterTable from "./ParameterTable";
import ParameterModal from "./ParameterModal";
import httpClient from "../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";


export default function Parameter() {
    const [showParameterModal, setShowParameterModal] = useState(false);
    const [parameterList, setParameterList] = useState([])
    const [selectedParameter, setselectedParameter] = useState([null])
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // ✅ new state for loader


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;

    const [search, setSearch] = useState("");

    useEffect(() => {
        feather.replace();
    }, []);

    const getParameterData = async () => {
        setLoading(true);
        try {
            const url = `/parameter?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

            const response = await httpClient.get(url);
            if (response) {
                setParameterList(response.data || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error("Fetch Parameter Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowParameterModal(false);
        setIsCurrentEditModalOpen(false);
        setselectedParameter(null);
    };
    const handleShow = () => setShowParameterModal(true);

    const handleSave = async (formData) => {
        console.log("handleSave  aaya ", formData);
        setLoading(true);
        try {
            const obj = {
                parameter_name: formData.parameter_name,
                sub_heading: formData.sub_heading,
                input_type: formData.input_type,
                unit: formData.unit,
                normalvalue: formData.normalvalue,
                default_value: formData.default_value,
            };

            if (isCurrentEditModalOpen && selectedParameter) {
                console.log("handleput  aaya ", formData);
                await httpClient.put(
                    `/parameter/${selectedParameter.id}`,
                    obj
                );
            } else {
                await httpClient.post("/parameter", obj);
            }

            getParameterData();
        } catch (err) {
            console.error("Save Parameter Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/parameter/${id}`);
            getParameterData();
        } catch (err) {
            console.error("Delete Parameters Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dep) => {
        setselectedParameter(dep);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    useEffect(() => {
        getParameterData();
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
            <h5 className="fw-bold page-header">Parameters</h5>

            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
                {/* Left side title */}

                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search parameter"
                        style={{ width: "220px" }}
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={() => {
                            setIsCurrentEditModalOpen(false);
                            handleShow();
                        }}
                    >
                        <i className="fas fa-plus me-2"></i> Add Parameter
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <ParameterTable
                onDelete={handleDelete}
                parameterList={parameterList}
                loading={loading}
                onEdit={handleEdit}

            />

            {/* Footer below table */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Left side export */}
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

            <Modal show={showParameterModal} onHide={handleClose} className="modal">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit Parameter" : "Add Parameter"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ParameterModal
                        onSave={handleSave}
                        Parameter={selectedParameter}
                        onCancel={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}
