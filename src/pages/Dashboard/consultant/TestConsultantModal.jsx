import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import httpClient from "../../../services/httpClient";


export default function TestConsultantModal({ onSave, consultant, onCancel }) {

    const [consultantName, setConsultantName] = useState("");
    const [consultantContact, setConsultantContact] = useState("");
    // const [consultantHospital, setConsultantHospital] = useState("");
    const [consultantUserName, setConsultantUserName] = useState("");
    const [consultantAge, setConsultantAge] = useState("");
    const [roles, setRoles] = useState([]);
    const [consultantRole, setConsultantRole] = useState("");


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await httpClient.get("/role");
                if (Array.isArray(res)) {
                    setRoles(res);
                } else if (Array.isArray(res.data)) {
                    setRoles(res.data);
                }
            } catch (err) {
                console.error("Error role packages:", err);
            }
        };

        fetchRoles();
    }, []);


    useEffect(() => {
        if (consultant) {
            setConsultantName(consultant.name || "");
            setConsultantContact(consultant.contact_no || "");
            setConsultantRole(consultant.role || "");
            setConsultantUserName(consultant.user_name || "");
            setConsultantAge(consultant.age || "");
        } else {
            setConsultantName("");
            setConsultantContact("");
            setConsultantRole("");
            setConsultantUserName("");
            setConsultantAge("");
        }
    }, [consultant]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            consultantName,
            consultantContact,
            consultantRole,
            consultantUserName,
            consultantAge,
        });
    };


    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Doctor Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={consultantName}
                                    onChange={(e) => setConsultantName(e.target.value)}
                                    required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Contact No"
                                    value={consultantContact}
                                    onChange={(e) => setConsultantContact(e.target.value)}
                                    required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Username </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username "
                                    value={consultantUserName}
                                    onChange={(e) => setConsultantUserName(e.target.value)}
                                    required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Age"
                                    value={consultantAge}
                                    onChange={(e) => setConsultantAge(e.target.value)}
                                    required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    value={consultantRole}
                                    onChange={(e) => setConsultantRole(e.target.value)}
                                >
                                    <option value="">Select Company</option>
                                    {roles.map((roles) => (
                                        <option key={roles.id} value={roles.role_name}>
                                            {roles.role_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onCancel}>
                            Cancel & Close
                        </Button>
                        <Button variant="primary" type="submit">
                            {consultant ? "Update" : "Submit"}
                        </Button>
                    </div>
                </Form>
            </Container >
        </>
    )
}