import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


export default function DepartmentModal() {
    return (
        <>
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label> Name</Form.Label>
                                <Form.Control type="email" placeholder="Enter name" />
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>
            </Container >
        </>
    )
}