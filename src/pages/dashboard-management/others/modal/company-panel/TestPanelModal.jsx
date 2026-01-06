import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function TestProfilesModal({ onSave, company, onCancel }) {
    const [companyName, setCompanyName] = useState("");
    const [headName, setHeadName] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [userName, setUserName] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        if (company) {
            setCompanyName(company.company_name || "");
            setHeadName(company.head_name || "");
            setContactNo(company.contact_no || "");
            setUserName(company.user_name || "");
            setAge(company.age || "");
        } else {
            setCompanyName("");
            setHeadName("");
            setContactNo("");
            setUserName("");
            setAge("");
        }
    }, [company]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            company_name: companyName,
            head_name: headName,
            contact_no: contactNo,
            user_name: userName,
            age: Number(age)
        };
        onSave(payload);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Name :</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Enter Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Head Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Head Name"
                                value={headName}
                                onChange={(e) => setHeadName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Contact No"
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Enter Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" className="secondary" onClick={onCancel}>
                        Cancel & Close
                    </Button>
                    <Button variant="primary" type="submit" className="primary">
                        {company ? "Update" : "Save"}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
