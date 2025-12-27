import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddStockModal({ onSave, stock, onCancel }) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (stock) {
            setName(stock.name || "");
        } else {
            setName("");
        }
    }, [stock]);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Stock item name"
                                value={name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" className="secondary" onClick={onCancel}>
                        Cancel & Close
                    </Button>
                    <Button className="primary" variant="primary" type="submit">
                        {stock ? "Update" : "Save"}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
