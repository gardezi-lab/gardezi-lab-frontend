import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import CPVTable from "../../others/table/CPVTable";
import CPVModal from "../../others/modal/CPVModal";
import httpClient from "../../../../services/httpClient";
import { Button } from "react-bootstrap";

export default function BPV() {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [voucherList, setVoucherList] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempSearch, setTempSearch] = useState(""); // Modal input ke liye

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordPerPage = 10;
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
      const response = await httpClient.get(`/journal_vouchers?voucher_type=CPV&search=${encodeURIComponent(
        search || ""
      )}&currentpage=${page}&recordperpage=${recordPerPage}`);

      setVoucherList(response.data);
      setTotalPages(response.totalPages);

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
        await httpClient.put(`/cash_payment_voucher/${selectedVoucher.id}`, formData);
      } else {
        await httpClient.post("/cash_payment_voucher", formData);
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
        <h5 className="fw-bold page-header">CASH PAYMENT VOUCHER</h5>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <Button
          size="sm"
            className="btn btn-success primary"
            type="button"
            onClick={() => {
              setIsEdit(false);
              handleShow();
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Cash Payment
          </Button>
          <Button
           variant="outline-success"
            size="sm"
            className="btn filter-btn"
            type="button"
            onClick={() => setShowFilterModal(true)}
          >
            <i className="fas fa-filter"></i>
          </Button>
        </div>
      </div>

      <CPVTable
        voucherList={voucherList}
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

      {/* Filter Modal */}
      <Modal show={showFilterModal}>
        <Modal.Header className="primary">
          <Modal.Title className="text-white">Filter</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Search by Name</label>
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
          <Button
          size="sm"
            className="btn secondary text-white"
            onClick={() => setShowFilterModal(false)}
          >
            Close
          </Button>
          <Button
          size="sm"
            className="btn btn-danger text-white"
            onClick={() => {
              setTempSearch("");
              setSearch("");
              setPage(1);
              setShowFilterModal(false);
            }}
          >
            Clear
          </Button>

          <Button
          size="sm"
            className="btn primary text-white"
            onClick={() => {
              setSearch(tempSearch);
              setPage(1);
              setShowFilterModal(false);
            }}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Voucher Modal */}
      <Modal show={showVoucherModal} className="modal-md">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isEdit ? "Edit Voucher" : "Add Cash Voucher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CPVModal
            onSave={handleSave}
            voucher={selectedVoucher}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
