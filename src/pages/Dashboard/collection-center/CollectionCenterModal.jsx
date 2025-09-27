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
                                <Form.Label>Lab Name :</Form.Label>
                                <Form.Control type="text" placeholder="Lab Name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Head Name</Form.Label>
                                <Form.Control type="text" placeholder="Head Name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control type="number" placeholder="Contact No" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder="Enter Email " />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Login Password</Form.Label>
                                <Form.Control type="text" placeholder="Login Password" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Color For Graphical </Form.Label>
                                <Form.Control type="number" placeholder="#12345" />
                            </Form.Group>
                        </Col>
                       
                    </Row>
                    <Row>
                         <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address  </Form.Label>
                                <Form.Control type="text" placeholder="Address  Here " />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container >
        </>
    )
}