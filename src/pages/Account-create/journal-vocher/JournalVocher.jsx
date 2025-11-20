import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import JournalVoucherTable from "./JournalVoucherTable";
import CRVModal from "./CRVModal";
import CPVModal from "./CPVModal";
import BRVModal from "./BRVModal";
import BPVModal from "./BPVModal";
import { Button, Col, Row } from "react-bootstrap";
import JournalVoucherModal from "./JournalVoucherModal";
import httpClient from "../../../services/httpClient";

export default function JournalVoucher() {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showVoucherTypeModal, setShowVoucherTypeModal] = useState(false);
  const [voucherList, setVoucherList] = useState([]);
  const [showCPVModal, setShowCPVModal] = useState(false);
  const [showBRVModal, setShowBRVModal] = useState(false);
  const [showBPVModal, setShowBPVModal] = useState(false);
  const [showCRVModal, setShowCRVModal] = useState(false);
  const [showJVModal, setShowJVModal] = useState(false);
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
      const res = await httpClient.get("/journal_vouchers");
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
  const handleSave = async (formData, type) => {
    setLoading(true);
    try {
      let apiEndpoint;
      if (type === "CRV") apiEndpoint = "cash_receipt_voucher";
      else if (type === "JV") apiEndpoint = "journal_vouchers";
      else if (type === "CPV") apiEndpoint = "cash_payment_voucher";
      else if (type === "BRV") apiEndpoint = "bank_receipt_voucher";
      else if (type === "BPV") apiEndpoint = "bank_payment_voucher";

      if (isEdit && selectedVoucher) {
        await httpClient.put(`/${apiEndpoint}/${selectedVoucher.id}`, formData);
      } else {
        await httpClient.post(`/${apiEndpoint}`, formData);
      }
      getVoucherData();
    } catch (err) {
      console.error("Save Voucher Error:", err);
    } finally {
      setLoading(false);
      setSelectedVoucher(null);
      setIsEdit(false);
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

    const type = voucher.voucher_type;

    switch (type) {
      case "CRV":
        setShowCRVModal(true);
        break;
      case "CPV":
        setShowCPVModal(true);
        break;
      case "BRV":
        setShowBRVModal(true);
        break;
      case "BPV":
        setShowBPVModal(true);
        break;
      case "JV":
        setShowJVModal(true);
        break;
      default:
        console.warn("Unknown voucher type:", type);
    }
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
        <h5 className="fw-bold page-header">Journal Voucher</h5>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button
            className="btn btn-success primary"
            type="button"
            onClick={() => {
              setIsEdit(false);
              setShowVoucherTypeModal(true);
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Voucher
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

      <JournalVoucherTable
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


      <Modal show={showVoucherTypeModal} onHide={() => setShowVoucherTypeModal(false)}>
        <Modal.Header closeButton className="primary">
          <Modal.Title className="color-white fw-bold">Select Voucher Type</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowVoucherTypeModal(false);
                  setShowJVModal(true);
                }}
              >
                Journal Voucher
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                onClick={() => {
                  setShowVoucherTypeModal(false);
                  setShowCRVModal(true);
                }}
              >
                Cash Receipt Voucher
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="warning"
                onClick={() => {
                  setShowVoucherTypeModal(false);
                  setShowCPVModal(true);
                }}
              >
                Cash Payment Voucher
              </Button>
            </Col>
            <Col>
              <Button
                variant="info"
                onClick={() => {
                  setShowVoucherTypeModal(false);
                  setShowBRVModal(true);
                }}
              >
                Bank Receipt Voucher
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="danger"
                onClick={() => { setShowVoucherTypeModal(false); setShowBPVModal(true); }}
              >
                Bank Payment Voucher
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowVoucherTypeModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* BPV Modal */}
      <Modal show={showBPVModal} onHide={() => setShowBPVModal(false)} className="modal-md">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isEdit ? "Edit Voucher" : "Add Bank Payment Voucher"}
          </Modal.Title>
          <button type="button" className="btn-close" onClick={() => setShowBPVModal(false)}></button>
        </Modal.Header>
        <Modal.Body>
          <BPVModal
            onSave={(data) => { handleSave(data, "BPV"); setShowBPVModal(false); }}
            voucher={selectedVoucher}
            onCancel={() => setShowBPVModal(false)}
          />
        </Modal.Body>
      </Modal>
      {/* BRV Modal */}
      <Modal show={showBRVModal} onHide={() => setShowBRVModal(false)} className="modal-md">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isEdit ? "Edit Voucher" : "Add Bank Receipt Voucher"}
          </Modal.Title>
          <button type="button" className="btn-close" onClick={() => setShowBRVModal(false)}></button>
        </Modal.Header>
        <Modal.Body>
          <BRVModal
            onSave={(data) => { handleSave(data, "BRV"); setShowBRVModal(false); }}
            voucher={selectedVoucher}
            onCancel={() => setShowBRVModal(false)}
          />
        </Modal.Body>
      </Modal>


      {/* CRV Modal */}
      <Modal show={showCRVModal} onHide={() => setShowCRVModal(false)} className="modal-md">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isEdit ? "Edit Voucher" : "Add Cash Receipt Voucher"}
          </Modal.Title>
          <button type="button" className="btn-close" onClick={() => setShowCRVModal(false)}></button>
        </Modal.Header>
        <Modal.Body>
          <CRVModal
            onSave={(data) => { handleSave(data, "CRV"); setShowCRVModal(false); }}
            voucher={selectedVoucher}
            onCancel={() => setShowCRVModal(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showCPVModal} onHide={() => setShowCPVModal(false)} className="modal-md">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isEdit ? "Edit Voucher" : "Add Cash Payment Voucher"}
          </Modal.Title>
          <button type="button" className="btn-close" onClick={() => setShowCPVModal(false)}></button>
        </Modal.Header>
        <Modal.Body>
          <CPVModal
            onSave={(data) => { handleSave(data, "CPV"); setShowCPVModal(false); }}
            voucher={selectedVoucher}
            onCancel={() => setShowCPVModal(false)}
          />
        </Modal.Body>
      </Modal>


      {/* Journal Voucher Modal */}
      <Modal show={showJVModal} onHide={() => setShowJVModal(false)} className="modal-md">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isEdit ? "Edit Voucher" : "Add Journal Voucher"}
          </Modal.Title>
          <button type="button" className="btn-close" onClick={() => setShowJVModal(false)}></button>
        </Modal.Header>
        <Modal.Body>
          <JournalVoucherModal
            onSave={(data) => { handleSave(data, "JV"); setShowJVModal(false); }}
            voucher={selectedVoucher}
            onCancel={() => setShowJVModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
