import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import httpClient from "../../../../services/httpClient";

const gender = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
]
const lab = [
    { value: 'Take In Lab', label: 'Take In Lab' },
    { value: 'Taken Outside Lab', label: 'Taken Outside Lab' },
]

const Priority = [
    { value: 'Normal', label: 'Normal' },
    { value: 'Urgent', label: 'Urgent' },

]

export default function PatientEntryModal({ onSave }) {

    const [patiententryCell, setPatientEntryCell] = useState("");
    const [patiententryPatientName, setPatientEntryPatientName] = useState("");
    const [patiententryFatherHasbandMR, setPatientEntryFatherHasbandMR] = useState("");
    const [patiententryAge, setPatientEntryAge] = useState("");
    const [patiententryCompany, setPatientEntryCompany] = useState("");
    const [patiententryRefferedBy, setPatientEntryRefferedBy] = useState("");
    const [patiententryGender, setPatientEntryGender] = useState([]);
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
    const [selectedOption, setSelectedOption] = useState(null);

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
            setPatientEntryCompany(patiententry.company || "");
            setPatientEntryRefferedBy(patiententry.reffered_by);
            setPatientEntryGender(patiententry.gender);

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
            setPatientEntryCompany("");
            setPatientEntryRefferedBy("");
            setPatientEntryGender("");
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
                    console.log("response", res.data)
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
                console.log("profie ressponse data", res.data)
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


    const handleSubmit = (e) => {
        e.preventDefault();

        // Manual Validation
        if (!patiententryCell.trim()) {
            setErrorMessage(" Please enter Cell#");
            return;
        }
        if (!patiententryPatientName.trim) {
            setErrorMessage(" Please enter Patient Name");
            return;
        }
        if (!patiententryAge.trim) {
            setErrorMessage(" Please enter Age");
            return;
        }
        // if (!patiententryRefferedBy.trim()) {
        //     setErrorMessage(" Please select Referred By");
        //     return;
        // }
        if (!patiententryGender.trim()) {
            setErrorMessage(" Please select Gender");
            return;
        }
        if (!patiententrySample.trim) {
            setErrorMessage(" Please select Sample Type");
            return;
        }
        // if (!patiententryTest.trim) {
        //     setErrorMessage(" Please select Test");
        //     return;
        // }
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

    // const handleClick = () => {
    //     if (!patiententryTest) {
    //         return;
    //     }
    //     const selectedTest = testProfiles.find(
    //         (test) => test.test_name === patiententryTest.value
    //     )
    //     const newRow = {
    //         id: selectedTest?.id || rows.length + 1,
    //         test_name: selectedTest?.test_name || patiententryTest,
    //         sample_required: selectedTest?.sample_required || "N/A",
    //         delivery_time: selectedTest?.delivery_time || "N/A",
    //         fee: selectedTest?.fee || "N/A",
    //     };

    //     setRows([...rows, newRow]);
    // };
    const handleClick = () => {
        debugger
        if (!patiententryTest) {
            return;
        }
        const selectedTest = testProfiles.find(
            (test) => test.test_name === patiententryTest.label
        )
        const newRow = {
            id: selectedTest.id,
            test_name: selectedTest.test_name,
            sample_required: selectedTest.sample_required || "N/A",
            delivery_time: selectedTest.delivery_time || "N/A",
            fee: selectedTest.fee || "N/A",
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
                            <Form.Group className="mb-3">
                                <Form.Label>Cell Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="phone_no"
                                    name="phone_no"
                                    // pattern="^\+92[3][0-9]{9}$"
                                    title="Enter a valid Pakistani mobile number. Example: +923001234567"
                                    placeholder="+923001234567"
                                    value={patiententryCell}
                                    onChange={(e) => setPatientEntryCell(e.target.value)}
                                // required
                                />
                            </Form.Group>

                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="patientName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter full name"
                                    value={patiententryPatientName}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        // Allow only alphabets and spaces, and limit to 30 characters
                                        if (/^[A-Za-z\s]{0,30}$/.test(input)) {
                                            setPatientEntryPatientName(input);
                                        }
                                    }}
                                    required
                                />
                                {patiententryPatientName.length === 30 && (
                                    <div className="text-danger small">
                                        Maximum character limit reached.
                                    </div>
                                )}
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
                            <Form.Group className="mb-3" controlId="patientAge">
                                <Form.Label>Age:</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter age"
                                    min="0"
                                    max="120"
                                    value={patiententryAge}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        // Allow only numbers and restrict to 0–120
                                        if (input === "" || (/^\d{0,3}$/.test(input) && Number(input) <= 120)) {
                                            setPatientEntryAge(input);
                                        }
                                    }}
                                    required
                                />
                                {patiententryAge > 120 && (
                                    <div className="text-danger small">Maximum age allowed is 120.</div>
                                )}
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col style={{ zIndex: "12" }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Company</Form.Label>
                                <Select
                                    value={patiententryCompany}
                                    onChange={(selectedOption) => setPatientEntryCompany(selectedOption)}
                                    options={companies.map((company) => ({
                                        value: company.id,
                                        label: company.company_name
                                    }))}
                                    placeholder="Select Company"
                                />
                            </Form.Group>
                        </Col>

                        <Col style={{ zIndex: "11" }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Referred By:</Form.Label>
                                <Select
                                    value={patiententryRefferedBy}
                                    onChange={(selectedOption) => setPatientEntryRefferedBy(selectedOption)}
                                    options={users.map((doctor) => ({
                                        value: doctor.name,
                                        label: doctor.name
                                    }))}
                                    placeholder="select doctor"
                                />
                            </Form.Group>
                        </Col>
                        <Col style={{ zIndex: "10" }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender :</Form.Label>
                                <Select
                                    placeholder="select gender"
                                    defaultValue={patiententryGender}
                                    onChange={(selectedValue) => setPatientEntryGender(selectedValue.value)}
                                    options={gender.map((gender) => ({
                                        value: gender.value,
                                        label: gender.label
                                    }))}
                                />
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
                        <Col style={{ zIndex: "10" }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Packages</Form.Label>
                                <Select
                                    value={patiententryPackage}
                                    onChange={(selectedOption) => setPatientEntryPackage(selectedOption)}
                                    options={packages.map((pkg) => ({
                                        value: pkg.id,
                                        label: pkg.name
                                    }))}
                                    placeholder="select packages"
                                />
                            </Form.Group>
                        </Col>

                        <Col style={{ zIndex: "9" }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sample</Form.Label>
                                <Select
                                    defaultValue={patiententrySample}
                                    onChange={(selectedValue) => setPatientEntrySample(selectedValue.value)}
                                    options={lab.map((lab) => ({
                                        value: lab.value,
                                        label: lab.label
                                    }))}
                                    placeholder="select lab"
                                />
                            </Form.Group>
                        </Col>
                        <Col style={{ zIndex: "8" }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Priority</Form.Label>
                                <Select
                                    options={Priority}
                                    placeholder="select Priority"
                                />
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
                        <Col style={{ zIndex: "8" }}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Test</Form.Label>
                                <Select
                                    value={patiententryTest}
                                    onChange={(selectedOption) => {
                                        setPatientEntryTest(selectedOption)
                                    }}
                                    options={testProfiles.map((test) => ({
                                        value: test.id,
                                        label: test.test_name
                                    }))}
                                />



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
                        <div className="row card shadow-sm border-0">
                            <div className="col-md-12 card-body p-0">
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered table-sm">
                                        <thead style={{ backgroundColor: "deepskyblue" }}>
                                            <tr>
                                                <th className='text-center'>Sr</th>
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
                                                        <td className='text-center'>{index + 1}</td>
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
