import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";



export default function TestPackageModal({ onSave, TestPackage, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        selected_test: "",
    });

    // agar edit kar rahe hain to purane values load karo
    useEffect(() => {
        if (TestPackage) {
            setFormData({
                name: TestPackage.name || "",
                price: TestPackage.price || "",
                selected_test: TestPackage.selected_test || "",
            });
        } else {
            setFormData({
                name: "",
                price: "",
                selected_test: "",
            });
        }
    }, [TestPackage]);

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
                                <Form.Label> Name</Form.Label>
                                <Form.Control
                                    type="Text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Package name"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Fee</Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="Package Fee"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Selected Test</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter selected test"
                                    name="selected_test"
                                    value={formData.selected_test}
                                    onChange={handleChange}
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
                            {TestPackage ? "Update" : "Save"}
                        </Button>
                    </div>
                </Form>
            </Container >
        </>
    )
}