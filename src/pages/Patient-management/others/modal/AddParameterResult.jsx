import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';

export default function AddParameterResult({ showParameterResult, setShowParameterResult, patientParameterRes }) {
    const [selectedPatientObj, setSelectedPatientObj] = useState();
    const [allTestOfPatient, setAllTestOfPatient] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [testParameters, setTestParameters] = useState([]);
    const [testProfileId, setTestProfileId] = useState(null);

    const handleParameterClose = () => {
        setShowParameterResult(false);
    };

    // get all tests of patient
    const getAllTestsOfPatient = async (patientObj) => {
        // selected parameter UI reset when open modal
        setTestParameters([]);
        try {
            const patientId = patientObj?.id;
            const url = `/patient_entry/tests/${patientId}`;
            const response = await httpClient.get(url);
            if (response) {
                setAllTestOfPatient(response.tests);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // test select handler
    const handleSlectedTest = async (selectedTestId) => {
        setTestProfileId(selectedTestId);

        try {
            const url = `/patient_entry/test_parameters/${selectedTestId}/${selectedPatientObj.id}`;
            const response = await httpClient.get(url);
            if (response) {
                setTestParameters(response.parameters);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // parameters input handler 
    const Parameterhandler = (parameterId, event) => {
        setTestParameters((prev) =>
            prev.map((param) => {
                if (param.id === parameterId) {
                    return {
                        ...param,
                        default_value: event.value,
                    };
                }
                return param;
            })
        );
    }


    const handleSaveParameter = async () => {
        const parameters = [];

        const newarray = testParameters.map((parameter) => {
            const obj = {
                parameter_id: parameter.id,
                result_value: parameter.default_value
            }
            parameters.push(obj)
        })
        console.log("testProfileId", testProfileId)
        debugger
        const patientTestId = allTestOfPatient.find(it => it.test_profile_id == testProfileId);
        debugger
        console.log("patientTestId", patientTestId)
        const parameterObj = {
            patient_id: selectedPatientObj.id,
            test_profile_id: testProfileId,
            parameters: parameters
        }

        try {
            const url = `/patient_entry/test_results/${patientTestId.patient_test_id}`;
            const response = await httpClient.post(url, parameterObj);
        } catch (error) {
            console.log("error", error)
        } finally {
            handleParameterClose();
        }

    };


    useEffect(() => {
        const patientObject = patientParameterRes;
        setSelectedPatientObj(patientObject);
        getAllTestsOfPatient(patientObject);
    }, [showParameterResult])

    return (
        <Modal show={showParameterResult} >
            <Modal.Header className="primary">
                <Modal.Title className="color-white fw-bold">{patientParameterRes?.patient_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <p>Patient Name:   {selectedPatientObj?.patient_name || "--"}</p>
                </div>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Select Test</Form.Label>
                    <Form.Select
                        value={selectedTest}
                        onChange={(e) => handleSlectedTest(e.target.value)}
                    >
                        <option value="">-- Select Test --</option>
                        {allTestOfPatient?.map((test) => (
                            <option key={test.patient_test_id} value={test.test_profile_id}>
                                {test.test_name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {
                    testParameters?.map((parameter) => {
                        return (
                            <>
                                <Row key={parameter.id} className="align-items-center mb-3">
                                    <Col md={4}>
                                        <Form.Label className="mb-0 fw-semibold">{parameter.parameter_name}</Form.Label>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Control
                                            type="text"
                                            name="parametersValue"
                                            placeholder={`Enter ${parameter.parameter_name}`}
                                            value={parameter.default_value}
                                            onChange={(e) => Parameterhandler(parameter.id, e.target)}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Form.Control
                                            type="text"
                                            name="parametersValue"
                                            placeholder={`Enter ${parameter.parameter_name}`}
                                            value={parameter.default_value}
                                            onChange={(e) => Parameterhandler(parameter.id, e.target)}
                                        />
                                    </Col>

                                    <Col md={2}>
                                        <span className="text-secondary">{parameter.unit || "--"}</span>
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }

            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" className="secondary" onClick={handleParameterClose}>
                    Close
                </Button>
                <Button variant="primary" className="primary" onClick={handleSaveParameter} >
                    Save Changes
                </Button>
            </Modal.Footer>

        </Modal>
    )
}