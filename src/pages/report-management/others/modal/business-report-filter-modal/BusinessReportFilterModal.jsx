import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function BusinessReportFilterModal({ onApply, onCancel, loading }) {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleSubmit = () => {
        if (!fromDate || !toDate) return alert("Please select both dates");
        onApply(fromDate, toDate);
    };


    return (
        <div>
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>From Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>To Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button variant="secondary" className="secondary" onClick={onCancel}>
                        Cancel & Close
                    </Button>
                    <Button variant="primary" className="primary" onClick={handleSubmit}>
                        Apply
                    </Button>
                </div>
            </Container>
        </div>
    )
}
