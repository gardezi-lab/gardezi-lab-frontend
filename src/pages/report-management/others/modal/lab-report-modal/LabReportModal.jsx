import React, { useState } from 'react'
import { Container, Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';

export default function LabReportModal({ show, onClose, formData, ccList, applyFilter, onChange }) {

    const handleSelectChange = (selectedOption) => {
        onChange("center_id", selectedOption?.value || "");
    };

    return (
        <Modal show={show} >
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Form.Group>
                        <Form.Label className="form-label">Lab</Form.Label>
                        <Select
                            name="center_id"
                            value={
                                formData.center_id && Array.isArray(ccList)
                                    ? {
                                        value: formData.center_id,
                                        label: ccList.find(r => r.id === formData.center_id)?.name
                                    }
                                    : null
                            }
                            placeholder="Select Lab"
                            onChange={handleSelectChange}
                            options={
                                Array.isArray(ccList)
                                    ? ccList.map(item => ({
                                        value: item.id,
                                        label: item.name
                                    }))
                                    : []
                            }
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


