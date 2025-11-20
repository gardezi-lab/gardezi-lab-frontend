import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import httpClient from "../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";
import StockItemTable from "./stockitem-table/StockItemTable";
import StockItemModal from "./stockitem-modal/StockItemModal";

export default function AddStock() {
    const [showStockModal, setShowStockModal] = useState(false);
    const [stockList, setStockList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;

    const [search, setSearch] = useState("");

    const handleClose = () => {
        setShowStockModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedStock(null);
    };
    const handleShow = () => setShowStockModal(true);

    const getStockData = async () => {
        setLoading(true);
        try {
            const url = `/stock_items?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

            const response = await httpClient.get(url);
            if (response) {
                setStockList(response || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error("Fetch Departments Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        setLoading(true);
        try {
            const obj = { name: formData.name };

            if (isCurrentEditModalOpen && selectedStock) {
                await httpClient.put(`/stock_items/${selectedStock.id}`, obj);
            } else {
                await httpClient.post("/stock_items", obj);
            }
            getStockData();
        } catch (err) {
            console.error("Save Department Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        console.log("id", id);
        setLoading(true);
        try {
            await httpClient.delete(`/stock_items/${id}`);
            getStockData();
        } catch (err) {
            console.error("Delete Department Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dep) => {
        setSelectedStock(dep);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    useEffect(() => {
        getStockData();
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
                <h5 className="fw-bold page-header">Stock Items</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={() => {
                            setIsCurrentEditModalOpen(false);
                            handleShow();
                        }}
                    >
                        <i className="fas fa-plus me-2"></i> Add Stock
                    </button>
                    {/* Filter Button */}
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>

            </div>
            <StockItemTable
                stockList={stockList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
            />

            <div className="d-flex justify-content-between mt-2">
                <div>
                    <button className="btn btn-sm btn-secondary primary">
                        <i className="fas fa-file-excel me-2"></i> Export to Excel
                    </button>
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

            <Modal show={showFilterModal} >
                <Modal.Header >
                    {/* <Modal.Title>Filters</Modal.Title> */}
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

            <Modal show={showStockModal} className="modal sm">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit Stock" : "Add Stock"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StockItemModal
                        onSave={handleSave}
                        stock={selectedStock}
                        onCancel={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}
