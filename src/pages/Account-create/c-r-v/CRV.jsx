import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import CRVTable from "./CRVTable";
import CRVModal from "./CRVModal";
import httpClient from "../../../services/httpClient";

export default function CRV() {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [voucherList, setVoucherList] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordPerPage = 5;
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setShowVoucherModal(false);
    setIsEdit(false);
    setSelectedVoucher(null);
  };
  const handleShow = () => setShowVoucherModal(true);

  // Get Vouchers
  const getVoucherData = async () => {
    setLoading(true);
    try {
      const res = await httpClient.get("/journal_vouchers?voucher_type=CRV");
      // console.log("Voucher Response:", res);
      // since res is already an array
      setVoucherList(res);
    } catch (err) {
      console.error("Fetch Voucher Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Save / Update
  const handleSave = async (formData) => {
    setLoading(true);
    try {
      if (isEdit && selectedVoucher) {
        await httpClient.put(`/cash_receipt_voucher/${selectedVoucher.id}`, formData);
      } else {
        await httpClient.post("/cash_receipt_voucher", formData);
      }
      getVoucherData();
    } catch (err) {
      console.error("Save Voucher Error:", err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  // Delete Voucher
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this voucher?")) return;
    setLoading(true);
    try {
      await httpClient.delete(`/journal_vouchers/${id}`);
      getVoucherData();
    } catch (err) {
      console.error("Delete Voucher Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (voucher) => {
    setSelectedVoucher(voucher);
    setIsEdit(true);
    handleShow();
  };

  useEffect(() => {
    getVoucherData();
  }, [page, search]);

  const renderPaginationItems = () => {
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <h5 className="fw-bold page-header">CASH RECEIPT VOUCHER</h5>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button
            className="btn btn-success primary"
            type="button"
            onClick={() => {
              setIsEdit(false);
              handleShow();
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Cash Receipt
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

      <CRVTable
        voucherList={voucherList}
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

      {/* Filter Modal */}
      <Modal show={showFilterModal}>
        <Modal.Header>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Search by Narration</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
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
          <button className="btn btn-primary" onClick={() => setShowFilterModal(false)}>
            Apply
          </button>
        </Modal.Footer>
      </Modal>

      {/* Voucher Modal */}
      <Modal show={showVoucherModal} className="modal-md">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isEdit ? "Edit Voucher" : "Add Voucher"}
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <CRVModal
            onSave={handleSave}
            voucher={selectedVoucher}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
