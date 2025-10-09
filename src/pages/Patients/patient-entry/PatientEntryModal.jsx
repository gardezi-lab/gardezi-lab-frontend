import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import httpClient from "../../../services/httpClient";

export default function PatientEntryModal({ onSave }) {

    const [patiententryCell, setPatientEntryCell] = useState("");
    const [patiententryPatientName, setPatientEntryPatientName] = useState("");
    const [patiententryFatherHasbandMR, setPatientEntryFatherHasbandMR] = useState("");
    const [patiententryAge, setPatientEntryAge] = useState("");
    const [patiententryCompany, setPatientEntryCompany] = useState("Doctor");
    const [patiententryRefferedBy, setPatientEntryRefferedBy] = useState("Doctor");
    const [patiententryGender, setPatientEntryGender] = useState("Male");
    const [patiententryEmail, setPatientEntryEmail] = useState("");
    const [patiententryAddress, setPatientEntryAddress] = useState("");
    const [patiententryPackage, setPatientEntryPackage] = useState("");
    const [patiententrySample, setPatientEntrySample] = useState("");
    const [patiententryPriority, setPatientEntryPriority] = useState("");
    const [patiententryRemarks, setPatientEntryRemarks] = useState("");
    const [patiententryTest, setPatientEntryTest] = useState("");
    const [companies, setCompanies] = useState([]);
    const [users, setUsers] = useState([]);
    const [testProfiles, setTestProfiles] = useState([]);
    const [packages, setPackages] = useState([]);
    const [patiententry, setPatientEntry] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    // const [patiententryCompany, setPatientEntryCompany] = useState("");
    const [total, setTotal] = useState(0);
    const [dscPkr, setDscPkr] = useState(0);
    const [dscPercent, setDscPercent] = useState(0);
    const [net, setNet] = useState(0);
    const [paid, setPaid] = useState(0);
    const [balance, setBalance] = useState(0);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        console.log("Rows updated:", rows);
        const totalPrice = rows.reduce((sum, row) => sum + (parseFloat(row.fee) || 0), 0);
        console.log("Total price calculated:", totalPrice);
        setTotal(totalPrice);
    }, [rows]);

    useEffect(() => {
        let discountAmount = dscPkr;

        if (dscPercent > 0) {
            discountAmount = (total * dscPercent) / 100;
            setDscPkr(discountAmount.toFixed(0));
        }

        const newNet = total - discountAmount;
        setNet(newNet >= 0 ? newNet : 0);
        setBalance(newNet - paid);
    }, [total, dscPkr, dscPercent, paid]);

    useEffect(() => {
        let discountAmount = dscPkr;

        if (dscPercent > 0) {
            discountAmount = (total * dscPercent) / 100;
            setDscPkr(discountAmount.toFixed(0));
        }

        const newNet = total - discountAmount;
        setNet(newNet >= 0 ? newNet : 0);
        setBalance(newNet - paid);
    }, [total, dscPkr, dscPercent, paid]);

    useEffect(() => {
        if (patiententry) {
            setPatientEntryCell(patiententry.cell || "");
            setPatientEntryPatientName(patiententry.patient_name || "");
            setPatientEntryFatherHasbandMR(patiententry.father_hasband_MR || "");
            setPatientEntryAge(patiententry.age || "");
            setPatientEntryCompany(patiententry.company || "Doctor");
            setPatientEntryRefferedBy(patiententry.reffered_by || "Doctor");
            setPatientEntryGender(patiententry.gender || "Male");
            setPatientEntryEmail(patiententry.email || "");
            setPatientEntryAddress(patiententry.address || "");
            setPatientEntryPackage(patiententry.package || "");
            setPatientEntrySample(patiententry.sample || "");
            setPatientEntryPriority(patiententry.priority || "");
            setPatientEntryRemarks(patiententry.remarks || "");
            setPatientEntryTest(patiententry.test || "");
        } else {
            setPatientEntryCell("");
            setPatientEntryPatientName("");
            setPatientEntryFatherHasbandMR("");
            setPatientEntryAge("");
            setPatientEntryCompany("Doctor");
            setPatientEntryRefferedBy("Doctor");
            setPatientEntryGender("Male");
            setPatientEntryEmail("");
            setPatientEntryAddress("");
            setPatientEntryPackage("");
            setPatientEntrySample("");
            setPatientEntryPriority("");
            setPatientEntryRemarks("");
            setPatientEntryTest("");
        }
    }, [patiententry]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await httpClient.get("/companies_panel");
                if (Array.isArray(res)) {
                    setCompanies(res);
                } else if (Array.isArray(res.data)) {
                    setCompanies(res.data);
                }
            } catch (err) {
                console.error("Error fetching companies:", err);
            }
        };

        fetchCompanies();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await httpClient.get("/users/doctors");
                if (Array.isArray(res)) {
                    setUsers(res);
                    console.log("response",res.data  )
                } else if (Array.isArray(res.data)) {
                    setUsers(res.data);
                }
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchTestProfiles = async () => {
            try {
                const res = await httpClient.get("/test_profile");
                if (Array.isArray(res)) {
                    setTestProfiles(res);
                } else if (Array.isArray(res.data)) {
                    setTestProfiles(res.data);
                }
            } catch (err) {
                console.error("Error fetching test profiles:", err);
            }
        };

        fetchTestProfiles();
    }, []);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await httpClient.get("/test-packages");
                if (Array.isArray(res)) {
                    setPackages(res);
                } else if (Array.isArray(res.data)) {
                    setPackages(res.data);
                }
            } catch (err) {
                console.error("Error fetching packages:", err);
            }
        };

        fetchPackages();
    }, []);


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSave({
    //         patiententryCell,
    //         patiententryPatientName,
    //         patiententryFatherHasbandMR,
    //         patiententryAge,
    //         patiententryCompany,
    //         patiententryRefferedBy,
    //         patiententryGender,
    //         patiententryEmail,
    //         patiententryAddress,
    //         patiententryPackage,
    //         patiententrySample,
    //         patiententryPriority,
    //         patiententryRemarks,
    //         patiententryTest,
    //     });
    // };

    // --- baqi states same rehengi (tumhara original code) ---

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Manual Validation
        if (!patiententryCell.trim()) {
            setErrorMessage(" Please enter Cell#");
            return;
        }
        if (!patiententryPatientName.trim()) {
            setErrorMessage(" Please enter Patient Name");
            return;
        }
        if (!patiententryAge.trim()) {
            setErrorMessage(" Please enter Age");
            return;
        }
        if (!patiententryRefferedBy.trim()) {
            setErrorMessage(" Please select Referred By");
            return;
        }
        if (!patiententryGender.trim()) {
            setErrorMessage(" Please select Gender");
            return;
        }
        if (!patiententrySample.trim()) {
            setErrorMessage(" Please select Sample Type");
            return;
        }
        if (!patiententryTest.trim()) {
            setErrorMessage(" Please select Test");
            return;
        }
        const formattedTests = rows.map(row => ({
            name: row.test_name,
            fee: parseFloat(row.fee) || 0
        }));
        setErrorMessage("");
        onSave({
            patiententryCell,
            patiententryPatientName,
            patiententryFatherHasbandMR,
            patiententryAge,
            patiententryCompany,
            patiententryRefferedBy,
            patiententryGender,
            patiententryEmail,
            patiententryAddress,
            patiententryPackage,
            patiententrySample,
            patiententryPriority,
            patiententryRemarks,
            test: formattedTests
        });
    };

    const [dr, setDr] = useState("");
    const [cr, setCr] = useState("");

    const handleClick = () => {
        if (!patiententryTest) {
            return;
        }
        const selectedTest = testProfiles.find(
            (test) => test.test_name === patiententryTest
        )
        const newRow = {
            id: selectedTest?.id || rows.length + 1,
            test_name: selectedTest?.test_name || patiententryTest,
            sample_required: selectedTest?.sample_required || "N/A",
            delivery_time: selectedTest?.delivery_time || "N/A",
            fee: selectedTest?.fee || "N/A",
        };

        setRows([...rows, newRow]);
    };
    const handleDelete = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    const totalDr = rows.reduce((sum, row) => sum + row.dr, 0);
    const totalCr = rows.reduce((sum, row) => sum + row.cr, 0);
    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Cell#. :</Form.Label>
                                <Form.Control type="text" placeholder=""
                                    value={patiententryCell}
                                    onChange={(e) => setPatientEntryCell(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name"
                                    value={patiententryPatientName}
                                    onChange={(e) => setPatientEntryPatientName(e.target.value)}
                                    required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label> Father/ Husband / MR#:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={patiententryFatherHasbandMR}
                                    onChange={(e) => setPatientEntryFatherHasbandMR(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Age : </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={patiententryAge}
                                    onChange={(e) => setPatientEntryAge(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Company</Form.Label>
                                <Form.Select
                                    value={patiententryCompany}
                                    onChange={(e) => setPatientEntryCompany(e.target.value)}
                                >
                                    <option value="">Select Company</option>
                                    {companies.map((company) => (
                                        <option key={company.id} value={company.company_name}>
                                            {company.company_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Referred By:</Form.Label>
                                <Form.Select
                                    value={patiententryRefferedBy}
                                    onChange={(e) => setPatientEntryRefferedBy(e.target.value)}
                                >
                                    <option value="">Select Consultant</option>
                                    {users
                                        .filter((user) => user.role === "Doctor") // ✅ sirf Doctor role
                                        .map((doctor) => (
                                            <option key={doctor.id} value={doctor.name}>
                
                                                {doctor.name}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>


                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender :</Form.Label>
                                <Form.Select
                                    value={patiententryGender}
                                    onChange={(e) => setPatientEntryGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Email"
                                    value={patiententryEmail}
                                    onChange={(e) => setPatientEntryEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Address Here"
                                    value={patiententryAddress}
                                    onChange={(e) => setPatientEntryAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Packages</Form.Label>
                                <Form.Select
                                    value={patiententryPackage}
                                    onChange={(e) => setPatientEntryPackage(e.target.value)}
                                >
                                    <option value=""> Select Package </option>
                                    {packages.map((pkg) => (
                                        <option key={pkg.id} value={pkg.name}>
                                            {pkg.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Sample</Form.Label>
                                <Form.Select
                                    value={patiententrySample}
                                    onChange={(e) => setPatientEntrySample(e.target.value)}
                                >
                                    <option value="Take In Lab">Take In Lab</option>
                                    <option value="Received From Outside">Taken Outside Lab</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Priority</Form.Label>
                                <Form.Select
                                    value={patiententryPriority}
                                    onChange={(e) => setPatientEntryPriority(e.target.value)}
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="Urgent">Urgent</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control type="text" placeholder="remarks "
                                    value={patiententryRemarks}
                                    onChange={(e) => setPatientEntryRemarks(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Test</Form.Label>
                                <Form.Select
                                    value={patiententryTest}
                                    onChange={(e) => setPatientEntryTest(e.target.value)}
                                >
                                    <option value=""> Select Test </option>
                                    {testProfiles.map((test) => (
                                        <option key={test.id} value={test.test_name}>
                                            {test.test_name}
                                        </option>
                                    ))}
                                </Form.Select>

                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Button
                                    className="btn btn-primary fw-bold mt-4"
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={handleClick}
                                >
                                    <i className="fa fa-plus"></i>
                                </Button>
                            </Form.Group>
                        </Col>
                        {/* Table Section */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered">
                                        <thead style={{ backgroundColor: "deepskyblue" }}>
                                            <tr>
                                                <th>Sr</th>
                                                <th>Test Description</th>
                                                <th>Sample Required</th>
                                                <th>Delivery time</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {rows.length > 0 && (
                                            <tbody>
                                                {rows.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{row.test_name}</td>
                                                        <td>{row.sample_required}</td>
                                                        <td>{row.delivery_time}</td>
                                                        <td>{row.fee}</td>
                                                        <td className="text-center">
                                                            <span
                                                                className="text-danger fw-bold"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleDelete(index)}
                                                            >
                                                                X
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}

                                    </table>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Total</Form.Label>
                                <Form.Control type="number" value={total} readOnly />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>DSC PKR</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={dscPkr}
                                    onChange={(e) => setDscPkr(parseFloat(e.target.value) || 0)}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>DSC %</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={dscPercent}
                                    onChange={(e) => setDscPercent(parseFloat(e.target.value) || 0)}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Net</Form.Label>
                                <Form.Control type="number" value={net} readOnly />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Paid</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={paid}
                                    onChange={(e) => setPaid(parseFloat(e.target.value) || 0)}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control type="number" value={balance} readOnly />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Method</Form.Label>
                                <Form.Select>
                                    <option value="">Select Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="JazzCash">JazzCash</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        {/* <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Button className="btn btn-primary fw-bold mt-4"> Verify </Button>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3 mt-4">
                                <Button variant="primary" type="submit">
                                    {patiententry ? "Update" : "Submit"}
                                </Button>
                            </Form.Group>
                        </Col> */}
                    </Row>

                </Form>
            </Container >

        </>
    )
}
