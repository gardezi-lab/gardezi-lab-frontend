import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddResult from "./AddResult";

export default function AddResultModal({ onSave, AddResult, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        mr: "",
        date: "",
        add_results: "",
        sample: "",
    });

    // Agar edit mode hai (department prop mila ho)
    useEffect(() => {
        if (AddResult) {
            setFormData({
                name: AddResult.name || "",
                mr: AddResult.mr || "",
                date: AddResult.date || "",
                add_results: AddResult.add_results || "",
                sample: AddResult.sample || "",
            });
        }
    }, [AddResult]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // ✅ pura form data backend ko bhejenge
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>MR No</Form.Label>
                            <Form.Control
                                type="text"
                                name="mr"
                                placeholder="Enter MR Number"
                                value={formData.mr}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Sample</Form.Label>
                            <Form.Control
                                type="text"
                                name="sample"
                                placeholder="Enter Sample"
                                value={formData.sample}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Result Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="add_results"
                                placeholder="Enter Results"
                                value={formData.add_results}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel & Close
                    </Button>
                    <Button variant="primary" type="submit">
                        {AddResult ? "Update" : "Save"}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
