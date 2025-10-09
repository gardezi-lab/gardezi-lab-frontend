import { useEffect, useState } from "react";
import { Button, Form, Table, Container, Row, Col, Pagination } from "react-bootstrap";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import httpClient from "../../../services/httpClient";

export default function ParameterModal({ test, onClose }) {
    const [parameterList, setParameterList] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [paramError, setParamError] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        parameter_name: "",
        sub_heading: "",
        input_type: "2",
        unit: "",
        normalvalue: "",
        default_value: "",
    });
    // -----------------------------
    // Fetch Parameters
    // -----------------------------
    const getParameters = async () => {
        if (!test?.id) return;
        setLoading(true);
        try {
            const response = await httpClient.get(`/parameter/by_profile/${test.id}`);
            console.log("📦 Full Axios Response:", response);

            // ✅ Handle if API returns raw JSON instead of { data: {...} }
            const data = response?.data ? response.data : response;
            const params = Array.isArray(data?.parameters) ? data.parameters : [];

            console.log("✅ Final parameter list to set:", params);
            setParameterList(params);
        } catch (err) {
            console.error("❌ Fetch parameters error:", err);
            setParameterList([]);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        console.log(" Test passed to modal:", test);
        if (test?.id) getParameters();
    }, [test]);


    // -----------------------------
    // Form Handling
    // -----------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "parameter_name") {
            setParamError(""); // clear message while typing again
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setParamError("");

        try {
            const payload = { ...formData, test_profile_id: test.id };

            if (editItem) {
                // Update existing parameter
                await httpClient.put(`/parameter/${editItem.parameter_id}`, payload);
            } else {
                // Create new parameter for test profile
                await httpClient.post(`/parameter/${test.id}`, payload);
            }

            resetForm();
            getParameters();
        } catch (err) {
            console.error("Save parameter error:", err.response?.data || err);
            const errorMsg = err?.response?.data?.error || "Something went wrong while saving parameter.";
            setParamError(errorMsg);
        }
    };



    const resetForm = () => {
        setEditItem(null);
        setFormData({
            parameter_name: "",
            sub_heading: "",
            input_type: "2",
            unit: "",
            normalvalue: "",
            default_value: "",
        });
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setFormData({
            parameter_name: item.parameter_name,
            sub_heading: item.sub_heading,
            input_type: item.input_type,
            unit: item.unit,
            normalvalue: item.normalvalue,
            default_value: item.default_value,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this parameter?")) return;
        try {
            await httpClient.delete(`/parameter/${id}`);
            getParameters();
        } catch (err) {
            console.error("Delete parameter error:", err);
        }
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    // -----------------------------
    // Pagination Rendering
    // -----------------------------

    // Slice data for pagination

    return (
        <Container>
            {/* Form Section */}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Parameter Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="parameter_name"
                                placeholder="Parameter Name"
                                value={formData.parameter_name}
                                onChange={handleChange}
                                required
                            />
                            {paramError && (
                                <small className="text-danger mt-1 d-block">{paramError}</small>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Sub Heading</Form.Label>
                            <Form.Control
                                type="text"
                                name="sub_heading"
                                placeholder="Sub Heading"
                                value={formData.sub_heading}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Input Type</Form.Label>
                            <Form.Select name="input_type" value={formData.input_type} onChange={handleChange}>
                                <option value="2">Input</option>
                                <option value="3">Textarea</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control type="text" name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Default Value</Form.Label>
                            <Form.Control
                                type="text"
                                name="default_value"
                                placeholder="Write here"
                                value={formData.default_value}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Normal Value</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="normalvalue" // fixed name
                                placeholder="Technique details of test"
                                value={formData.normalvalue} // fixed value
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2">
                    <Button variant="primary" type="submit">
                        {editItem ? "Update" : "Submit"}
                    </Button>
                </div>
            </Form>

            {/* Parameter List */}
            <h6 className="mt-4">Parameter List</h6>
            <Table bordered hover size="sm">
                <thead style={{ background: "#f8f9fa" }}>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Sr.</th>
                        <th>Name</th>
                        <th>Order</th>
                        <th>Dropdowns</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {parameterList.length > 0 ? (
                        parameterList.map((item, index) => (
                            <tr key={item.parameter_id}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td>{item.parameter_name}</td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div className="d-flex gap-2 align-items-center justify-content-center">
                                        <FaPenToSquare
                                            onClick={() => handleEdit(item)}
                                            style={{ fontSize: "22px", cursor: "pointer" }}
                                        />
                                        <FaRegTrashCan
                                            onClick={() => handleDelete(item.parameter_id)}
                                            style={{ fontSize: "22px", cursor: "pointer", color: "red" }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                {loading ? "Loading..." : "No Parameters Found"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Close Button */}
            <div className="d-flex justify-content-end mt-2">
                <Button variant="secondary" onClick={handleCancel}>
                    Close
                </Button>
            </div>
        </Container>
    );
}
