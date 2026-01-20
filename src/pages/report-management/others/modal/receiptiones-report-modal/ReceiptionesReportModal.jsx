import { Modal, Button, Form } from "react-bootstrap";
import Select from 'react-select';


export default function ReceiptionesReportModal({ show, onClose, formData, onChange, onApply, receptionList }) {

    const handleSelectChange = (selectedOption) => {
        onChange("receptionist_id", selectedOption.value || "");
    };

    return (
        <Modal show={show}>
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label className="form-label">Receptionist</Form.Label>
                    <Select
                        name="receptionist_id"
                        value={
                            formData.receptionist_id
                                ? {
                                    value: formData.receptionist_id,
                                    label: receptionList.find(r => r.id === formData.receptionist_id)?.name
                                }
                                : null
                        }
                        placeholder="Select Receptionist"
                        onChange={handleSelectChange}
                        options={receptionList.map((item) => ({
                            value: item.id,
                            label: item.name
                        }))}
                    />
                </Form.Group>

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
