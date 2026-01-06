import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import httpClient from "../../../../services/httpClient";
// import httpClient from "../../../services/httpClient";
import LedgerModal from "../../others/modal/LedgerModal";
import LedgerTable from "../../others/table/LedgerTable";
import { Button } from "react-bootstrap";


export default function Ledger() {
    const [accoutheadlist, setAccoutHeadList] = useState({});
    const [showLedgerModal, setShowLedgerModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState({ from_date: "", to_date: "" });

    const saveLedgerData = async (formData) => {
        setLoading(true);
        try {
            const url = `/journal_vouchers/ledger?account_head_id=${formData.account_head_id}&from_date=${formData.from_date}&to_date=${formData.to_date}`;
            const res = await httpClient.get(url);
            console.log(res);

            setAccoutHeadList(res);
            setDateRange({ from_date: formData.from_date, to_date: formData.to_date });
            setShowLedgerModal(false);
        } catch (err) {
            console.error("Save Ledger Error:", err);
        } finally {
            setLoading(false);
        }
    };
    const handleClose = () => {
        setShowLedgerModal(false);
    };
    const handleShow = () => {
        setShowLedgerModal(true);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-start mb-3 mt-2">

                <div>
                    <h5 className="fw-bold mb-1 page-header">LEDGER</h5>

                    {accoutheadlist?.account_head_name || accoutheadlist?.name_head ? (
                        <h6 className="text-primary mb-1">
                            {accoutheadlist.account_head_name || accoutheadlist.name_head}
                        </h6>
                    ) : null}

                    {dateRange.from_date && dateRange.to_date && (
                        <small className="text-muted">
                            From: <strong>{dateRange.from_date}</strong>
                            &nbsp; | &nbsp;
                            To: <strong>{dateRange.to_date}</strong>
                        </small>
                    )}
                </div>

                <Button
                    variant="outline-success"
                    size="sm"
                    className="btn filter-btn"
                    type="button"
                    onClick={handleShow}
                >
                    <i className="fas fa-filter"></i>
                </Button>
            </div>


            <LedgerTable
                accoutheadlist={accoutheadlist}
                loading={loading}
            />
            <Modal show={showLedgerModal} className="modal-md">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold"> Ledger</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LedgerModal
                        onSave={saveLedgerData}
                        onCancel={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

