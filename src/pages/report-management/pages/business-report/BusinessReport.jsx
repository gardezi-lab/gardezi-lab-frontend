import { useState } from "react";
import httpClient from "../../../../services/httpClient";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import BusinessReportFilterModal from "../../others/modal/business-report-filter-modal/BusinessReportFilterModal";

export default function BusinessReport() {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showLedgerModal, setShowLedgerModal] = useState(false);

    const fetchBusinessReport = async (startDate, endDate) => {
        setLoading(true);
        try {
            const res = await httpClient.get("/reporting/business_report", {
                start_date: startDate,
                end_date: endDate
            });

            setReportData(res.business_report[0]);
            setShowLedgerModal(false);
        } catch (err) {
            console.error("Business Report Fetch Error:", err);
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
        <>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
                <h5 className="fw-bold page-header">Business Report</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline-success"
                        className="btn filter-btn"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-filter"></i>
                    </Button>

                </div>
            </div>

            <Container >

                <Row>
                    <Col>
                        <div className="card card-bg-1 text-center p-3">
                            <h1 className="text-white">{reportData?.patient_details?.total_patient || 0}</h1>
                            <p className="mt-2 m-0 text-white">TOTAL PATIENTS</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-2 text-center p-3">
                            <h1 className="text-white">{reportData?.patient_details?.patient_processed || 0}</h1>
                            <p className="mt-2 m-0 text-white">PATIENTS PROCESSED</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-3 text-center p-3">
                            <h1 className="text-white">{reportData?.patient_details?.pending_patient || 0}</h1>
                            <p className="mt-2 m-0 text-white">PENDING PATIENTS</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-4 text-center p-3">
                            <h1 className="text-white">{reportData?.tests_details?.total_test || 0}</h1>
                            <p className="mt-2 m-0 text-white">TOTAL TESTS</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container className="mt-4">
                <Row>
                    <Col>
                        <div className="card card-bg-5 text-center p-3">
                            <h1 className="text-white">{reportData?.tests_details?.processed_test || 0}</h1>
                            <p className="mt-2 m-0 text-white">PROCESSED TEST</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-6 text-center p-3">
                            <h1 className="text-white">{reportData?.amount_summary?.total_sale || 0}</h1>
                            <p className="mt-2 m-0 text-white">TOTAL SALE</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-7 text-center p-3">
                            <h1 className="text-white">{reportData?.amount_summary?.total_discount || 0}</h1>
                            <p className="mt-2 m-0 text-white">TOTAL DISCOUNT</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-8 text-center p-3">
                            <h1 className="text-white">{(reportData?.amount_summary?.total_amount || 0) - (reportData?.amount_summary?.total_discount || 0)}</h1>
                            <p className="mt-2 m-0 text-white">NEW AMOUNT</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container className="mt-4">
                <Row>
                    <Col>
                        <div className="card card-bg-1 text-center p-3">
                            <h1 className="text-white">{reportData?.amount_summary?.paid_amount || 0}</h1>
                            <p className="mt-2 m-0 text-white">NET CASH RECEIVED</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-2 text-center p-3">
                            <h1 className="text-white">{reportData?.amount_summary?.due_amount || 0}</h1>
                            <p className="mt-2 m-0 text-white">DUE</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-3 text-center p-3">
                            <h1 className="text-white">0</h1>
                            <p className="mt-2 m-0 text-white">EXPENSES</p>
                        </div>
                    </Col>

                    <Col>
                        <div className="card card-bg-1 text-center p-3">
                            <h1 className="text-white">0</h1>
                            <p className="mt-2 m-0 text-white">CASH RCVD ADMIN</p>
                        </div>
                    </Col>
                </Row>
            </Container>


            <Modal show={showLedgerModal} className="modal-md">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">Business</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BusinessReportFilterModal
                        onCancel={handleClose}
                        onApply={fetchBusinessReport}
                        loading={loading}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}
