import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare, FaPrint } from "react-icons/fa6";
import { useState, useEffect } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Table from "react-bootstrap/Table";
import httpClient from "../../../services/httpClient";
import { Row, Col, Form, Table, Modal, Button } from "react-bootstrap";

export default function PatientEntryTable({ patiententryList, onEdit, onDelete, loading }) {
    const [show, setShow] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showResultModal, setShowResultModal] = useState(false);
    //  States for result modal
    const [tests, setTests] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [selectedTest, setSelectedTest] = useState("");
    const [selectedParameters, setSelectedParameters] = useState([]);
    const [resultData, setResultData] = useState({});
    const [saving, setSaving] = useState(false);

    //  Fetch test list when modal opens
    useEffect(() => {
        if (!showResultModal || !selectedPatient) return;

        const fetchTests = async () => {
            try {
                const patient_Id =
                    selectedPatient?.patient_id ||
                    selectedPatient?.patient_entry_id ||
                    selectedPatient?.id;

                const response = await httpClient.get(`/patient_entry/patient_tests/${patient_Id}`);
                const apiData = response.data ?? response;
                const dataArray = Array.isArray(apiData.tests) ? apiData.tests : [];

                const formatted = dataArray.map((t, i) => ({
                    id: i + 1,
                    name: t.name || t.test_name || t || `Test ${i + 1}`,
                    test_id: t.test_id || i + 1,
                    patient_test_id: t.patient_test_id,
                }));

                setTests(formatted);
            } catch (err) {
                console.error("Error fetching tests:", err);
                setTests([]);
            }
        };

        fetchTests();
    }, [showResultModal, selectedPatient]);

    useEffect(() => {
        if (!selectedTest) {
            setParameters([]);
            setResultData({});
            return;
        }

        const fetchParams = async () => {
            try {
                console.log("Selected patient_test_id:", selectedTest);
                const res = await httpClient.get(`/parameter/by_test/${selectedTest}`); // ✅ patient_test_id jaa raha hai
                const data = res?.data ?? res ?? [];
                setParameters(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching parameters:", err);
                setParameters([]);
            }
        };

        fetchParams();
    }, [selectedTest]);

    const handleResultChange = (paramId, value) => {
        setResultData((prev) => ({ ...prev, [paramId]: value }));
    };

    const handleSaveAll = async () => {
        if (!selectedTest) return alert("Select a test first");
        setSaving(true);

        try {
            const payload = {
                patient_entry_id:
                    selectedPatient.id ||
                    selectedPatient.results_id ||
                    selectedPatient.patient_entry_id,
                test_id: selectedTest,
                results: Object.entries(resultData).map(([paramId, value]) => ({
                    parameter_id: paramId,
                    value,
                })),
            };

            await httpClient.post("/save_results", payload);
            alert("Results saved successfully!");
            setShowResultModal(false);
        } catch (err) {
            console.error("Save error:", err);
            alert("Save failed. Check console for details.");
        } finally {
            setSaving(false);
        }
    };

    const dynamicColumns = [...new Set(parameters.flatMap((p) => Object.keys(p)))];

    const handleTestChange = (e) => {
        const selectedId = e.target.value;
        setSelectedTest(selectedId);
        const test = tests.find((t) => t.patient_test_id.toString() === selectedId);
        setSelectedParameters(test ? test.parameters : []);
    };

    const handleParameterChange = (index, value) => {
        const updated = [...parameters];
        updated[index].default_value = value;
        setParameters(updated);
    };

    const selectedTestFunc = async (e) => {
        const TestId = e.target.value;
        setSelectedTest(TestId);
        try {
            if (TestId) {
                const res = await httpClient.get(`/parameter/by_test/${TestId}`);
                console.log("API Response:", res.parameters);
                setSelectedParameters(res.parameters || []);
            } else {
                setSelectedParameters([]);
            }
        } catch (error) {
            console.error("Error fetching parameters:", error);
        }

    };

    const handleParameterValueChange = (index, value) => {
        const updatedParams = [...selectedParameters];
        updatedParams[index].default_value = value;
        setSelectedParameters(updatedParams);
    };

    const submitResult = async () => {
        try {
            if (!selectedPatient || !selectedTest) {
                alert("Please select a patient and a test first!");
                return;
            }

            const patientId =
                selectedPatient.patient_id ||
                selectedPatient.patient_entry_id ||
                selectedPatient.id;

            const patientTestId = selectedTest;
            const testProfileId = selectedParameters[0]?.test_profile_id || 3;

            const payload = {
                patient_id: patientId,
                patient_test_id: patientTestId,
                test_profile_id: testProfileId,
                parameters: selectedParameters.map((param) => ({
                    parameter_id: param.parameter_id,
                    result_value: param.default_value || "",
                })),
            };

            console.log("Payload sending:", payload);
            const response = await httpClient.post(`/results/add-parameters`, payload);

            console.log("Response:", response.data || response);
            alert("Results saved successfully!");
            setSelectedParameters([]);
            setSelectedTest("");

        } catch (err) {
            console.error("Save Parameter Error:", err);
        }
    };

    //post ki call results/add-parameters
    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: "scroll" }}>
                        <table className="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765" }}>
                                    <th scope="col" style={{ width: '5%', textAlign: 'center' }}>Sr.</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    {/* <th scope="col">X</th> */}
                                    {/* <th>Date</th> */}
                                    {/* <th>MR#</th> */}
                                    <th scope="col">Doctor</th>
                                    {/* <th scope="col">Fees</th> */}
                                    {/* <th>Consultant</th> */}
                                    <th>Test</th>
                                    <th>Results</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            {loading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="10">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "250px",
                                                }}
                                            >
                                                <ThreeCircles
                                                    visible={true}
                                                    height="60"
                                                    width="60"
                                                    color="#fcb040"
                                                    ariaLabel="three-circles-loading"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : patiententryList?.length > 0 ? (
                                <tbody>
                                    {patiententryList.map((patient, index) => (
                                        <tr key={patient.id}>
                                            <td className="text-center">{index + 1}</td>
                                            {/* <td></td> */}
                                            {/* <td>{patient.date || "-"}</td> */}
                                            <td>{patient.patient_name}</td>
                                            <td>{patient.age}</td>
                                            {/* <td>{patient.date || "-"}</td> */}
                                            <td>{patient.reffered_by}</td>
                                            <td> <Button
                                                variant="outline-primary"
                                                size="sm">
                                                View Test
                                            </Button></td>
                                            {/* <td></td>  */}
                                            {/* <td>{patient.reffered_by}</td> */}
                                            {/* <td>{patient.test}</td> */}
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedPatient(patient);
                                                        setShowResultModal(true);
                                                        setSelectedTest("");
                                                        setParameters([]);
                                                        setResultData({});
                                                    }}
                                                >
                                                    Add Result
                                                </Button>
                                            </td>
                                            <td className="text-center">
                                                <FaPenToSquare
                                                    onClick={() => onEdit(patient)}
                                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                                />
                                                <FaRegTrashCan
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this patient?")) {
                                                            onDelete(patient.id);
                                                        }
                                                    }}
                                                    style={{ fontSize: "20px", cursor: "pointer", color: "red", marginLeft: 10 }}
                                                />
                                                <FaPrint
                                                    onClick={() => {
                                                        setSelectedPatient(patient);
                                                        setShow(true);
                                                    }}
                                                    style={{ fontSize: "20px", cursor: "pointer", color: "#333", marginLeft: 10 }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No Patients Found
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>

            {/* ✅ Add Result Modal */}
            <Modal show={showResultModal} size="lg" onHide={() => setShowResultModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Test Result</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedPatient && (
                        <div className="mb-3 border rounded p-3 bg-light">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <Form.Label className="fw-bold">Name</Form.Label>
                                    <Form.Control value={selectedPatient.patient_name || ""} readOnly />
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className="fw-bold">Date</Form.Label>
                                    <Form.Control value={selectedPatient.date || ""} readOnly />
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className="fw-bold">Sample</Form.Label>
                                    <Form.Control value={selectedPatient.sample || ""} readOnly />
                                </div>
                            </div>
                        </div>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>Select Test</Form.Label>
                        <Form.Select
                            value={selectedTest}
                            onChange={selectedTestFunc}
                        >
                            <option value="">-- Select Test --</option>
                            {tests.map((test) => (
                                <option key={test.patient_test_id} value={test.patient_test_id}>
                                    {test.name || test.test_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {selectedParameters.length > 0 && (
                        <>
                            <h5 className="mb-3">Parameters</h5>

                            {selectedParameters.map((param, index) => (
                                <Row key={param.parameter_id} className="align-items-center mb-3">
                                    {/* Parameter Name as Label */}
                                    <Col md={4}>
                                        <Form.Label className="fw-semibold">{param.parameter_name}</Form.Label>
                                    </Col>

                                    {/* Editable Input Field */}
                                    <Col md={4}>
                                        <Form.Control
                                            type="text"
                                            placeholder={`Enter ${param.parameter_name}`}
                                            value={param.default_value ?? ""} // make it editable
                                            onChange={(e) => {
                                                const updatedParams = [...selectedParameters];
                                                updatedParams[index].default_value = e.target.value;
                                                setSelectedParameters(updatedParams);
                                            }}
                                        />
                                    </Col>

                                    {/* Unit Column */}
                                    <Col md={2}>
                                        <span className="text-secondary">{param.unit || "--"}</span>
                                    </Col>

                                    {/* Normal Value Column */}
                                    <Col md={2} className="text-muted">
                                        {param.normalvalue ? `Normal: ${param.normalvalue}` : ""}
                                    </Col>
                                </Row>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    onClick={submitResult}
                                >
                                    Add Result
                                </Button>
                            </div>



                        </>
                    )}


                    {/* {selectedParameters.length > 0 && (
                        <>
                            <h5>Parameters</h5>
                            {selectedParameters.map((param, index) => (
                                <Row key={param.parameter_id} className="align-items-center mb-3">
                                    <Col md={4}>
                                        <Form.Label>{param.parameter_name}</Form.Label>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            type="text"
                                            value={param.default_value}
                                            onChange={(e) =>
                                                selectedTestFunc(index, e.target.value)
                                            }
                                        />
                                    </Col>
                                    <Col md={2}>{param.unit}</Col>
                                    <Col md={3} className="text-muted">
                                        Normal: {param.normalvalue}
                                    </Col>
                                </Row>
                            ))}
                        </>
                    )} */}
                    {/* {selectedParameters.length > 0 && (
                        // <>
                        //     <h5 className="mb-3">Parameters</h5>
                            
                        // </>
                    )} */}
                    {/* {selectedParameters.length > 0 && (
                        <Table bordered hover responsive>
                            <thead style={{ backgroundColor: "#f8f9fa" }}>
                                <tr>
                                    <th>Sr.</th>
                                    {dynamicColumns.map((col) => (
                                        <th key={col}>{col}</th>
                                    ))}
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parameters.map((p, idx) => {
                                    const pid = p.id ?? p.parameter_id ?? idx;
                                    return (
                                        <tr key={pid}>
                                            <td>{idx + 1}</td>
                                            {dynamicColumns.map((col) => (
                                                <td key={col}>{p[col]}</td>
                                            ))}
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter result"
                                                    value={resultData[pid] ?? ""}
                                                    onChange={(e) => handleResultChange(pid, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )} */}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowResultModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveAll} disabled={parameters.length === 0 || saving}>
                        {saving ? "Saving..." : "Save All Results"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


















//-------------------------- pahlay wala jis mein add result wala coioum addnhi hain--------------------

// import { ThreeCircles } from "react-loader-spinner";
// import { FaRegTrashCan, FaPenToSquare, FaPrint } from "react-icons/fa6";
// import { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// // import { QRCodeCanvas } from "qrcode.react";

// export default function PatientEntryTable({ patiententryList, onEdit, onDelete, loading }) {
//     const [show, setShow] = useState(false);
//     const [selectedPatient, setSelectedPatient] = useState(null); // ✅ hold clicked patient

//     const handleOpen = (patient) => {
//         setSelectedPatient(patient); // ✅ store clicked patient
//         setShow(true);
//     };

//     const handleClose = () => {
//         setSelectedPatient(null); // clear data when closing
//         setShow(false);
//     };

//     return (
//         <>
//             <div className="card shadow-sm border-0">
//                 <div className="card-body p-0">
//                     <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr style={{ backgroundColor: "#1c2765" }}>
//                                     <th scope="col">Sr.</th>
//                                     <th scope="col">X</th>
//                                     <th scope="col">Date</th>
//                                     <th scope="col">Name</th>
//                                     <th scope="col">MR#</th>
//                                     <th scope="col">Reception</th>
//                                     <th scope="col">Fees</th>
//                                     <th scope="col">Ref Consultant</th>
//                                     <th scope="col">Test</th>
//                                     <th scope="col">Action</th>
//                                 </tr>
//                             </thead>
//                             {loading ? (
//                                 <tbody>
//                                     <tr>
// <td colSpan="10">
//     <div
//         style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "250px",
//         }}
//     >
//         <ThreeCircles
//             visible={true}
//             height="60"
//             width="60"
//             color="#fcb040"
//             ariaLabel="three-circles-loading"
//         />
//     </div>
// </td>
//                                     </tr>
//                                 </tbody>
//                             ) : patiententryList?.length > 0 ? (
//                                 <tbody>
//                                     {patiententryList.map((patient, index) => (
//                                         <tr key={patient.id}>
//                                             <td>{index + 1}</td>
//                                             <td></td>
//                                             <td></td>
//                                             <td>{patient.patient_name}</td>
//                                             <td>{patient.father_hasband_MR}</td>
//                                             <td></td>
//                                             <td></td>
//                                             <td>{patient.reffered_by}</td>
//                                             <td>{patient.test}</td>
//                                             <td>
//                                                 <div className="d-flex gap-2 align-items-center justify-content-center">
//                                                     <FaPenToSquare
//                                                         onClick={() => onEdit(patient)}
//                                                         style={{ fontSize: "22px", cursor: "pointer" }}
//                                                     />
//                                                     <FaRegTrashCan
//                                                         onClick={() => {
//                                                             if (window.confirm("Are you sure you want to delete this department?")) {
//                                                                 onDelete(patient.id);
//                                                             }
//                                                         }}
//                                                         style={{ fontSize: "22px", cursor: "pointer", color: 'red' }}
//                                                     />
//                                                     <FaPrint
//                                                         onClick={() => handleOpen(patient)} // ✅ pass patient
//                                                         style={{ fontSize: "22px", cursor: "pointer", color: "#333" }}
//                                                     />
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             ) : (
//                                 <tbody>
//                                     <tr>
//                                         <td colSpan="10" className="text-center">
//                                             No Patients Found
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             )}
//                         </table>
//                     </div>

//                     {/* ✅ Modal with selected patient */}
//                     <Modal show={show} onHide={handleClose} centered>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Print Preview</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             {selectedPatient ? (
//                                 <>
//                                     <p><strong>Patient Name:</strong> {selectedPatient.patient_name}</p>
//                                     <p><strong>MR#:</strong> {selectedPatient.father_hasband_MR}</p>
//                                     <p><strong>Referred By:</strong> {selectedPatient.reffered_by}</p>
//                                     <p><strong>Test:</strong> {selectedPatient.test}</p>
//                                     <p><strong>Code:</strong> {selectedPatient.qr_code}</p>
//                                     <div className="d-flex justify-content-center mt-3">
//                                         <QRCodeCanvas
//                                             value={`https://gardezi-lab-backend-1-zlp6.onrender.com/api/invoice/${selectedPatient.id}`}
//                                             size={128}    // QR size
//                                             bgColor="#ffffff"
//                                             fgColor="#000000"
//                                             level="H"     // error correction
//                                         />
//                                     </div>
//                                 </>
//                             ) : (
//                                 <p>No patient selected</p>
//                             )}
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={handleClose}>
//                                 Close
//                             </Button>
//                             <Button
//                                 variant="primary"
//                                 onClick={() => window.print()}
//                             >
//                                 Print
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//                 </div>
//             </div>
//         </>
//     );
// }
