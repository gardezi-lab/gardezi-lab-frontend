import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import { Container, Button, Modal, Form, Table } from 'react-bootstrap';
import Select from 'react-select';
import { ReactSelectStyles } from "../../others/utils/reactSelectStyles";
import { useFetchCompanies } from "../../others/custom-hooks/useFetchCompany";


export default function PanelReport() {
    const customStyles = ReactSelectStyles();
    const [reportList, setReportList] = useState([]);
    const { companyList, getCompinesList } = useFetchCompanies();
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [totalAmount, setTotalAmount] = useState()
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        patientCompany: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    }

    const handleSelectChange = (selectedOption, name) => {
        setFormData((prev) => ({ ...prev, [name]: selectedOption }));
    };

    const handleFilters = () => {
        setShowFilterModal(true);
    }

    const handleCloseFilters = () => {
        setShowFilterModal(false);
        setFormData({
            from: "",
            to: "",
            patientCompany: ""
        });
    }

    const handleReport = async () => {
        console.log("formData", formData);
        try {
            const url = `/companies_panel/company/${formData.patientCompany?.value}?from_date=${formData.from}&to_date=${formData.to}`;
            const response = await httpClient.get(url);
            if (response) {
                setReportList(response.patients);
                const totalAmount = response.patients.reduce(
                    (sum, item) => sum + Number(item?.total_fee || 0),
                    0
                );
                setTotalAmount(totalAmount)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const applyFilter = () => {
        handleReport();
        setShowFilterModal(false);
    }


    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold page-header">Panel Report</h5>
                <div className="d-flex gap-2">

                    <button
                        className="btn  filter-btn"
                        type="button"
                        onClick={handleFilters}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">MR#</th>
                        <th scope="col">Cell</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        reportList?.map((report, index) => {
                            return (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{report?.created_at}</td>
                                    <td>{report?.patient_name}</td>
                                    <td>{report?.mr_number}</td>
                                    <td>{report?.cell}</td>
                                    <td>{report?.total_fee}</td>
                                </tr>
                            )
                        }) 
                    }
                    {
                        totalAmount &&
                        <tr>
                            <td colSpan={5}>Total</td>
                            <td>{totalAmount}</td>
                        </tr>
                    }

                </tbody>
            </Table>

            <Modal show={showFilterModal}>
                <Modal.Header className="primary">
                    <Modal.Title className="fw-bold color-white">Panel Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form.Group className="mb-3">
                            <Form.Label>Comapny</Form.Label>
                            <Select
                                className="input-text-color"
                                name="patientCompany"
                                value={formData.patientCompany}
                                placeholder="Select Company"
                                onChange={(selectedOption) =>
                                    handleSelectChange(selectedOption, "patientCompany")
                                }
                                options={companyList?.map((company) => ({
                                    value: company.id,
                                    label: company.company_name
                                }))}
                                styles={customStyles}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                type="date"
                                name="from"
                                value={formData.from}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                type="date"
                                name="to"
                                min={formData.from}
                                value={formData.to}
                                onChange={handleChange}
                            />
                        </Form.Group>



                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" className="secondary" onClick={handleCloseFilters}>
                        Clear & Close
                    </Button>
                    <Button variant="primary" className="primary" onClick={applyFilter} >
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}