import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddVendorModal({ onSave, vender, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (vender) {
            setFormData({
                name: vender.name || "",
                phone: vender.phone || "",
                address: vender.address || "",
            });
        } else {
            setFormData({ name: "", phone: "", address: "" });
        }
    }, [vender]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Vendor Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Vendor name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Phone No"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Enter Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2">
                    <Button className="secondary" variant="secondary" onClick={onCancel}>
                        Cancel & Close
                    </Button>
                    <Button className="primary" variant="primary" type="submit">
                        {vender ? "Update" : "Save"}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
