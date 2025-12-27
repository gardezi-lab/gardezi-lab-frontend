import { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Form, Button } from "react-bootstrap";
import httpClient from "../../../../../services/httpClient";

export default function CollectionModal({ isShowDepartmentModal, setIsShowDepartmentModal, modalHeader, updateObj, refreshList }) {
    const [departmentName, setDepartmentName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");

    const closeModal = () => {
        setIsShowDepartmentModal(false);
        clearForm();
    }

    const clearForm = () => {
        setName(""),
            setEmail(""),
            setLocation(""),
            setPassword("")
    }

    const saveChanges = async () => {
        try {
            const obj = { name, email, location, password };
            const url = `/collectioncenter`;
            let response = null;

            if (modalHeader === "Update") {
                response = await httpClient.put(`${url}/${updateObj.id}`, obj);
            } else {
                response = await httpClient.post(url, obj);
                console.log("post response", response);

            }
            if (response) {
                console.log(response);
                clearForm();
                refreshList && refreshList();
            }
        } catch (err) {
            console.error(err);
        } finally {
            closeModal();
        }
    };
    useEffect(() => {
        if (updateObj) {
            setName(updateObj.name || ""),
                setEmail(updateObj.email || ""),
                setLocation(updateObj.location || ""),
                setPassword(updateObj.password || "")
        } else {
            clearForm();

        }
    }, [updateObj, isShowDepartmentModal]);


    return (
        <>
            <Modal show={isShowDepartmentModal} size="md" centered>
                <Modal.Header className="primary" size="sm">
                    <Modal.Title className="color-white fw-bold">Collection Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=" name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Location"
                                            name="Location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" className="secondary" onClick={closeModal}>
                      Clear & Close
                    </Button>
                    <Button variant="primary" size="sm" className="primary" onClick={saveChanges} >
                        {modalHeader == "Update" ? "Update" : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}