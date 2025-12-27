import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";

export default function CPVModal({ onSave, onCancel }) {
  const [date, setDate] = useState("");
  const [narration, setNarration] = useState("");
  const [accountHead, setAccountHead] = useState("");
  const [dr, setDr] = useState("");
  const [entries, setEntries] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [totalDr, setTotalDr] = useState(0);
  const [totalCr, setTotalCr] = useState(0);

  // ===========================
  // Fetch Accounts
  // ===========================
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await httpClient.get("/accounts");
        setAccountList(res?.data ?? []);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };
    fetchAccounts();
  }, []);

  // ===========================
  // Calculate Totals
  // ===========================
  useEffect(() => {
    const drSum = entries.reduce((sum, e) => sum + parseFloat(e.dr || 0), 0);
    const crSum = entries.reduce((sum, e) => sum + parseFloat(e.cr || 0), 0);
    setTotalDr(drSum);
    setTotalCr(crSum);
  }, [entries]);

  // ===========================
  // Add Entry
  // ===========================
  const handleAddEntry = () => {
    if (!accountHead || !dr) return alert("Please fill Account Head and Debit amount");

    const selected = accountList.find(acc => acc.id === parseInt(accountHead));

    setEntries(prev => [
      ...prev,
      {
        account_head_id: accountHead,
        name_head: selected?.name_head || "",
        dr: parseFloat(dr),
        cr: 0,
      },
    ]);

    setAccountHead("");
    setDr("");
  };

  // ===========================
  // Remove Entry
  // ===========================
  const handleRemove = index => setEntries(entries.filter((_, i) => i !== index));

  // ===========================
  // Submit
  // ===========================
  const handleSubmit = async e => {
    e.preventDefault();
    if (!date || !narration || entries.length === 0)
      return alert("Please fill all fields");

    // find default cash account
    const cashAccount = accountList.find(acc =>
      acc.name_head.toLowerCase().includes("cash")
    );

    if (!cashAccount) {
      return alert("Cash account not found!");
    }

    // sum of all debits
    const totalDebit = entries.reduce((sum, e) => sum + parseFloat(e.dr || 0), 0);

    // create final entries with automatic cash credit
    const finalEntries = [
      ...entries,
      {
        account_head_id: cashAccount.id,
        name_head: cashAccount.name_head,
        dr: 0,
        cr: totalDebit,
      },
    ];

    const formData = {
      date,
      narration,
      voucher_type: "CPV",
      entries: finalEntries,
    };

    try {
      await onSave(formData);
      setDate("");
      setNarration("");
      setEntries([]);
    } catch (err) {
      console.error("Error saving voucher:", err);
    }
  };

  // ===========================
  // JSX
  // ===========================
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                disabled={saving}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Narration</Form.Label>
              <Form.Control
                type="text"
                value={narration}
                onChange={e => setNarration(e.target.value)}
                placeholder="Enter narration"
                disabled={saving}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="align-items-end">
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Account Head</Form.Label>
              <Form.Select
                value={accountHead}
                onChange={e => setAccountHead(e.target.value)}
                disabled={saving}
              >
                <option value="">-- Select Account --</option>
                {accountList.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name_head}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Debit (DR)</Form.Label>
              <Form.Control
                type="number"
                value={dr}
                onChange={e => setDr(e.target.value)}
                placeholder="0.00"
                disabled={saving}
              />
            </Form.Group>
          </Col>

          <Col>
            <Button
              className="btn primary fw-bold mb-3"
              type="button"
              onClick={handleAddEntry}
              disabled={saving}
            >
              <i className="fa fa-plus"></i>
            </Button>
          </Col>
        </Row>

        {entries.length > 0 && (
          <Table bordered hover size="sm" className="mt-3">
            <thead>
              <tr className="text-center">
                <th>Account Head</th>
                <th>Debit (DR)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={i} className="text-center">
                  <td>{entry.name_head}</td>
                  <td>{entry.dr.toFixed(2)}</td>
                  <td
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleRemove(i)}
                  >
                    ✕
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="text-center fw-bold">
                <td>Total</td>
                <td>{totalDr.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
        )}

        <hr />
        <div className="d-flex justify-content-end gap-2 align-items-center">
          <Button variant="secondary" className="secondary" onClick={onCancel} disabled={saving}>
             Cancel & Close
          </Button>
          <Button variant="primary" className="primary" type="submit">
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Saving...
              </>
            ) : (
              "Save "
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
