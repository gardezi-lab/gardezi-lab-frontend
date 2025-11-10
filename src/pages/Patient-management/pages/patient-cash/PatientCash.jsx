import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import { Container, Button, Modal, Form, Table } from 'react-bootstrap';


export default function PatientCash() {
    const [cashList, setCashList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [formData, setFormData] = useState({
        from: "",
        to: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    }

    const handleFilters = () => {
        setShowFilterModal(true);
    }

    const handleCloseFilters = () => {
        setShowFilterModal(false);
        setFormData({
            from: "",
            to: ""
        });
    }

    const handleCash = async () => {
        const url = `/cash?from_date=${formData.from}&to_date=${formData.to}`;
        const response = await httpClient.get(url);
        if (response) {
            setCashList(response.result);
        }
    }

    const applyFilter = () => {
        handleCash();
        setShowFilterModal(false);
    }

    useEffect(() => {
        handleCash()
    }, []);

    useEffect(() => {
        if (formData.from === "" && formData.to === "") {
            handleCash();
        }
    }, [formData]);


    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold page-header">Cash Management</h5>
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
                        <th scope="col">MR#</th>
                        <th scope="col">CR</th>
                        <th scope="col">DR</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cashList?.map((cash, index) => {
                            return (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{cash?.date}</td>
                                    <td>{cash?.description}</td>
                                    <td>{cash?.dr}</td>
                                    <td>{cash?.cr}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>

            <Modal show={showFilterModal}>
                <Modal.Header className="primary">
                    <Modal.Title className="fw-bold color-white">Filter Cash</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form.Group className="mb-3">
                            <Form.Label>From:</Form.Label>
                            <Form.Control
                                type="date"
                                name="from"
                                value={formData.from}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>To:</Form.Label>
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