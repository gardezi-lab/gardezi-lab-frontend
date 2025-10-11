import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare, FaPrint, FaFileInvoiceDollar } from "react-icons/fa6";
import { FaHistory, FaEye, FaFileMedical } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";
import { Row, Col, Form, Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function PatientEntryTable({ patiententryList, onEdit, onDelete, loading }) {
    // const [show, setShow] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showPatientModal, setPatientResultModal] = useState(false);
    const [patientLogs, setPatientLogs] = useState({});
    const [loadingLogs, setLoadingLogs] = useState(false);

    //  States for result modal
    const [tests, setTests] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [testDetails, setTestDetails] = useState([]);
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

                const response = await httpClient.get(`/patient_entry/tests/${patient_Id}`);
             


                setTests(response);
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
                const res = await httpClient.get(`/patient_entry/test_parameters/${selectedTest}`); //patient_test_id jaa raha hai
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
        // if (!selectedTest) return alert("Select a test first");
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
            // alert("Results saved successfully!");
            setShowResultModal(false);
        } catch (err) {
            console.error("Save error:", err);
            // alert("Save failed. Check console for details.");
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
                const res = await httpClient.get(`/patient_entry/test_parameters/${TestId}`);
                console.log("API Response:", res.parameters);
                setSelectedParameters(res.parameters || []);
            } else {
                setSelectedParameters([]);
            }
        } catch (error) {
            console.error("Error fetching parameters:", error);
            setSelectedParameters([]);
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
                // alert("Please select a patient and a test first!");
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


            const response = await httpClient.post(`/patient_entry/test_results/${payload.patient_test_id}`, payload);

            console.log("Response:", response.data || response);
            // After successful result save — remove that test from dropdown
            setTests((prevTests) =>
                prevTests.filter(
                    (test) =>
                        test.patient_test_id.toString() !== selectedTest.toString()
                )
            );
            // alert("Results saved successfully!");
            setSelectedParameters([]);
            setSelectedTest("");

        } catch (err) {
            console.error("Save Parameter Error:", err);
        }
    };

    // Handle modal open
    const handleShow = async (patient) => {
        setSelectedPatient(patient);
        setShowModal(true);

        try {
            const patient_Id =
                patient?.patient_id ||
                patient?.patient_entry_id ||
                patient?.id;

            const response = await httpClient.get(`/patient_entry/tests/${patient_Id}`);
            console.log("Fetched tests:", response.data);

            setTestDetails(response);

        } catch (error) {
            console.error("Error fetching test details:", error);
            setTestDetails([]);
        }
    };

    // Handle modal close
    const handleClose = () => {
        setShowModal(false);
        setTestDetails(null);
    };

    // patient log
    const handleShowPatientLogs = async (id, patientName) => {
        setSelectedPatient(id);
        setPatientResultModal(true);
        setLoadingLogs(true);

        try {
            if (id) {
                const response = await httpClient.get(`/patient_entry/activity/${id}`);
                setPatientLogs({
                    ...response,
                    patient_name: patientName,
                });
            } else {
                setPatientLogs([]);
            }
        } catch (error) {
            console.error("Error fetching patient logs:", error);
        } finally {
            setLoadingLogs(false)
        }
    };

    // invoice generate
    const handleShowInvoice = async (id, patientName) => {
        setSelectedPatient(id);
        // setShowInvoiceModal(true);

        try {
            if (id) {
                const response = await httpClient.get(`/invoice/${id}`);
                setSelectedInvoice({
                    data: response.data || response,
                    patient_name: patientName,
                });

            } else {
                setSelectedInvoice([]);
            }
        } catch (error) {
            console.error("Error fetching patient logs:", error);
        }
    };

    const handleShowInvoices = () => {
        // if you want to open it in same tab
        // navigate("/invoice");
        window.open("/print-report", "_blank");
        // OR if you want to open in new tab:

    };

    //post ki call results/add-parameters
    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive table-sm" style={{ maxHeight: "70vh", overflowY: "scroll" }}>
                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765" }}>
                                    <th scope="col" style={{ textAlign: 'center' }}>Sr.</th>
                                    <th scope="col">MR#</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th scope="col">Doctor</th>
                                    <th style={{ textAlign: 'center' }}>Action</th>
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
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            {/* <td></td> */}
                                            <td>{patient.MR_number}</td>
                                            <td>{patient.patient_name}</td>
                                            <td>{patient.age}</td>
                                            <td>{patient.reffered_by}</td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center align-items-center gap-2">
                                                    <FaHistory
                                                        onClick={() => handleShowPatientLogs(patient.id, patient.patient_name)}
                                                        style={{ fontSize: "20px", cursor: "pointer", color: "#007bff" }}
                                                        title="View Patient Logs"
                                                    />
                                                    <FaEye
                                                        onClick={() => handleShow(patient)}
                                                        style={{ fontSize: "20px", cursor: "pointer", color: "#0d6efd" }}
                                                        title="View Tests"
                                                    />
                                                    <FaFileMedical
                                                        onClick={() => {
                                                            setSelectedPatient(patient);
                                                            setShowResultModal(true);
                                                            setSelectedTest("");
                                                            setParameters([]);
                                                            setResultData({});
                                                        }}
                                                        style={{ fontSize: "20px", cursor: "pointer", color: "#dc3545" }}
                                                        title="Add Result"
                                                    />
                                                    {/* <Link to={`/invoice?id=${patient.id}`} target="_blank" rel="noopener noreferrer">
                                                        <FaPrint
                                                            onClick={() => handleShowInvoice(patient.id)}
                                                            style={{ fontSize: "20px", cursor: "pointer", color: "#333" }}
                                                            title="Print"
                                                        />
                                                    </Link> */}
                                                    {/* <Link to={`/invoice?id=${patient.id}`} target="_blank" rel="noopener noreferrer">
                                                        <FaFileInvoiceDollar
                                                            style={{ fontSize: "20px", cursor: "pointer", color: "#28a745" }}
                                                            title="View Invoice"
                                                        />
                                                    </Link> */}
                                                    <FaPrint
                                                        onClick={() => handleShowInvoices(patient.id)}
                                                        style={{ fontSize: "20px", cursor: "pointer", color: "#333" }}
                                                        title="Print"
                                                    />
                                                    <Link to={`/invoice?id=${patient.id}`} target="_blank" rel="noopener noreferrer">
                                                        <FaFileInvoiceDollar
                                                            style={{ fontSize: "20px", cursor: "pointer", color: "#28a745" }}
                                                            title="View Invoice"
                                                        />
                                                    </Link>
                                                    <FaPenToSquare
                                                        onClick={() => onEdit(patient)}
                                                        style={{ fontSize: "20px", cursor: "pointer", color: "#6c757d" }}
                                                        title="Edit"
                                                    />
                                                    <FaRegTrashCan
                                                        onClick={() => {
                                                            if (window.confirm("Are you sure you want to delete this patient?")) {
                                                                onDelete(patient.id);
                                                            }
                                                        }}
                                                        style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
                                                        title="Delete"
                                                    />
                                                </div>
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

       <Modal show={showResultModal} size="lg">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">Add Test Result</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedInvoice?.data?.patient ? (
                        <>
                            {/* Patient Info Section */}
                            <Table responsive className="mb-0">
                                <tbody>
                                    <tr>
                                        <th>Patient Name</th>
                                        <td>{selectedInvoice?.data?.patient?.patient_name || ""}</td>
                                        <th>Age</th>
                                        <td>{selectedInvoice?.data?.patient?.age || ""}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender</th>
                                        <td>{selectedInvoice?.data?.patient?.gender || ""}</td>
                                        {/* <th>Invoice Date</th>
                                        <td>{selectedInvoice?.data?.patient?.invoice_date || ""}</td> */}
                                    </tr>

                                </tbody>
                            </Table>

                            {/* Tests & Parameters */}
                            {selectedInvoice.data.tests?.map((test, index) => (
                                <div key={index} className="mb-4">
                                    <h6 className="fw-bold border-bottom pb-2">{test.test_name}</h6>
                                    {test.parameters && test.parameters.length > 0 ? (
                                        <Table bordered hover responsive>
                                            <thead className="table-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Parameter</th>
                                                    <th>Result</th>
                                                    <th>Unit</th>
                                                    <th>Normal Range</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {test.parameters.map((param, idx) => (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{param.parameter_name}</td>
                                                        <td>{param.result_value || "-"}</td>
                                                        <td>{param.unit}</td>
                                                        <td>{param.normalvalue}</td>
                                                        {/* <td>{param.qr_code}</td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

                                    ) : (
                                        <p className="text-muted">No parameters available</p>
                                    )}

                                </div>

                            ))}
                            {selectedInvoice?.data?.qr_code && (
                                <div className="text-center mt-4">
                                    <h6 className="fw-bold mb-2">QR Code</h6>
                                    <img
                                        src={selectedInvoice.data.qr_code}
                                        alt="QR Code"
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "contain",
                                            border: "1px solid #ddd",
                                            borderRadius: "8px",
                                            padding: "5px",
                                            background: "#fff",
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <p>Loading invoice...</p>
                    )}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ✅ Add Result Modal */}
            <Modal show={showResultModal} size="lg">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">Add Test Result</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedPatient && (
                        <div className="mb-2">
                            <div className="col-md-6 d-flex justify-content-between">
                                <p className="fw-bold">Name</p>
                                <p>{selectedPatient.patient_name}</p>
                            </div>
                            <div className="col-md-6 d-flex justify-content-between">
                                <p className="fw-bold">Date</p>
                                <p>{selectedPatient.date || Date.now()}</p>
                            </div>
                            <div className="col-md-6 d-flex justify-content-between">
                                <p className="fw-bold">Sample</p>
                                <p>{selectedPatient.sample}</p>
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
                        </>
                    )}

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowResultModal(false)}>
                        Close
                    </Button>
                    {selectedParameters.length > 0 && (
                        <Button
                            onClick={submitResult}
                        >
                            Add Result
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {/* test show modal */}
            <Modal show={showModal} centered>
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">Test Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {Array.isArray(testDetails) && testDetails.length > 0 ? (
                        <ol className="list-group list-group-numbered">
                            {testDetails.map((test, index) => (

                                <>
                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span className="me-1">{test.test_name}</span>
                                    </li>
                                </>

                            ))}
                        </ol>


                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Patient Log Modal */}
            <Modal
                show={showPatientModal}
                size="md"
                backdrop="static"
                keyboard={false}
                onHide={() => setPatientResultModal(false)}
            >
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {loadingLogs ? "Loading..." : patientLogs?.patient_name || "No Name"}
                    </Modal.Title>


                </Modal.Header>
                <Modal.Body>
                    {loadingLogs ? (
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
                    ) : patientLogs?.activities?.length > 0 ? (
                        // ✅ Jab data mil gaya
                        <ul className="list-group list-group-flush">
                            {patientLogs.activities.map((log, index) => (
                                <li key={index} className="list-group-item">
                                    <small className="text-blue">{log.created_at}: </small>
                                    <strong style={{ marginLeft: '5%' }}>{log.activity}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center text-muted py-5">No activity found</div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setPatientResultModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
