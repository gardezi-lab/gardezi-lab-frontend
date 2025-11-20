import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import httpClient from "../../../services/httpClient";

export default function LedgerModal({ onSave, onCancel }) {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [accountHeadList, setAccountHeadList] = useState([]);
    const [selectedAccountHead, setSelectedAccountHead] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAccountHeadData = async () => {
        setLoading(true);
        try {
            const res = await httpClient.get("/accounts");
            setAccountHeadList(res.data);

        } catch (err) {
            console.error("Fetch account head error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAccountHeadData();
    }, []);

    const handleSubmit = () => {
        const formData = {
            from_date: fromDate,
            to_date: toDate,
            account_head_id: selectedAccountHead ? selectedAccountHead.value : null,
        };
        onSave(formData);
        console.log("formData before send:", formData);
    };

    return (
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

                <Row className="align-items-end">
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Account Head</Form.Label>
                            <Select
                                // options={accountHeadList}
                                value={selectedAccountHead}
                                onChange={(selected) => setSelectedAccountHead(selected)}
                                placeholder="Select Head"
                                options={accountHeadList.map((list) => ({
                                    value: list.id,
                                    label: list.name_head
                                }))}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel & Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Apply
                </Button>
            </div>
        </Container>
    );
}



