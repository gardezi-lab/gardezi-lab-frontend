import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Select from 'react-select';
import { ReactSelectStyles } from '../../../../Patient-management/others/utils/ReactSelectStyles'


export default function TestPackageModal({ onSave, TestPackage, onCancel, testProfiles }) {
    const customStyles = ReactSelectStyles();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        selected_test: [],
    });
    // useEffect(() => {
    //     if (TestPackage) {
    //         setFormData({
    //             name: TestPackage.name || "",
    //             price: TestPackage.price || "",
    //             selected_test: TestPackage.selected_test.label,
    //         });
    //     } else {
    //         setFormData({
    //             name: "",
    //             price: "",
    //             selected_test: "",
    //         });
    //     }
    //     console.log("formData", formData)
    // }, [TestPackage]);
    useEffect(() => {
        if (TestPackage) {
            const selectedTestIds = TestPackage.selected_test
                ? TestPackage.selected_test.split(",").map(id => parseInt(id))
                : [];

            // Match IDs with testProfiles list
            const preSelectedTests = testProfiles
                .filter(test => selectedTestIds.includes(test.id))
                .map(test => ({
                    value: test.id,
                    id: test.id,
                    label: test.test_name,
                    name: test.test_name,
                    takenSample: test.sample_required,
                    testDeliveryTime: test.delivery_time,
                    testFee: test.fee
                }));

            setFormData({
                name: TestPackage.name || "",
                price: TestPackage.price || "",
                selected_test: preSelectedTests,
            });
        } else {
            setFormData({
                name: "",
                price: "",
                selected_test: [],
            });
        }
    }, [TestPackage, testProfiles]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            selected_test: formData.selected_test.map(test => test.id)
        };
        onSave(payload);
    };

    const handleSelectChange = (selectedOptions) => {
        setFormData({
            ...formData,
            selected_test: selectedOptions || []
        });
    };
    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label> Name</Form.Label>
                                <Form.Control
                                    type="Text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Package name"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Fee</Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="Package Fee"
                                    name="price"

                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Selected Test</Form.Label>
                                <Select
                                    isMulti
                                    placeholder="Select Test"
                                    name="selected_test"
                                    value={formData.selected_test}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, "patientTest")}
                                    options={testProfiles.map((test) => ({
                                        value: test.id,
                                        id: test.id,
                                        name: test.test_name,
                                        label: test.test_name,
                                        takenSample: test.sample_required,
                                        testDeliveryTime: test.delivery_time,
                                        testFee: test.fee
                                    }))}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={customStyles}
                                />

                            </Form.Group>
                        </Col>
                    </Row>



                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" className='secondary' onClick={onCancel}>
                            Cancel & Close
                        </Button>
                        <Button variant="primary" className='primary' type="submit">
                            {TestPackage ? "Update" : "Save"}
                        </Button>
                    </div>
                </Form>
            </Container >
        </>
    )
}