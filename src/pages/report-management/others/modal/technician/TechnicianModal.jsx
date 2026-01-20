import React, { useState } from 'react'
import { Container, Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';

export default function TechnicianModal({ show, onClose, formData, technician, applyFilter, onChange }) {

    const handleSelectChange = (selectedOption) => {
        onChange("technician_id", selectedOption?.value || "");
    };

    return (
        <Modal show={show} >
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Form.Group>
                        <Form.Label className="form-label">Select Technician</Form.Label>
                        <Select
                            name="center_id"
                            value={
                                formData.technician_id
                                    ? {
                                        value: formData.technician_id,
                                        label: technician.find(r => r.id === formData.technician_id)?.name
                                    }
                                    : null
                            }
                            placeholder="Select Lab"
                            onChange={handleSelectChange}
                            options={technician?.map((item) => ({
                                value: item.id,
                                label: item.name
                            }))}
                        />

                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>From:</Form.Label>
                        <Form.Control
                            type="date"
                            name="from"
                            value={formData.from}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>To:</Form.Label>
                        <Form.Control
                            type="date"
                            name="to"
                            min={formData.from}
                            value={formData.to}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
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


