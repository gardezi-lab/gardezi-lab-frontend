import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import httpClient from "../../../../../services/httpClient";

export default function StockPurchaseModal({ onSave, stock, onCancel }) {
  const [vendorId, setVendorId] = useState("");
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  // const [vendorOptions, setVendorOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);

  // Fetch vendor and item data for dropdowns
  const getDropdownData = async () => {
    try {
      const [vendorsRes, itemsRes] = await Promise.all([
        httpClient.get("/liabilities"),
        httpClient.get("/stock_items"),
      ]);

      // setVendorOptions(vendorsRes || []);
      setItemOptions(itemsRes.data);
    } catch (err) {
      console.error("Dropdown Fetch Error:", err);
    }
  };


  useEffect(() => {
    getDropdownData();

    // Pre-fill data when editing
    if (stock) {
      // setVendorId(stock.vendor_id || "");
      setItemId(stock.stock_item_id || "");
      setQuantity(stock.qty || "");
      setUnitPrice(stock.price || "");
    } else {
      setVendorId("");
      setItemId("");
      setQuantity("");
      setUnitPrice("");
    }
  }, [stock]);

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Correct object using selected IDs
    const obj = {
      // vendor_id: vendorId,
      stock_item_id: itemId,
      qty: quantity,
      price: unitPrice,
    };

    console.log("Submitted Object:", obj);
    onSave(obj);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Vendor Dropdown */}
          {/* <Col>
            <Form.Group className="mb-3">
              <Form.Label>Vendor</Form.Label>
              <Form.Select
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                required
              >
                <option value="">Select Vendor</option>
                {vendorOptions?.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name_head}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col> */}

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
                {itemOptions?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}

              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Quantity & Price Fields */}
        <Row>
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

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter unit price"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
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
