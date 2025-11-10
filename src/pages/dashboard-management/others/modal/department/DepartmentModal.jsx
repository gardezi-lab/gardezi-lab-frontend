import { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Form, Button } from "react-bootstrap";
import httpClient from "../../../../../services/httpClient";

export default function DepartmentModal({ isShowDepartmentModal, setIsShowDepartmentModal, modalHeader, updateObj }) {
    const [departmentName, setDepartmentName] = useState("");

    const closeModal = () => {
        setIsShowDepartmentModal(false);
        clearForm();
    }

    const clearForm = () => {
        setDepartmentName("");
    }

    const saveChanges = async () => {
        try {
            const obj = {
                department_name: departmentName
            }
            const url = `/department`;
            let response = null;
            if (modalHeader == "Update") {
                console.log("obj", obj)
                response = await httpClient.put(`${url}/${updateObj.id}`, obj);
            } else {
                response = await httpClient.post(url, obj);
            }
            if (response) {
                console.log(response);
                clearForm();
            }
        } catch (err) {
            console.error(err);
        } finally {
            closeModal();
        }
    };

    useEffect(() => {
        setDepartmentName(updateObj?.department_name);
    }, [updateObj !== null, isShowDepartmentModal])


    return (
        <>
            <Modal show={isShowDepartmentModal} size="md" centered>
                <Modal.Header className="primary" size="sm">
                    <Modal.Title className="color-white fw-bold">Department Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Department name"
                                            name="departmentName"
                                            value={departmentName}
                                            onChange={(e) => setDepartmentName(e.target.value)}
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
                        Close
                    </Button>
                    <Button variant="primary" size="sm" className="primary" onClick={saveChanges} >
                        {modalHeader == "Update" ? "Update" : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}