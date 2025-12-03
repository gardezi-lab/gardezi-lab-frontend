import { Modal, Button, Form } from "react-bootstrap";

export default function ConsultantReportModal({ show, onClose, formData, onChange, onApply }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value); 
    };

    return (
        <Modal show={show}>
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>From:</Form.Label>
                    <Form.Control
                        type="date"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>To:</Form.Label>
                    <Form.Control
                        type="date"
                        name="to"
                        min={formData.from}
                        value={formData.to}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" className="secondary" onClick={onClose}>Clear & Close</Button>
                <Button variant="primary" className="primary" onClick={onApply}>Apply</Button>
            </Modal.Footer>
        </Modal>
    );
}
