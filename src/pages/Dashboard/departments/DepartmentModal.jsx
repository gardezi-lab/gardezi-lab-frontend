import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function DepartmentModal({ onSave, department, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (department) {
      setName(department.name);
    } else {
      setName("");
    }
  }, [department]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {department ? "Update" : "Save"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
