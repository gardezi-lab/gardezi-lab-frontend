import { Modal, Button, Form } from "react-bootstrap";

export default function BalanceSheetModal({ show, onClose, formData, onChange, onApply }) {

    return (
        <Modal show={show}>
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form.Group className="mt-2">
                    <Form.Label>From:</Form.Label>
                    <Form.Control
                        type="date"
                        name="from"
                        value={formData.from}
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>To:</Form.Label>
                    <Form.Control
                        type="date"
                        name="to"
                        min={formData.from}
                        value={formData.to}
                        onChange={(e) => onChange(e.target.name, e.target.value)}
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
