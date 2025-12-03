import React, { useState } from 'react'
import { Container, Button, Modal, Form } from 'react-bootstrap';

export default function BusinessReportFilterModal({ show, onClose }) {

    const [formData, setFormData] = useState({
        from: "",
        to: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const applyFilter = () => {
        onClose(); // close modal
    }

    return (
        <Modal show={show} >
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>

                    <Form.Group className="mb-3">
                        <Form.Label>From:</Form.Label>
                        <Form.Control
                            type="date"
                            name="from"
                            value={formData.from}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>To:</Form.Label>
                        <Form.Control
                            type="date"
                            name="to"
                            min={formData.from}
                            value={formData.to}
                            onChange={handleChange}
                        />
                    </Form.Group>

                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" className="secondary" onClick={onClose}>Clear & Close</Button>
                <Button variant="primary" className="primary" onClick={applyFilter}>Apply</Button>
            </Modal.Footer>
        </Modal>
    )
}


