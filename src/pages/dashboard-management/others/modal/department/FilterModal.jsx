import { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Form, Button } from "react-bootstrap";

export default function FilterModal({ isShowFilterModal, setIsShowFilterModal }) {
    const [departmentName, setDepartmentName] = useState("")

    const closeModal = () => {
        setIsShowFilterModal(false);
    }

    const saveChanges = () => {
        setIsShowFilterModal(false);
    }

    return (
        <>
            <Modal show={isShowFilterModal} size="md" centered >
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">Filter Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search with department name"
                                            value={departmentName}
                                            onChange={(e) => setDepartmentName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" className="secondary" onClick={closeModal}>
                        Clear & Close
                    </Button>
                    <Button variant="primary" size="sm" className="primary" onClick={saveChanges} >
                        Apply Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}