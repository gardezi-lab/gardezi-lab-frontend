import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import httpClient from "../../../services/httpClient";

export default function CreateAccountModal({ onSave, account, onCancel }) {
  const [headCode, setHeadCode] = useState("");
  const [headName, setHeadName] = useState("");
  const [ob, setOb] = useState("");
  const [obDate, setObDate] = useState("");
  const [parentAccount, setParentAccount] = useState("");

  const [parentOptions, setParentOptions] = useState([]);

  const getAccountData = async () => {
    try {
      const data = await httpClient.get("/account");
      if (data) {
        setParentOptions(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAccountData();
    if (account) {
      setHeadCode(account.head_code);
      setHeadName(account.head_name);
      setOb(account.ob);
      setObDate(account.ob_date);
      setParentAccount(account.parent_account);
    } else {
      setHeadCode("");
      setHeadName("");
      setOb("");
      setObDate("");
      setParentAccount("");
    }
  }, [account]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ headCode, headName, ob, obDate, parentAccount });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account name"
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Account Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account code"
                value={headCode}
                onChange={(e) => setHeadCode(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Opening Balance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter opening balance"
                value={ob}
                onChange={(e) => setOb(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Opening Balance Date</Form.Label>
              <Form.Control
                type="date"
                value={obDate}
                onChange={(e) => setObDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* ✅ Parent Account Dropdown */}
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Parent Account</Form.Label>
              <Form.Select
                value={parentAccount}
                onChange={(e) => setParentAccount(e.target.value)}
                required
              >
                <option value="">Select Parent Account</option>
                {parentOptions.map((option) => (
                  <option key={option.id} value={option.head_name}>
                    {option.head_name}
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
            {account ? "Update Account" : "Save Account"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
