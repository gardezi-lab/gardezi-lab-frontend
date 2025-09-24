import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


export default function ConsultantModal() {
    return (
        <>
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Doctor Name</Form.Label>
                                <Form.Control type="email" placeholder="doctor name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Contact No :</Form.Label>
                                <Form.Control type="email" placeholder="Contact No" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Hospital :</Form.Label>
                                <Form.Control type="email" placeholder="Hospital name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Username :</Form.Label>
                                <Form.Control type="email" placeholder="Hospital name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Age  :</Form.Label>
                                    <Form.Control type="email" placeholder="Hospital name" />
                                </Form.Group>
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </Container >
        </>
    )
}