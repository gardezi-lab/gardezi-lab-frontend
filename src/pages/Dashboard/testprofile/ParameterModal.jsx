import { useEffect, useState } from "react";
import { Button, Form, Table, Container, Row, Col, Pagination } from "react-bootstrap";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import httpClient from "../../../services/httpClient";

export default function ParameterModal({ test, onClose }) {
    const [parameterList, setParameterList] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;

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
        if (!test?.id) {
            console.log("No test.id found yet");
            return;
        }
        setLoading(true);
        console.log("Fetching parameters for test id:", test.id);
        try {
            const response = await httpClient.get(`/parameter/${test.id}`);
            const params = Array.isArray(response.data || response) ? (response.data || response) : [response];
            setParameterList(params);
            setTotalPages(Math.ceil(params.length / recordPerPage));
        } catch (err) {
            console.error("Fetch parameters error:", err);
            setParameterList([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        setPage(1); // Reset page when test changes
    }, [test]);

    useEffect(() => {
        if (test?.id) getParameters();
    }, [test, page]);

    // -----------------------------
    // Form Handling
    // -----------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, test_profile_id: test.id };
            if (editItem) {
                await httpClient.put(`/parameter/${editItem.id}`, payload);
            } else {
                await httpClient.post(`/parameter/${test.id}`, payload);
            }
            resetForm();
            getParameters();
        } catch (err) {
            console.error("Save parameter error:", err);
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
    const renderPaginationItems = () => {
        let items = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            items.push(
                <Pagination.Item key={1} active={page === 1} onClick={() => setPage(1)}>
                    1
                </Pagination.Item>
            );
            if (page > 3) items.push(<Pagination.Ellipsis key="start-ellipsis" />);
            if (page > 2 && page < totalPages - 1) {
                items.push(
                    <Pagination.Item key={page} active onClick={() => setPage(page)}>
                        {page}
                    </Pagination.Item>
                );
            }
            if (page < totalPages - 2) items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            items.push(
                <Pagination.Item key={totalPages} active={page === totalPages} onClick={() => setPage(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            );
        }
        return items;
    };

    // Slice data for pagination
    const paginatedParameters = parameterList.slice((page - 1) * recordPerPage, page * recordPerPage);

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
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Order</th>
                        <th>Dropdowns</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedParameters.length > 0 ? (
                        paginatedParameters.map((item, index) => (
                            <tr key={item.id}>
                                <td>{(page - 1) * recordPerPage + index + 1}</td>
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
                                            onClick={() => handleDelete(item.id)}
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

            {/* Pagination & Export */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Button variant="secondary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </Button>
                <Pagination>
                    <Pagination.Prev onClick={() => page > 1 && setPage(page - 1)} disabled={page === 1} />
                    {renderPaginationItems()}
                    <Pagination.Next onClick={() => page < totalPages && setPage(page + 1)} disabled={page === totalPages} />
                </Pagination>
            </div>

            {/* Close Button */}
            <div className="d-flex justify-content-end mt-2">
                <Button variant="secondary" onClick={handleCancel}>
                    Close
                </Button>
            </div>
        </Container>
    );
}
