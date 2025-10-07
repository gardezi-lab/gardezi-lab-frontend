import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import httpClient from "../../../services/httpClient";

export default function TestProfilesModal({ onSave, TestProfile, onCancel, existingTests }) {
    const [departments, setDepartments] = useState([]);
    const [interpretations, setInterpretations] = useState([]);
    const [error, setError] = useState("");

    // ✅ Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await httpClient.get("/department");
                const deptList = res?.data?.data || res?.data || res;
                setDepartments(Array.isArray(deptList) ? deptList : []);
            } catch (err) {
                console.error("Error fetching departments:", err);
            }
        };
        fetchDepartments();
    }, []);

    // ✅ Fetch interpretations
    useEffect(() => {
        const fetchInterpretations = async () => {
            try {
                const res = await httpClient.get("/interpretations");
                setInterpretations(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching interpretation:", err);
            }
        };
        fetchInterpretations();
    }, []);

    // ✅ Form state
    const [formData, setFormData] = useState({
        test_name: "",
        test_code: "",
        sample_required: "",
        select_header: "",
        department_id: "",
        fee: "",
        delivery_time: "",
        serology_elisa: "",
        interpretation: "",
        unit_ref_range: true,
        test_formate: true
    });

    // ✅ When editing test
    useEffect(() => {
        if (TestProfile) {
            const selectedDept = departments.find(
                (d) => d.department_name === TestProfile.select_header
            );
            setFormData({
                test_name: TestProfile.test_name || "",
                test_code: TestProfile.test_code || "",
                sample_required: TestProfile.sample_required || "",
                select_header: TestProfile.select_header || "",
                department_id: selectedDept ? selectedDept.id : TestProfile.department_id || "",
                fee: TestProfile.fee || "",
                delivery_time: TestProfile.delivery_time || "",
                serology_elisa: TestProfile.serology_elisa || "",
                interpretation: TestProfile.interpretation || "",
                unit_ref_range: !!TestProfile.unit_ref_range,
                test_formate: !!TestProfile.test_formate
            });
        }
    }, [TestProfile, departments]);

    // ✅ Handle all field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "department_id") {
            const selectedDept = departments.find(d => d.id == value);
            setFormData({
                ...formData,
                department_id: selectedDept ? selectedDept.id : "",
                select_header: selectedDept ? selectedDept.department_name : ""
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value.trimStart()
            });
        }
    };


    // ✅ Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.test_name.trim() || !formData.test_code.trim()) {
            setError("Test Name and Test Code cannot be empty.");
            return;
        }
        // ✅ Make sure department_id is properly set before saving
        const selectedDept = departments.find(d => d.id == formData.department_id);
        const payload = {
            ...formData,
            department_id: selectedDept ? selectedDept.id : "",
            select_header: selectedDept ? selectedDept.department_name : formData.select_header
        };

        if (!payload.department_id) {
            setError("Please select a valid department.");
            return;
        }

        setError("");
        onSave(payload);
    };


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Test Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="test_name"
                                value={formData.test_name}
                                onChange={handleChange}
                                placeholder="Will Show on Report"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Test Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="test_code"
                                value={formData.test_code}
                                onChange={handleChange}
                                placeholder="For search short code"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Sample Required</Form.Label>
                            <Form.Control
                                type="text"
                                name="sample_required"
                                value={formData.sample_required}
                                onChange={handleChange}
                                placeholder="Sample Required"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select
                                name="department_id"
                                value={formData.department_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.department_name}
                                    </option>
                                ))}
                            </Form.Select>

                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Fee</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Test Fee"
                                name="fee"
                                value={formData.fee}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Time</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Delivery time in hr"
                                name="delivery_time"
                                value={formData.delivery_time}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Serology Elisa</Form.Label>
                            <Form.Select
                                name="serology_elisa"
                                value={formData.serology_elisa}
                                onChange={handleChange}
                            >
                                <option>Select One</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Interpretation</Form.Label>
                            <Form.Select
                                name="interpretation"
                                value={formData.interpretation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Interpretation</option>
                                {interpretations.map((inter) => (
                                    <option key={inter.id} value={inter.heading}>
                                        {inter.heading}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* ✅ Checkbox Row 1 */}
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            id="checkbox1"
                            name="unit_ref_range"
                            label="Check It For No Unit No Refference Range"
                            checked={formData.unit_ref_range}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                {/* ✅ Checkbox Row 2 */}
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            id="checkbox2"
                            name="widal_format_change"
                            label="Check box for test like WIDAL and Other test types whose formate change"
                            checked={formData.test_formate}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                {error && <p className="text-danger">{error}</p>}

                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel & Close
                    </Button>
                    <Button variant="primary" type="submit">
                        {TestProfile ? "Update" : "Save"}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
