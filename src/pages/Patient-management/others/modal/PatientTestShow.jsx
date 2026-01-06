import { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form, Dropdown } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";
import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";



export default function PatientTestShow({ isPatientTest, setIsPatientTest, patientTest, getUpdatedPatientList }) {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
    console.log("isPatientTest", isPatientTest)
    console.log("patientTest", patientTest)
    const [patientTestShow, setPatientTestShow] = useState([]);
    const [testList, setTesList] = useState([]);
    const [checkedBox, setCheckedBox] = useState(false);
    const [newamount, setNewamount] = useState("");
    const [remainingamount, setRemainingamount] = useState("");
    const [testHistory, setTestHistory] = useState(0);
    const [files, setFiles] = useState({});
    const [checkAmount, setCheckAmount] = useState(false);
    const [pendingAmount, setPendingAmount] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [receivedAmount, setReceivedAmount] = useState("");
    const [checkApprove, setCheckApprove] = useState(false);
    const [newApprove, setNewApprove] = useState("");
    const [testId, setTestId] = useState([]);
    const [ptpdfurl, setPdfurl] = useState("");
    const [isPdf, setIsPdf] = useState(false);

    const getTestData = async () => {
        try {
            const url = `/patient_entry/tests/${patientTest.cid}`
            const response = await httpClient.get(url);
            setPatientTestShow(response.tests)

        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckbox = (e, test) => {

        const isChecked = e.target.checked;

        const obj = {
            id: test.test_profile_id
        };

        if (isChecked) {
            setTesList(prev => {
                if (prev.find(item => item.id == obj.id)) {
                    return prev;
                } else {
                    return [...prev, obj]
                }
            });
            setTestId(...testId, { 'id': obj.id })
            handleAttachements(test.patient_test_id)
        } else {
            setTesList(prev => prev.filter(item => item.id !== obj.id));

            // remove only this test's files, not all
            setFiles(prev => {
                const updated = { ...prev };
                delete updated[test.patient_test_id];
                return updated;
            });
        }
        // generatepdf(test)
    }

    const generatepdf = async () => {
        const url = `/pdfreport/${patientTest.cid}`;
        const response = await httpClient.post(url, { testId });
        if (response) {
            console.log("response", response)
            const pdfurl = response.pdf_url;
            if (pdfurl.length) {
                setIsPdf(true);
                setPdfurl(pdfurl);
            }
        }
    }


    useEffect(() => {
        getTestData();
        setTestHistory(1)
        setRemainingamount(patientTest?.total_fee - patientTest?.paid);
        setPendingAmount(patientTest?.pending_discount);
        setTotalAmount(patientTest?.total_fee);
        setReceivedAmount(patientTest?.paid)
        setNewApprove(patientTest?.pending_discount)
    }, [isPatientTest])

    const closeTestModal = () => {
        setIsPatientTest(false);
        setTesList([]);
        setTestHistory(0)
        setFiles({})
    }

    const saveAmount = async () => {
        try {

            if (newamount == "") {
                return;
            }
            const obj = {
                paid: newamount
            };
            const url = `/patient_entry/update_fee/${patientTest.cid}`
            const response = await httpClient.put(url, obj);
            if (response) {
                getUpdatedPatientList();
                setCheckAmount(true)
                // setNewamount("");
                // closeTestModal()
            }
            console.log("response", response);
        } catch (error) {
            console.log(error);
        } finally {
            // setNewamount("");
        }
    }

    useEffect(() => {
        console.log("newamount", newamount)
        if (checkAmount == true) {
            setRemainingamount(remainingamount - newamount);

            setNewamount("")
        }
        if (checkApprove == true) {
            setPendingAmount(pendingAmount - newApprove);
        }
    }, [checkAmount == true, checkApprove]);

    const approveAmount = async () => {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"))
        const obj = {
            discount: newApprove,
            user_id: LoggedInUser?.user.id
        }
        try {
            const url = `/patient_entry/discount_approvel/${patientTest.cid}`
            const response = await httpClient.put(url, obj);
            if (response) {
                getUpdatedPatientList();
                setCheckApprove(true)

            }
            console.log("response", response);
        } catch (error) {
            console.log(error);
        } finally {


        }
    }

    const getHistoryCount = async (value) => {
        // console.log("event", event);
        // const value = eventTarget.textContent;
        setTestHistory(value)
    }

    const handleAttachements = async (patientTestId) => {
        try {
            const url = `/patient_entry/get_file/${patientTestId}`;
            const response = await httpClient.get(url);

            if (response?.data?.length) {
                const filesWithUrl = response.data.map((f) => ({
                    ...f,
                    url: `http://127.0.0.1:5000/${f.file.replace(/\\/g, "/")}`
                }));

                setFiles(prev => ({
                    ...prev,
                    [patientTestId]: filesWithUrl // store by test id
                }));
                // setTesList(prev => [...prev]);
            } else {
                // setFiles(prev => ({
                //     ...prev,
                //     [patientTestId]: []
                // }));
            }
        } catch (error) {
            console.error("File fetch error:", error);
        }
    };


    return (
        <>
            <Modal show={isPatientTest}>

                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {patientTest?.patient_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <>
                        {permissions["Patient Payment"] == 1 &&
                            <>

                                <div className="p-3 mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Total Amount:</span>
                                        <span className="fw-semibold">{totalAmount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Received Amount:</span>
                                        <span className="fw-semibold text-success">{receivedAmount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Due Amount:</span>
                                        <span className="fw-semibold text-danger">
                                            {remainingamount}
                                        </span>
                                    </div>{
                                        pendingAmount > 0 &&
                                        <div className="d-flex justify-content-between">
                                            <span>Pending Discount:</span>
                                            <span className="fw-semibold text-danger">
                                                {pendingAmount} %
                                            </span>
                                        </div>
                                    }

                                </div>

                                {remainingamount !== 0 && (
                                    <div className="mb-3">
                                        <Form.Label className="fw-semibold">Add New Amount</Form.Label>
                                        <div className="d-flex align-items-center gap-2">
                                            <Form.Control
                                                type="number"
                                                name="newamount"
                                                value={newamount}
                                                placeholder="Enter New Amount"
                                                onChange={(e) => setNewamount(e.target.value)}
                                            />
                                            <Button variant="primary" className="primary" size="sm" onClick={saveAmount}>
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                )}


                                {pendingAmount > 0 && (
                                    <div className="mb-3">
                                        <Form.Label className="fw-semibold">Pending Discount</Form.Label>
                                        <div className="d-flex align-items-center gap-2">
                                            <Form.Control
                                                type="number"
                                                name="newApprove"
                                                value={newApprove}
                                                placeholder="Enter New Amount"
                                                onChange={(e) => setNewApprove(e.target.value)}
                                            />
                                            <Button variant="primary" className="primary" size="sm" onClick={approveAmount}>
                                                Approve
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        }
                        <div className="pt-3">
                            <h6 className="fw-bold mb-2">Patient Tests</h6>
                            <ul className="list-group list-group-flush">
                                {patientTestShow.length > 0 ? (
                                    patientTestShow.map((log, index) => {
                                        const isChecked = testList.some(item => item.id === log.test_profile_id);
                                        return (
                                            <li
                                                key={index}
                                                className="list-group-item d-flex align-items-center justify-content-between"
                                            >
                                                <div className="d-flex align-items-center gap-2 flex-wrap ">
                                                    <small className="text-primary fw-semibold">{index + 1}.</small>
                                                    <Form.Check
                                                        type="checkbox"
                                                        id={`test-${index}`}
                                                        label={log.test_name}
                                                        checked={isChecked}
                                                        onChange={(e) => handleCheckbox(e, log)}
                                                        className="m-0"
                                                    />
                                                    {files[log.patient_test_id]?.map((obj, i) => (
                                                        <span key={i} className="attachment-badge">
                                                            <a href={obj.url} target="_blank" rel="noopener noreferrer">
                                                                {obj.filename || obj.file}
                                                            </a>
                                                        </span>
                                                    ))}

                                                </div>

                                            </li>
                                        );
                                    })
                                ) : (
                                    <p className="text-muted m-2">No test found for this patient.</p>
                                )}
                            </ul>
                        </div>
                    </>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '5px' }} >
                        <Button className="primary" onClick={generatepdf}>generate pdf</Button>
                        {
                            isPdf &&
                            <Link to={`${ptpdfurl}`} target="_blank" rel="noopener noreferrer">
                                <Button className="primary" >pdf report</Button>
                            </Link>
                        }
                    </div>


                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-space">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" className="primary"  >
                            History count {testHistory}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => getHistoryCount(0)}>0</Dropdown.Item>
                            <Dropdown.Item onClick={() => getHistoryCount(1)}>1</Dropdown.Item>
                            <Dropdown.Item onClick={() => getHistoryCount(2)}>2</Dropdown.Item>
                            <Dropdown.Item onClick={() => getHistoryCount(3)}>3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {permissions["Patient Report"] == 1 &&
                        <Button className="primary"
                            disabled={
                                patientTest?.company_id == null ? remainingamount : ""
                            }
                        >
                            <Link to={`/patient-management/report?id=${patientTest?.cid}&testList=${encodeURIComponent(JSON.stringify(testList))}&testHistory=${testHistory}`} target="_blank" rel="noopener noreferrer">
                                <FaPrint
                                    className="FaPrint"
                                    title="Print"
                                    color="white"
                                />
                            </Link>
                        </Button>
                    }
                    <Button variant="secondary" className="secondary" onClick={closeTestModal}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>


        </>
    )
}