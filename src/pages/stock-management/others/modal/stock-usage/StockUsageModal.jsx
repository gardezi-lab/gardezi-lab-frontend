import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import httpClient from "../../../../../services/httpClient";

export default function StockUsageModal({ onSave, stock, onCancel }) {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemOptions, setItemOptions] = useState([]);

  // Fetch vendor and item data for dropdowns
  const getDropdownData = async () => {
    try {
      const [itemsRes] = await Promise.all([
        httpClient.get("/stock_items"),
      ]);

      setItemOptions(itemsRes.data);
    } catch (err) {
      console.error("Dropdown Fetch Error:", err);
    }
  };



  useEffect(() => {
    getDropdownData();

    // Pre-fill data when editing
    if (stock) {
      setItemId(stock.stock_item_id || "");
      setQuantity(stock.qty || "");
    } else {
      setItemId("");
      setQuantity("");
    }
  }, [stock]);

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Correct object using selected IDs
    const obj = {
      stock_item_id: itemId,
      qty: quantity,
    };

    console.log("Submitted Object:", obj);
    onSave(obj);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Item Dropdown */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Stock Item</Form.Label>
              <Form.Select
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                required
              >
                <option value="">Select Item</option>
                {itemOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button className="secondary" variant="secondary" onClick={onCancel}>
            Cancel & Close
          </Button>
          <Button className="primary" variant="primary" type="submit">
            {stock ? "Update Stock" : "Save"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}







// api all time - each api call per time ae. discuss that time. Murtaza Shoaib.

// invoice in pdf complete.
// report in pdf complete. Murtaza Shoaib.
// ye pdf jo create ho rhe hen ye system and server per kia effect kren ge.

// test performance. - jo test perform kr rha he kia uska name patient test me ja rha he.
// same while patient test first time perform hoa to pat test me wo time jae.ta k pata haley  kitney time me hoa. hamko ture me es timeline ki zarort parni he.


// Dashboard Graphs
// Sale report last seven days sale report. total cash.
// Reception wiase report. 7 days. same like above k us ne kitney collection ki he.
// Expense report. last seven days k us ne kitni expense kiye hen.
// Tech graph. today kis tech ne kitney perform kiye hen.


// roles and access ko complete krna he.

// trial balance.
// balance sheet.

// dashboard - 9-3 first graph hon and 3 per log report show hon.

// business report.