import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";



export default function TestProfilesModal({ onSave, TestProfile, onCancel }) {
    const [formData, setFormData] = useState({
        test_name: "",
        test_code: "",
        sample_required: "",
        select_header: "",
        fee: "",
        delivery_time: "",
        serology_elisa: "",
        interpretation: "",
    });

    // agar edit kar rahe hain to purane values load karo
    useEffect(() => {
        if (TestProfile) {
            setFormData({
                test_name: TestProfile.test_name || "",
                test_code: TestProfile.test_code || "",
                sample_required: TestProfile.sample_required || "",
                select_header: TestProfile.select_header || "",
                fee: TestProfile.fee || "",
                delivery_time: TestProfile.delivery_time || "",
                serology_elisa: TestProfile.serology_elisa || "",
                interpretation: TestProfile.interpretation || "",
            });
        } else {
            setFormData({
                test_name: "",
                test_code: "",
                sample_required: "",
                select_header: "",
                fee: "",
                delivery_time: "",
                serology_elisa: "",
                interpretation: "",
            });
        }
    }, [TestProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // pura form data bhej rahe hain
    };

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Test Name</Form.Label>
                                <Form.Control
                                    type="Text"
                                    name="test_name"
                                    value={formData.test_name}
                                    onChange={handleChange}
                                    placeholder="Will Show on Report"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Test Code</Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="For search short code"
                                    name="test_code"
                                    value={formData.test_code}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Sample Required</Form.Label>
                                <Form.Control type="text"
                                    placeholder="sample Required"
                                    name="sample_required"
                                    value={formData.sample_required}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Select Header</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    name="select_header"
                                    value={formData.select_header}
                                    onChange={handleChange}
                                >
                                    <option>Select header</option>
                                    <option value="Endocrinology">Endocrinology</option>
                                    <option value="Pathology">Pathology</option>
                                    <option value="Biochemistry">Biochemistry</option>
                                    <option value="Hematology">Hematology</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Fee</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Test Fee"
                                    name="fee"
                                    value={formData.fee}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Delivery Time</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Delivery time in hr"
                                    name="delivery_time"
                                    value={formData.delivery_time}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Serology Elisa</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    name="serology_elisa"
                                    value={formData.serology_elisa}
                                    onChange={handleChange}
                                >
                                    <option>Select One</option>
                                    <option value="1">Yes</option>
                                    <option value="2">No</option>
                                </Form.Select>

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="fw-bold">Interpertation</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    name="interpretation"
                                    value={formData.interpretation}
                                    onChange={handleChange}
                                >
                                    <option>Please Select</option>
                                    <option value="1">Yes</option>
                                    <option value="2">No</option>
                                    <option value="1">Yes</option>
                                    <option value="2">No</option>
                                    <option value="1">Yes</option>
                                    <option value="2">No</option>
                                </Form.Select>

                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                id="custom-checkbox"
                                label="Check It For No Unit No Refference Range"
                                checked={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                id="custom-checkbox"
                                label="check box for test like WIDAL and Other test types whose formate change"
                                checked={true}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onCancel}>
                            Cancel & Close
                        </Button>
                        <Button variant="primary" type="submit">
                            {TestProfile ? "Update" : "Save"}
                        </Button>
                    </div>
                </Form>
            </Container >
        </>
    )
}