import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import httpClient from "../../../services/httpClient";

export default function CRVModal({ onSave, onCancel }) {
  const [date, setDate] = useState("");
  const [narration, setNarration] = useState("");
  const [accountHead, setAccountHead] = useState("");
  const [cr, setCr] = useState("");
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


  // Calculate Totals
  useEffect(() => {
    const drSum = entries.reduce((sum, e) => sum + parseFloat(e.dr || 0), 0);
    const crSum = entries.reduce((sum, e) => sum + parseFloat(e.cr || 0), 0);
    setTotalDr(drSum);
    setTotalCr(crSum);
  }, [entries]);

  // Add Entry
  const handleAddEntry = () => {
    if (!accountHead || !cr)
      return alert("Please fill Account Head and Credit amount");

    const selected = accountList.find(acc => acc.id === parseInt(accountHead));

    setEntries(prev => [
      ...prev,
      {
        account_head_id: accountHead,
        name_head: selected?.name_head || "",
        dr: 0,
        cr: parseFloat(cr),
      },
    ]);

    setAccountHead("");
    setCr("");
  };


  // Remove Entry
  const handleRemove = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !narration || entries.length === 0)
      return alert("Please fill all fields");

    // if (totalDr !== totalCr)
    //   return alert("Debit and Credit totals must be equal");

    const formData = {
      date,
      narration,
      voucher_type: "CRV",
      entries: entries.map((e) => ({
        account_head_id: e.account_head_id,
        dr: e.dr,
        cr: e.cr,
      })),
    };

    try {
      // setSaving(true); // show spinner / disable buttons
      await onSave(formData);
      //reset after parent is done
      setDate("");
      setNarration("");
      setEntries([]);
    } catch (err) {
      console.error("Error saving voucher:", err);
    } finally {
      // setSaving(false);
    }
  };

  // JSX
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
                onChange={(e) => setDate(e.target.value)}
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
                onChange={(e) => setNarration(e.target.value)}
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
                onChange={(e) => setAccountHead(e.target.value)}
                disabled={saving}
              >
                <option value="">-- Select Account --</option>
                {accountList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name_head}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          {/* <Col>
            <Form.Group className="mb-3">
              <Form.Label>Debit (DR)</Form.Label>
              <Form.Control
                type="number"
                value={dr}
                onChange={(e) => setDr(e.target.value)}
                placeholder="0.00"
                disabled={saving}
              />
            </Form.Group>
          </Col> */}

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Credit (CR)</Form.Label>
              <Form.Control
                type="number"
                value={cr}
                onChange={(e) => setCr(e.target.value)}
                placeholder="0.00"
                disabled={saving}
              />
            </Form.Group>
          </Col>

          <Col>
            <Button
              className="btn btn-primary fw-bold mb-3 primary"
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
                {/* <th>Debit (DR)</th> */}
                <th>Credit (CR)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr
                  key={i}
                  className="text-center"
                  // style={{
                  //   backgroundColor:
                  //     totalDr !== totalCr ? "rgba(255,0,0,0.1)" : "transparent",
                  // }}
                >
                  <td>{entry.name_head}</td>
                  {/* <td>{entry.dr.toFixed(2)}</td> */}
                  <td>{entry.cr.toFixed(2)}</td>
                  <td
                    style={{ cursor: "pointer", color: "red", }}
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
                {/* <td>{totalDr.toFixed(2)}</td> */}
                <td>{totalCr.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
        )}


        <hr />
        <div className="d-flex justify-content-end gap-2 align-items-center">


          <Button variant="secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            // disabled={saving || totalDr !== totalCr}
          >
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Saving...
              </>
            ) : (
              "Save Voucher"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
