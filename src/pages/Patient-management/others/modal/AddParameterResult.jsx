import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { Editor } from "@tinymce/tinymce-react";

export default function AddParameterResult({ showParameterResult, setShowParameterResult, patientParameterRes }) {
    const [selectedPatientObj, setSelectedPatientObj] = useState();
    const [allTestOfPatient, setAllTestOfPatient] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [testParameters, setTestParameters] = useState([]);
    const [testProfileId, setTestProfileId] = useState(null);
    const [testType, setTestType] = useState("");


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
        const selectedTest = allTestOfPatient.find(t => t.test_profile_id == selectedTestId);

        try {
            const url = `/patient_entry/test_parameters/${selectedTestId}/${selectedPatientObj.id}/${selectedTest.test_type}`;
            const response = await httpClient.get(url);
            if (response) {
                setTestType(response.test_type);
                setTestParameters(response.parameters);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // parameters input handler 
    const Parameterhandler = (parameterId, event) => {
        const { name, value } = event.target;


        setTestParameters((prev) =>
            prev.map((param) => {
                if (param.id === parameterId) {
                    return {
                        ...param,
                        [name]: value
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
                result_value: parameter.default_value,
                cutoff_value: parameter.cutoff_value
            }
            parameters.push(obj)
        })

        const patientTestId = allTestOfPatient.find(it => it.test_profile_id == testProfileId);
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
        <Modal show={showParameterResult} size="xl">
            <Modal.Header className="primary">
                <Modal.Title className="color-white fw-bold">{patientParameterRes?.patient_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <p>Patient Name:  {selectedPatientObj?.patient_name || "--"}</p>
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
                <div>
                    {testType &&
                        <>
                            <Row className="text-secondary mb-2 pb-1 border-bottom">
                                {
                                    (testType === "four columns" || testType === "three columns" || testType === "two columns") &&
                                    <Col md={3}>Parameter Name</Col>
                                }

                                {
                                    (testType === "four columns" || testType === "three columns" || testType === "two columns" || testType === "editor") &&
                                    <Col md={3}>Result Value</Col>
                                }

                                {
                                    (testType === "three columns") &&
                                    <Col md={3}>Cutoff Value</Col>
                                }

                                {
                                    (testType?.serology_elisa == "four columns") &&
                                    <Col md={3}>Normal Range</Col>
                                }
                                {
                                    (testType === "four columns") &&
                                    <Col md={3}>Unit</Col>
                                }
                            </Row>

                            {testParameters?.map((parameter) => (
                                <div key={parameter.id} className="mb-3">
                                    {parameter.input_type === "editor" ? (
                                        <>
                                            <Row className="align-items-center mb-2">
                                                {
                                                    (testType === "four columns" || testType === "three columns" || testType === "two columns") &&
                                                    <Col md={3}>
                                                        <Form.Label className="fw-bold">{parameter.parameter_name}</Form.Label>
                                                    </Col>
                                                }

                                            </Row>
                                            {
                                                testType === "editor" &&
                                                <Editor
                                                    apiKey="l36hqr3x3exo3ohxmszz3lit1q94beevttx3t5w3q0qplcqr"
                                                    value={parameter.default_value}
                                                    init={{
                                                        height: 250,
                                                        menubar: false,
                                                        plugins: "link image code lists",
                                                        toolbar:
                                                            "undo redo | formatselect | bold italic underline | " +
                                                            "alignleft aligncenter alignright | bullist numlist | " +
                                                            "link image | code",
                                                        forced_root_block: "",
                                                    }}
                                                    onEditorChange={(content) =>
                                                        setTestParameters((prev) =>
                                                            prev.map((param) =>
                                                                param.id === parameter.id
                                                                    ? { ...param, default_value: content }
                                                                    : param
                                                            )
                                                        )
                                                    }
                                                />
                                            }
                                        </>
                                    ) : (
                                        <Row className="align-items-center mb-2">
                                            {
                                                (testType === "four columns" || testType === "three columns" || testType === "two columns") &&
                                                <Col md={3}>
                                                    <Form.Label className="fw-bold">{parameter.parameter_name}</Form.Label>
                                                </Col>
                                            }

                                            {
                                                (testType === "four columns" || testType === "three columns" || testType === "two columns" || testType === "editor") &&
                                                <Col md={3}>

                                                    <Form.Control
                                                        as={parameter.input_type === "textarea" ? "textarea" : "input"}
                                                        rows={parameter.input_type === "textarea" ? 3 : undefined}
                                                        name="default_value"
                                                        placeholder={`Enter ${parameter.parameter_name}`}
                                                        value={parameter.default_value}
                                                        onChange={(e) => Parameterhandler(parameter.id, e)}
                                                    />
                                                </Col>
                                            }
                                            {
                                                (testType === "three columns") &&
                                                <Col md={3}>
                                                    <Form.Control
                                                        type="text"
                                                        name="cutoff_value"
                                                        placeholder={`Enter ${parameter.parameter_name} cutoff value`}
                                                        value={parameter.cutoff_value}
                                                        onChange={(e) => Parameterhandler(parameter.id, e)}
                                                    />
                                                </Col>
                                            }
                                            {
                                                (testType === "four columns") &&
                                                <Col md={3}>
                                                    <span className="text-secondary">{parameter.unit || "--"}</span>
                                                </Col>
                                            }
                                        </Row>
                                    )}
                                </div>
                            ))}
                        </>
                    }
                </div>

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