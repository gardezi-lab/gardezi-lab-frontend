import { useState } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';

export default function FilterModal({ openFilterModal, setOpenFilterModal }) {

    const [filters, setFilters] = useState({
        name: '',
    });

    const handleCloseFilterModal = () => {
        setFilters({
            name: '',
        })
        setOpenFilterModal(false);
    };

    const handleApplyFilter = () => {
        setOpenFilterModal(false)
        const { name } = filters;
        if (!name) return;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,

        }));
    };

    return (
        <Modal show={openFilterModal}>
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Role</Modal.Title>
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
