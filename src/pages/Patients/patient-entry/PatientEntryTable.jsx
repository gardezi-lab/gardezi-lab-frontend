import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare, FaPrint } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import httpClient from "../../../services/httpClient";

export default function PatientEntryTable({ patiententryList, onEdit, onDelete, loading }) {
    const [show, setShow] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showResultModal, setShowResultModal] = useState(false);

    // ✅ States for result modal
    const [tests, setTests] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [selectedTest, setSelectedTest] = useState("");
    const [resultData, setResultData] = useState({});
    const [saving, setSaving] = useState(false);

    // ✅ Fetch test list when modal opens
    useEffect(() => {
        if (!showResultModal || !selectedPatient) return;

        const fetchTests = async () => {
            try {
                const patient_Id =
                    selectedPatient?.patient_id ||
                    selectedPatient?.patient_entry_id ||
                    selectedPatient?.id;

                const response = await httpClient.get(`/patient_entry/tests_result/${patient_Id}`);
                const apiData = response.data ?? response;
                const dataArray = Array.isArray(apiData.tests) ? apiData.tests : [];

                const formatted = dataArray.map((t, i) => ({
                    id: i + 1,
                    name: t.name || t.test_name || t || `Test ${i + 1}`,
                    test_id: t.test_id || i + 1,
                }));

                setTests(formatted);
            } catch (err) {
                console.error("Error fetching tests:", err);
                setTests([]);
            }
        };

        fetchTests();
    }, [showResultModal, selectedPatient]);

    // ✅ Fetch parameters when test changes
    useEffect(() => {
        if (!selectedTest) {
            setParameters([]);
            setResultData({});
            return;
        }

        const fetchParams = async () => {
            try {
                const res = await httpClient.get(`/test_parameters?test_id=${selectedTest}`);
                const data = res?.data ?? res ?? [];
                setParameters(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching parameters:", err);
                setParameters([]);
            }
        };

        fetchParams();
    }, [selectedTest]);

    // ✅ Handle Save
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
            alert("Save failed. Check console.");
        } finally {
            setSaving(false);
        }
    };

    const handleResultChange = (paramId, value) => {
        setResultData((prev) => ({ ...prev, [paramId]: value }));
    };

    const dynamicColumns = [...new Set(parameters.flatMap((p) => Object.keys(p)))];

    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: "scroll" }}>
                        <table className="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765" }}>
                                    <th scope="col" style={{width: '5%',textAlign: 'center'}}>Sr.</th>
                                    <th scope="col">X</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>MR#</th>
                                    <th scope="col">Reception</th>
                                    <th scope="col">Fees</th>
                                    <th>Consultant</th>
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
                                            <td style={{textAlign: 'center'}}>{index + 1}</td>
                                            <td></td>
                                            <td>{patient.date || "-"}</td>
                                            <td>{patient.patient_name}</td>
                                            <td>{patient.father_hasband_MR}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{patient.reffered_by}</td>
                                            <td>{patient.test}</td>
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
                        <Form.Select value={selectedTest} onChange={(e) => setSelectedTest(e.target.value)}>
                            <option value="">-- Select Test --</option>
                            {tests.map((test) => (
                                <option key={test.id} value={test.test_id}>
                                    {test.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {parameters.length > 0 && (
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
                    )}
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
