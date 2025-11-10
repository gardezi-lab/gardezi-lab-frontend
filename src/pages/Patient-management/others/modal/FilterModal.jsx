import { useState } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';

export default function FilterModal({ showFilterModal, setShowFilterModal, getUpdatedPatientList }) {

    const [filters, setFilters] = useState({
        name: '',
        cell: '',
        mrNumber: '',
        fromDate: '',
        toDate: '',
    });

    const handleCloseFilterModal = () => {
        setFilters({
            name: '',
            cell: '',
            mrNumber: '',
            fromDate: '',
            toDate: '',
        })
        getUpdatedPatientList();
        setShowFilterModal(false);
    };

    const handleApplyFilter = () => {
        const { name, cell, mrNumber, fromDate, toDate } = filters;
        if (!name && !cell && !mrNumber && !fromDate && !toDate) return;

        getUpdatedPatientList(name, cell, fromDate, toDate, mrNumber);
        setShowFilterModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "fromDate" && prev.toDate && value > prev.toDate ? { toDate: "" } : {}),
        }));
    };

    return (
        <Modal show={showFilterModal}>
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Patient Name"
                            value={filters.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cell</Form.Label>
                        <Form.Control
                            type="text"
                            name="cell"
                            placeholder="Enter Patient Cell"
                            value={filters.cell}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>MR#</Form.Label>
                        <Form.Control
                            type="text"
                            name="mrNumber"
                            placeholder="Enter MR Number"
                            value={filters.mrNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>From:</Form.Label>
                        <Form.Control
                            type="date"
                            name="fromDate"
                            value={filters.fromDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>To:</Form.Label>
                        <Form.Control
                            type="date"
                            name="toDate"
                            min={filters.fromDate}
                            value={filters.toDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" className="secondary" onClick={handleCloseFilterModal}>
                    Clear & Close
                </Button>
                <Button variant="primary" className="primary" onClick={handleApplyFilter}>
                    Apply
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
