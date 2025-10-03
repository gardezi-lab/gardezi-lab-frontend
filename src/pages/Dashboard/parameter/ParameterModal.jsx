import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";



export default function ParameterModal({ onSave, onCancel, Parameter }) {
    const [formData, setFormData] = useState({
        parameter_name: "",
        sub_heading: "",
        input_type: "",
        unit: "",
        normal_value: "",
        default_value: "",
    });

    useEffect(() => {
        if (Parameter) {
            // agar edit kar rahe ho to pura Parameter data daal do
            setFormData({
                parameter_name: Parameter.parameter_name || "",
                sub_heading: Parameter.sub_heading || "",
                input_type: Parameter.input_type || "",
                unit: Parameter.unit || "",
                normalvalue: Parameter.normalvalue || "",
                default_value: Parameter.default_value || "",
            });
        } else {
            // agar new add kar rahe ho to blank form rakho
            setFormData({
                parameter_name: "",
                sub_heading: "",
                input_type: "",
                unit: "",
                normalvalue: "",
                default_value: "",
            });
        }
    }, [Parameter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Parameter</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="parameter_name"
                                    placeholder="parameter Name"
                                    value={formData.parameter_name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Sub Heading</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sub_heading"
                                    placeholder="Sub Heading"
                                    value={formData.sub_heading}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                         <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Input type</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    name="input_type"
                                    value={formData.input_type}
                                    onChange={handleChange}>
                                    <option value="2">Input</option>
                                    <option value="3">Textarea</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Unit</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="unit"
                                    placeholder="Unit for parameter"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Normal Value</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Techanique details of test"
                                value={formData.normal_value}
                                name="normalvalue"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label >Enter Default Value For This Parameter</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Write here"
                                    value={formData.default_value}
                                    onChange={handleChange}
                                    name="default_value"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onCancel}>
                            Cancel & Close
                        </Button>
                        <Button variant="primary" type="submit">
                            {Parameter ? "Update" : "Save"}
                        </Button>

                    </div>

                </Form>
            </Container >
        </>
    )
}