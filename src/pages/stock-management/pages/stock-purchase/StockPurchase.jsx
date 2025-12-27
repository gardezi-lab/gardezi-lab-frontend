import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import httpClient from "../../../../services/httpClient";
import StockPurchaseTable from "../../others/table/stack-purchase/StockPurchaseTable";
import StockPurchaseModal from "../../others/modal/stock-purchase/StockPurchaseModal";
import { Pagination } from "react-bootstrap";

export default function StockPurchase() {
  const [showModal, setShowModal] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordPerPage = 10;
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setSelectedStock(null);
  };

  const handleShow = () => setShowModal(true);

  const getStockData = async () => {
    setLoading(true);
    try {
      const url = `/stock_purchases?search=${encodeURIComponent(
        search || ""
      )}&currentpage=${page}&recordperpage=${recordPerPage}`;
      const response = await httpClient.get(url);

      setStockList(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Fetch Stock Purchase Error:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleSave = async (formData) => {
    setLoading(true);
    try {
      const obj = {
        vendor_id: formData.vendor_id,
        stock_item_id: formData.stock_item_id,
        qty: formData.qty,
        price: formData.price,
      };

      if (isEditMode && selectedStock) {
        obj["id"] = selectedStock.id;
        await httpClient.put(`/stock_purchases/${selectedStock.id}`, obj);
      } else {
        await httpClient.post("/stock_purchases", obj);
      }

      getStockData();
    } catch (err) {
      console.error("Save Stock Purchase Error:", err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await httpClient.delete(`/stock_purchases/${id}`);
      getStockData();
    } catch (err) {
      console.error("Delete Stock Purchase Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setIsEditMode(true);
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
      <div className="d-flex justify-content-between mb-2">
        <h5 className="fw-bold page-header">Stock Purchase</h5>
        <div className="d-flex flex-wrap align-items-center gap-2">

          <button
            className="btn btn-success primary"
            type="button"
            onClick={() => {
              setIsEditMode(false);
              handleShow();
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Stock
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


      <StockPurchaseTable
        stockList={stockList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />
      <div className="d-flex justify-content-end mt-2">

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
          <StockPurchaseModal
            onSave={handleSave}
            stock={selectedStock}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
