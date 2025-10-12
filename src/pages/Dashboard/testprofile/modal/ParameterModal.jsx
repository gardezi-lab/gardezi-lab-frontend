import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import ParameterTable from "../table/ParameterTable";
import httpClient from "../../../../services/httpClient";

export default function ParameterModal({ test, onClose }) {
    const [parameterList, setParameterList] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [paramError, setParamError] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        parameter_name: "",
        sub_heading: "",
        input_type: "2",
        unit: "",
        normalvalue: "",
        default_value: "",
    });

    // Fetch Parameters
    const getParameters = async () => {
        if (!test?.id) return;
        setLoading(true);
        try {
            const response = await httpClient.get(`/parameter/test_parameters/${test.id}`);
            // handle both { parameters: [...] } or direct array response
            const data = response?.data ? response.data : response;
            const params = Array.isArray(data?.parameters) ? data.parameters : Array.isArray(data) ? data : [];
            setParameterList(params);
        } catch (err) {
            console.error("Fetch parameters error:", err);
            setParameterList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (test?.id) getParameters();
    }, [test]);

    // -----------------------------
    // Form Handling
    // -----------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "parameter_name") setParamError("");
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!test?.id) return;
        setParamError("");
        setSaving(true);

        try {
            const payload = { ...formData, test_profile_id: test.id };
            if (editItem) {
                await httpClient.put(`/parameter/${editItem.parameter_id}`, payload);
            } else {
                await httpClient.post(`/parameter/${test.id}`, payload);
            }

            resetForm();
            await getParameters();
        } catch (err) {
            console.error("Save parameter error:", err.response?.data || err);
            const errorMsg =
                err?.response?.data?.error ||
                "Something went wrong while saving parameter.";
            setParamError(errorMsg);
        } finally {
            setSaving(false);
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
            await getParameters();
        } catch (err) {
            console.error("Delete parameter error:", err);
        }
    };

    return (
        <Container>
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
                            <Form.Select
                                name="input_type"
                                value={formData.input_type}
                                onChange={handleChange}
                            >
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
                            <Form.Control
                                type="text"
                                name="unit"
                                placeholder="Unit"
                                value={formData.unit}
                                onChange={handleChange}
                            />
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
                                name="normalvalue"
                                placeholder="Technique details of test"
                                value={formData.normalvalue}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? (
                            <>
                                <Spinner animation="border" size="sm" />{" "}
                                {editItem ? "Updating..." : "Submitting..."}
                            </>
                        ) : editItem ? (
                            "Update"
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </div>
            </Form>

            <h6 className="mt-4">Parameter List</h6>
            <ParameterTable
                ParameterList={parameterList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
            />
        </Container>
    );
}
