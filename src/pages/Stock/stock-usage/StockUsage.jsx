import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import StockUsageTable from "./StockUsageTable";
import StockUsageModal from "./StockUsageModal";
import httpClient from "../../../services/httpClient";

export default function StockPurchase() {
  const [showModal, setShowModal] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Modal open/close handlers
  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setSelectedStock(null);
  };

  const handleShow = () => setShowModal(true);

  // Fetch Stock Purchase Data
  const getStockData = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get("/stock_usage");
      console.log("Fetch Stock Purchase Full Response:", response);
      setStockList(response); // response itself is your data array

    } catch (err) {
      console.error("Fetch Stock Purchase Error:", err);
    } finally {
      setLoading(false);
    }
  };


  // Save or Update Stock Purchase
  const handleSave = async (formData) => {
    setLoading(true);
    try {
      const obj = {
        stock_item_id: formData.stock_item_id,
        qty: formData.qty,
      };

      if (isEditMode && selectedStock) {
        obj["id"] = selectedStock.id;
        await httpClient.put(`/stock_usage/${selectedStock.id}`, obj);
      } else {
        await httpClient.post("/stock_usage", obj);
      }

      getStockData();
    } catch (err) {
      console.error("Save Stock Purchase Error:", err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  // Delete Stock Purchase Record
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await httpClient.delete(`/stock_usage/${id}`);
      getStockData();
    } catch (err) {
      console.error("Delete Stock Purchase Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit Stock Purchase Record
  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setIsEditMode(true);
    handleShow();
  };

  useEffect(() => {
    getStockData();
  }, [search]);

  return (
    <div>
      {/* Header + Search + Add Button */}
      <div className="d-flex justify-content-between mb-2">
        <h5 className="fw-bold page-header">Stock Usage</h5>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search stock"
            style={{ width: "220px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-success primary"
            type="button"
            onClick={() => {
              setIsEditMode(false);
              handleShow();
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Stock Usage
          </button>
        </div>
      </div>

      {/* Table Component */}
      <StockUsageTable
        stockList={stockList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />

      {/* Footer Buttons */}
      <div className="d-flex justify-content-end align-items-center mt-3">
        <button className="btn btn-secondary primary">
          <i className="fas fa-file-excel me-2"></i> Export to Excel
        </button>
      </div>

      {/* Modal Component */}
      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        className="modal-lg"
      >
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isEditMode ? "Edit Stock Purchase" : "Add Stock Purchase"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StockUsageModal
            onSave={handleSave}
            stock={selectedStock}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
