import { useState, useEffect } from "react";
import Select from 'react-select';
import httpClient from "../../../../../services/httpClient";
import { Modal, Button, Form } from "react-bootstrap";

export default function DuePatientModal({ show, onClose, formData, onChange, onApply }) {

    const [companyList, setCompanyList] = useState([]);

    const getCompanyList = async () => {
        try {
            const response = await httpClient.get("/company");
            setCompanyList(response.data || []);
        } catch (error) {
            console.log("Error fetching company list:", error);
        }
    };

    useEffect(() => {
        getCompanyList();
    }, []);

    const handleSelectChange = (selectedOption, name) => {
        onChange(name, selectedOption?.value || "");
    };

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
                    <Form.Label className="form-label">Company</Form.Label>
                    <Select
                        className="input-text-color"
                        name="patientCompany"
                        // value={patientFormData.patientCompany}
                        placeholder="Select Company"
                        onChange={(selectedOption) =>
                            handleSelectChange(selectedOption, "patientCompany")
                        }
                        options={companyList?.map((company) => ({
                            value: company.id,
                            label: company.company_name
                        }))}
                        // styles={customStyles}
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
