import { Modal, Button, Form } from "react-bootstrap";
import Select from 'react-select';

export default function ConsultantReportModal({ show, onClose, formData, onChange, onApply, consultant }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const handleSelectChange = (selectedOption) => {
        onChange("receptionist_id", selectedOption?.value || "");
    };

    return (
        <Modal show={show}>
            <Modal.Header className="primary">
                <Modal.Title className="fw-bold color-white">Filter Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label className="form-label">Consultant</Form.Label>
                    <Select
                        name="doctors_id"
                        value={
                            formData.doctors_id
                                ? {
                                    value: formData.doctors_id,
                                    label: consultant.find(r => r.id === formData.doctors_id)?.name
                                }
                                : null
                        }
                        placeholder="Select Consultant"
                        onChange={(selectedOption) => onChange("doctors_id", selectedOption?.value || "")}
                        options={consultant.map((item) => ({
                            value: item.id,    // backend se jo id aati hai
                            label: item.name
                        }))}
                    />

                </Form.Group>
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
