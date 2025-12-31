import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import httpClient from "../../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";
import AddVendorModal from "../../others/modal/add-vendor/AddVendorModal";
import AddVendorTable from "../../others/table/add-vendor/AddVendorTable";

export default function AddVendor() {
    const [showVenderModal, setShowVenderModal] = useState(false);
    const [venderList, setVenderList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedVender, setSelectedVender] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;
    const [search, setSearch] = useState("");
    const [tempSearch, setTempSearch] = useState("");


    const handleClose = () => {
        setShowVenderModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedVender(null);
    };
    const handleShow = () => setShowVenderModal(true);

    const getVendorData = async () => {
        setLoading(true);
        try {
            const url = `/vendors?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

            const response = await httpClient.get(url);
            if (response) {
                setVenderList(response.data);
                setTotalPages(response.totalPages );
            }
        } catch (err) {
            console.error("Fetch vendors Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        setLoading(true);
        try {
            const obj = {
                name: formData.name,
                phone: formData.phone,
                address: formData.address
            };

            if (isCurrentEditModalOpen && selectedVender) {
                await httpClient.put(`/vendors/${selectedVender.id}`, obj);
            } else {
                await httpClient.post("/vendors", obj);
            }
            getVendorData();
        } catch (err) {
            console.error("Save vendors Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        console.log("id", id);
        setLoading(true);
        try {
            await httpClient.delete(`/vendors/${id}`);
            getVendorData();
        } catch (err) {
            console.error("Delete vendors Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (vend) => {
        setSelectedVender(vend);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    useEffect(() => {
        getVendorData();
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
                <h5 className="fw-bold page-header">Vendor</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={() => {
                            setIsCurrentEditModalOpen(false);
                            handleShow();
                        }}
                    >
                        <i className="fas fa-plus me-2"></i> Add Vendors
                    </button>

                    <button
                        className="btn filter-btn"
                        type="button"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>

            </div>
            <AddVendorTable
                venderList={venderList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
            />



            <div className="d-flex justify-content-between mt-2">
                <div>
                    {/* <button className="btn btn-sm btn-secondary primary">
                        <i className="fas fa-file-excel me-2"></i> Export to Excel
                    </button> */}
                </div>
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

            <Modal show={showFilterModal}>
                <Modal.Header className="primary">
                    <Modal.Title className="text-white">Filter</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Search by Narration</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={tempSearch}
                            onChange={(e) => setTempSearch(e.target.value)}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className="btn secondary text-white"
                        onClick={() => setShowFilterModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-danger text-white"
                        onClick={() => {
                            setTempSearch("");
                            setSearch("");
                            setPage(1);
                            setShowFilterModal(false);
                        }}
                    >
                        Clear
                    </button>

                    <button
                        className="btn primary text-white"
                        onClick={() => {
                            setSearch(tempSearch);
                            setPage(1);
                            setShowFilterModal(false);
                        }}
                    >
                        Apply
                    </button>
                </Modal.Footer>
            </Modal>


            <Modal show={showVenderModal} className="modal sm">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit Vender" : "Add Vender"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddVendorModal
                        onSave={handleSave}
                        vender={selectedVender}
                        onCancel={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}
