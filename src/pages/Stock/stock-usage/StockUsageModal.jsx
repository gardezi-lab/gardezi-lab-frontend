import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import httpClient from "../../../services/httpClient";

export default function StockPurchaseModal({ onSave, stock, onCancel }) {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemOptions, setItemOptions] = useState([]);

  // Fetch vendor and item data for dropdowns
  const getDropdownData = async () => {
    try {
      const [itemsRes] = await Promise.all([
        httpClient.get("/stock_items"),
      ]);

      console.log("Items Response:", itemsRes);

      setItemOptions(itemsRes || []);
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
          <Button variant="secondary" onClick={onCancel}>
            Cancel & Close
          </Button>
          <Button variant="primary" type="submit">
            {stock ? "Update Stock" : "Submit Stock"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
