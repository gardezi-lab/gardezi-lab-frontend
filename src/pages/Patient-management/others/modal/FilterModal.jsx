import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

export default function FilterModal({ showFilterModal, handleCloseFilterModal, search = "" }) {
    return (
        <Modal show={showFilterModal} onHide={handleCloseFilterModal}>
            <Modal.Header>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Lab </Form.Label>
                        <Form.Select>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Receptionist </Form.Label>
                        <Form.Select>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>From :</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label> To :</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFilterModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCloseFilterModal}>
                    Apply
                </Button>
            </Modal.Footer>
        </Modal>
    )
}