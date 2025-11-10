import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function RoleModal({ onSave, role, onCancel }) {
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (role) {
      setRoleName(role.role_name); // ✅ Role ke object ki key use karo
    } else {
      setRoleName("");
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ roleName });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" className="secondary" onClick={onCancel}>
            Cancel & Close
          </Button>
          <Button variant="primary" className="primary" type="submit">
            {role ? "Update" : "Submit"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
