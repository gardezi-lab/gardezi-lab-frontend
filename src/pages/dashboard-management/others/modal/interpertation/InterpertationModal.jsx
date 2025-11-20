import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Editor } from "@tinymce/tinymce-react";

export default function InterpertationModal({ onSave, interpertation, onCancel }) {
    const [interpertationType, setInterpertationType] = useState("");
    const [interpertationCode, setInterpertationCode] = useState("");
    const [interpertationHeading, setInterpertationHeading] = useState("");
    const [interpertationDetail, setInterpertationDetail] = useState("");

    useEffect(() => {
        if (interpertation) {
            setInterpertationType(interpertation.type || "");
            setInterpertationCode(interpertation.code || "");
            setInterpertationHeading(interpertation.heading || "");
            setInterpertationDetail(interpertation.detail || "");
        } else {
            setInterpertationType("");
            setInterpertationCode("");
            setInterpertationHeading("");
            setInterpertationDetail("");
        }
    }, [interpertation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            interpertationType,
            interpertationCode,
            interpertationHeading,
            interpertationDetail,

        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    {/* <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                                value={interpertationType}
                                onChange={(e) => setInterpertationType(e.target.value)}
                            >
                                <option value="Doctor">Doctor</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </Form.Select>
                        </Form.Group>
                    </Col> */}
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label> Code </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Code"
                                value={interpertationCode}
                                onChange={(e) => setInterpertationCode(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label> Heading </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Heading"
                                value={interpertationHeading}
                                onChange={(e) => setInterpertationHeading(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Interpretation</Form.Label>
                            <Editor
                                apiKey="l36hqr3x3exo3ohxmszz3lit1q94beevttx3t5w3q0qplcqr" // free usage
                                value={interpertationDetail}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: "link image code lists",
                                    toolbar:
                                        "undo redo | formatselect | bold italic underline | " +
                                        "alignleft aligncenter alignright | bullist numlist | " +
                                        "link image | code",
                                    forced_root_block: "",
                                }}
                                onEditorChange={(detail) => setInterpertationDetail(detail)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel & Close
                    </Button>
                    <Button variant="primary" type="submit">
                        {interpertation ? "Update" : "Submit"}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
