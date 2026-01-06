import { useState, useEffect, use } from "react";
import httpClient from "../../../../services/httpClient";
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Select from 'react-select';

export default function ParameterResult({ showParameterResult, setShowParameterResult, patientParameterRes }) {
    const [selectedPatientObj, setSelectedPatientObj] = useState();
    const [allTestOfPatient, setAllTestOfPatient] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [testParameters, setTestParameters] = useState([]);
    const [testProfileId, setTestProfileId] = useState(null);
    const [testType, setTestType] = useState("");
    const [comments, setComments] = useState("");
    const [verify, setVerify] = useState("");
    const [isVerifybtn, setIsverifyBtn] = useState(false);
    const [file, setFile] = useState([]);
    const [patientTestId, setPatientTestId] = useState("");

    const handleParameterClose = () => {
        setShowParameterResult(false);
        setFile([]);
        setTestProfileId(null)
    };

    // get all tests of patient
    const getAllTestsOfPatient = async (patientObj) => {
        // selected parameter UI reset when open modal
        setTestParameters([]);
        try {
            const patientId = patientObj?.cid;
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
        const selectedTestPID = allTestOfPatient.find(t => t.test_profile_id == selectedTestId);
        console.log("selectedTestPID", selectedTestPID);
        setComments("");
        setFile([]);

        // if (selectedTestId) {

        fetchFilesForTest(selectedTestPID.patient_test_id);
        // }
        try {
            const url = `/patient_entry/test_parameters/${selectedTestId}/${selectedPatientObj.cid}/${patientParameterRes?.cid}/${selectedTest.serology_elisa}`;
            const response = await httpClient.get(url);
            if (response) {
                setTestType(response.test_type);
                setTestParameters(response.parameters);
                setComments(response.comment);
                setVerify(response.status == 1 ? "Verified - Unverified Now" : "Unverified - Verfy Now");
                setIsverifyBtn(response.result_status == 1 ? true : false);
                converDropDownValues(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const converDropDownValues = (response) => {
        const parameterArr = response.parameters;

        // if()
        const dropdownArr = parameterArr.map((obj) => {
            let arr = null;
            if (obj.input_type == "dropdown") {
                // return obj;
                arr.push(obj);
            };
            return arr;
        });
        console.log("1234", dropdownArr);
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
            console.log("parameter", parameter)
            const obj = {
                parameter_id: parameter.id,
                result_value: parameter.default_value,
                cutoff_value: parameter.cutoff_value,
            }
            parameters.push(obj)
        })

        const patientTestId = allTestOfPatient.find(it => it.test_profile_id == testProfileId);
        const parameterObj = {
            patient_id: selectedPatientObj.id,
            test_profile_id: testProfileId,
            parameters: parameters,
            comment: comments,
        }

        try {
            const url = `/patient_entry/test_results/${patientParameterRes?.cid}`;
            const response = await httpClient.post(url, parameterObj);
        } catch (error) {
            console.log("error", error)
        }

    };




    const handleVerify = async () => {
        const user = JSON.parse(localStorage.getItem("LoggedInUser"));
        setVerify(prev => (prev === "Verified - Unverified Now" ? "Unverified - Verfy Now" : "Verified - Unverified Now"));
        try {
            const obj = {
                code: verify == "Verified - Unverified Now" ? 0 : 1,
                verified_by: 3,
                counter_id: patientParameterRes?.cid,
                user_id: user.id
            }
            const url = `/patient_entry/verify_test/${testProfileId}`;
            const resposne = await httpClient.put(url, obj);
            if (resposne) {
                console.log("response", resposne);
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        const patientObject = patientParameterRes;
        setSelectedPatientObj(patientObject);
        getAllTestsOfPatient(patientObject);

    }, [showParameterResult]);




    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile); // ✅ actual file blob

        console.log("Selected file:", selectedFile);
        for (let [key, value] of formData.entries()) {
            console.log("FormData entry:", key, value);
        }

        const selectedTest = allTestOfPatient.find(
            (t) => t.test_profile_id == testProfileId
        );

        const url = `http://127.0.0.1:5000/api/patient_entry/file/${selectedTest.patient_test_id}`;
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`, },
            });
            if (response.data.status == 201) {
                fetchFilesForTest(patientTestId)
            }
            console.log("Upload response:", response.data);
        } catch (error) {
            console.error("File upload error:", error);
        } finally {
            e.target.value = "";
        }
    };

    const fetchFilesForTest = async (patientId = null) => {
        try {
             const token = localStorage.getItem("token");
            setPatientTestId(patientId)
            const url = `http://127.0.0.1:5000/api/patient_entry/get_file/${patientId}`;
            const response = await axios.get(url,{headers:{Authorization: `Bearer ${token}`,}});
            debugger
            if (response?.data?.data?.length) {
                const filesWithUrl = response.data.data.map((f) => ({
                    ...f,
                    url: `http://127.0.0.1:5000/${f.file.replace(/\\/g, "/")}`
                }));
                console.log("filesWithUrl", filesWithUrl);
                setFile(filesWithUrl);
            } else {
                setFile([])
            }
        } catch (error) {
            console.error("File fetch error:", error);
        }
    };



    const handleRemoveFile = async (index) => {
        try {
            const url = `http://127.0.0.1:5000/api/patient_entry/delete_file/${index}`;
            const response = await axios.delete(url);
            console.log("response", response)
            if (response.status == 200) {
                fetchFilesForTest(patientTestId);
            }
        } catch (error) {
            console.error("File fetch error:", error);
        }

    };

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


                {
                    testProfileId && (
                        <>
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
                                                (testType == "four columns") &&
                                                <Col md={3}>Normal Range</Col>
                                            }
                                            {
                                                (testType === "four columns") &&
                                                <Col md={3}>Unit</Col>
                                            }
                                        </Row>

                                        {testParameters?.map((parameter) => {
                                            return (
                                                <div key={parameter.id} className="mb-3">
                                                    {testType === "editor" ? (
                                                        <>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Label>{parameter.sub_heading}</Form.Label>
                                                                </Col>
                                                            </Row>
                                                            <Row className="align-items-center mb-2">
                                                                {

                                                                    (testType === "four columns" || testType === "three columns" || testType === "two columns" || testType == "editor") &&
                                                                    <Col md={3}>

                                                                        <Form.Label className="fw-bold">{parameter.parameter_name}</Form.Label>
                                                                    </Col>
                                                                }

                                                            </Row>

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

                                                        </>
                                                    ) : (
                                                        <>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Label> {parameter.sub_heading}</Form.Label>
                                                                </Col>
                                                            </Row>
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
                                                                        {parameter.input_type == "dropdown" ? (
                                                                            <Form.Select
                                                                                name="default_value"
                                                                                value={parameter.default_value}
                                                                                onChange={(e) => Parameterhandler(parameter.id, e)}
                                                                            >
                                                                                <option>Open this select menu</option>
                                                                                {parameter.dropdown_values && parameter.dropdown_values.split(",").map((val, i) => (
                                                                                    <option key={i} value={val.trim()}>
                                                                                        {val.trim()}
                                                                                    </option>
                                                                                ))}

                                                                            </Form.Select>
                                                                        ) : (
                                                                            <Form.Control
                                                                                as={parameter.input_type === "textarea" ? "textarea" : "input"}
                                                                                rows={parameter.input_type === "textarea" ? 3 : undefined}
                                                                                name="default_value"
                                                                                placeholder={`Enter ${parameter.parameter_name}`}
                                                                                value={parameter.default_value}
                                                                                onChange={(e) => Parameterhandler(parameter.id, e)}
                                                                            />
                                                                        )

                                                                        }
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
                                                                {/* {
                                                                    (testType === "four columns") &&
                                                                    <Col md={3}>
                                                                        <Form.Control
                                                                            as="textarea"
                                                                            name="normalvalue"
                                                                            rows={2}
                                                                            placeholder={`Enter ${parameter.normalvalue} `}
                                                                            value={parameter.normalvalue.replace(/,/g, "\n")}
                                                                            onChange={(e) => Parameterhandler(parameter.id, e)}
                                                                        />
                                                                        
                                                                    </Col>
                                                                } */}
                                                                {
                                                                    (testType === "four columns") &&
                                                                    <Col md={3}>
                                                                        <span className="text-secondary">{parameter.unit || "--"}</span>
                                                                    </Col>
                                                                }
                                                            </Row>
                                                        </>
                                                    )}
                                                </div>
                                            )
                                        }
                                        )}
                                    </>
                                }
                            </div>

                            {testProfileId &&
                                <div className="mt-2 mb-4" >
                                    <Form.Label htmlFor="comments">Comments</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="comments on test"
                                        id="comments"
                                        aria-describedby="comments"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                </div>
                            }
                            {

                                <div>
                                    <label
                                        style={{
                                            display: "inline-block",
                                            padding: "8px 14px",
                                            backgroundColor: "#1c2765",
                                            color: "#fff",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Choose Files
                                        <input
                                            type="file"
                                            accept=".jpg,.png,.pdf"
                                            multiple
                                            onChange={handleFileChange}
                                            style={{ display: "none" }}
                                        />
                                    </label>

                                    {/* File List */}
                                    <div style={{ marginTop: "15px" }}>
                                        {file?.map((file, index) => (

                                            <div
                                                key={index}
                                                onClick={() => {
                                                    // Open in new tab when file has URL
                                                    window.open(`http://127.0.0.1:5000/${file.file.replace(/\\/g, "/")}`, "_blank")

                                                }}

                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    background: "#f5f5f5",
                                                    padding: "6px 10px",
                                                    borderRadius: "6px",
                                                    cursor: file.url ? "pointer" : "default",
                                                    margin: "5px",
                                                    fontSize: "13px",
                                                    maxWidth: "220px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >

                                                {/* File name or link */}
                                                <span
                                                    style={{
                                                        marginRight: "8px",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        color: file.url ? "#1c2765" : "#333",
                                                        textDecoration: file.url ? "underline" : "none",
                                                    }}
                                                >
                                                    <span>{file.filename}</span>

                                                </span>

                                                {/* ❌ Delete Icon */}
                                                <FaTimes
                                                    size={14}
                                                    color="red"
                                                    style={{ cursor: "pointer", flexShrink: 0 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // ✅ Prevent opening the file when clicking delete
                                                        handleRemoveFile(file.id);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            }


                            {isVerifybtn == true &&
                                <div className="mt-4 d-flex justify-content-start">
                                    <Button variant="secondary" className="primary"
                                        onClick={handleVerify}
                                    >{verify}</Button>
                                </div>
                            }
                        </>
                    )
                }


            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" className="secondary" onClick={handleParameterClose}>
                    Close
                </Button>
                {
                    testProfileId && <Button variant="primary" className="primary" onClick={handleSaveParameter} >
                        Save Changes
                    </Button>
                }

            </Modal.Footer>

        </Modal>
    )
}