import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


export default function TestProfilesModal() {
    return (
        <>
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Test Name</Form.Label>
                                <Form.Control type="email" placeholder="Will Show on Report" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Test Code</Form.Label>
                                <Form.Control type="email" placeholder="For search short code" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Sample Required</Form.Label>
                                <Form.Control type="email" placeholder="sample Required" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Select Header</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Select header</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Fee</Form.Label>
                                <Form.Control type="email" placeholder="Test Fee" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Delivery Time</Form.Label>
                                <Form.Control type="email" placeholder="Delivery time in hr" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Serology Elisa</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Select One</option>
                                    <option value="1">Yes</option>
                                    <option value="2">No</option>
                                </Form.Select>

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label  className="fw-bold">Interpertation</Form.Label>
                                <Form.Select aria-label="Default select example">
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
                </Form>
            </Container >
        </>
    )
}