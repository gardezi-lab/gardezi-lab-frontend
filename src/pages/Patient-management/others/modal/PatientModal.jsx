import React, { useEffect, useState } from "react";
import Select from 'react-select';
import httpClient from "../../../../services/httpClient";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";



const genderOptions = [
    { id: 1, value: "male", label: "male", name: "male" },
    { id: 2, value: "female", label: "female", name: "female" },
    { id: 3, value: "other", label: "other", name: "other" },
];

const SampleOption = [
    { id: 1, value: 'Taken in Lab', label: 'Taken in Lab' },
    { id: 2, value: 'Taken outside Lab', label: 'Taken outside Lab' },
]

const testPriorityOptions = [
    { id: 1, value: 'Normal', label: 'Normal' },
    { id: 2, value: 'Urgent', label: 'Urgent' },
]

export default function PatientModal({
    isShowPatientModal, loading,
    setIsShowPatientModal,
    getUpdatedPatientList, modalMode, selectedPatient, testProfiles, companyList, doctorList, testPackageList
}) {
    const [testProfileData, setTestProfileData] = useState([]);
    const [patientFormData, setpatientFormData] = useState({
        patientCell: "",
        patientName: "",
        patientFatherHasband: "",
        patienAge: "",
        patientCompany: "",
        patientRefferedBy: "",
        patientGender: "",
        patientEmail: "",
        patientAddress: "",
        testPackage: "",
        patientBloodSample: "",
        patientRemarks: "",
        totalTestsFee: "",
        testDiscountInPKR: 0,
        testDiscountInPercent: 0,
        testNetAmount: "",
        testPaidAmount: "",
        testUnPaidAmount: "",
        paymentMethod: "cash",
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            cell: patientFormData.patientCell,
            patient_name: patientFormData.patientName,
            father_hasband_MR: patientFormData.patientFatherHasband,
            age: patientFormData.patienAge,
            company_id: patientFormData.patientCompany["value"] || " ",
            users_id: patientFormData.patientRefferedBy["value"],
            gender: patientFormData.patientGender["value"],
            email: patientFormData.patientEmail,
            address: patientFormData.patientAddress,
            package_id: patientFormData.testPackage["value"] || " ",
            sample: patientFormData.patientBloodSample["value"],
            priority: patientFormData?.testPriorityOptions?.value || " ",
            remarks: patientFormData.patientRemarks,
            test: testProfileData,
            total_fee: patientFormData.testNetAmount,
            discount: patientFormData.testDiscountInPKR || 0,
            paid: patientFormData.testPaidAmount || 0

        }
        try {
            if (modalMode == "edit") {
                const url = `/patient_entry/${selectedPatient.id}`;
                const response = await httpClient.put(url, obj);
            } else {
                const url = `/patient_entry/`;
                const response = await httpClient.post(url, obj);
            }

            getUpdatedPatientList();

        } catch (error) {
            console.log(error)
        } finally {
            closePatientModal();
        }
    };

    const patchSelectedPatient = (patientObj) => {
        const totalFee = patientObj?.tests?.reduce((total, test) => {
            return total + Number(test.fee);
        }, 0);
        const discountPercent = (patientObj?.discount / totalFee) * 100;
        setpatientFormData({
            ...patientFormData,
            patientCell: patientObj?.cell,
            patientName: patientObj?.patient_name,
            patientFatherHasband: patientObj?.father_hasband_MR,
            patienAge: patientObj?.age,
            patientEmail: patientObj?.email,
            patientAddress: patientObj?.address,
            patientRemarks: patientObj?.remarks,
            totalTestsFee: totalFee,
            testDiscountInPKR: patientObj?.discount,
            testDiscountInPercent: discountPercent,
            testNetAmount: totalFee - patientObj?.discount,
            testPaidAmount: patientObj?.paid,
            testUnPaidAmount: (totalFee - patientObj?.discount) - patientObj?.paid,
            paymentMethod: "cash",
        })
    }

    const patchedDropDownFields = (patientObj) => {
        setpatientFormData((prev) => ({
            ...prev,
            patientCompany: { value: patientObj?.company_id?.id, label: patientObj?.company_id?.company_name },
            patientRefferedBy: { value: patientObj?.users_id?.id, label: patientObj?.users_id?.name },
            patientGender: { value: patientObj?.gender, label: patientObj?.gender },
            testPackage: { value: patientObj?.package_id?.id, label: patientObj?.package_id?.name },
            patientBloodSample: { value: patientObj?.sample, label: patientObj?.sample },
            testPriorityOptions: { value: patientObj?.priority, label: patientObj?.priority }
        }));

        const testObj = patientObj?.tests?.map((test) => {
            const obj = {
                id: test.patient_test_id,
                name: test.test_name,
                label: test.test_name,
                takenSample: test?.sample_required || 'null',
                testDeliveryTime: Number(test?.delivery_time),
                testFee: test.fee
            }
            return obj;
        })
        setTestProfileData(testObj)
    }

    const clearPatientForm = () => {
        console.log("hello chacho")
        setpatientFormData({
            patientCell: "",
            patientName: "",
            patientFatherHasband: "",
            patienAge: "",
            patientCompany: "",
            patientRefferedBy: "",
            patientGender: "",
            patientEmail: "",
            patientAddress: "",
            testPackage: "",
            patientBloodSample: "",
            patientRemarks: "",
            totalTestsFee: "",
            testDiscountInPKR: "",
            testDiscountInPercent: "",
            testNetAmount: "",
            testPaidAmount: "",
            testUnPaidAmount: "",
            paymentMethod: "cash",
        });
        setTestProfileData("")


    }

    const closePatientModal = () => {
        setIsShowPatientModal(false);
        clearPatientForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setpatientFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption, name) => {
        setpatientFormData((prev) => ({ ...prev, [name]: selectedOption }));
    };

    const addResult = () => {
        const getTestResults = patientFormData.patientTest;
        patientFormData.patientTest.testDeliveryTime = Number(patientFormData.patientTest.testDeliveryTime)
        const updatedTests = [...testProfileData, getTestResults];
        setTestProfileData(updatedTests);

        const totalFee = updatedTests.reduce((total, test) => {
            return total + Number(test.testFee);
        }, 0);

        setpatientFormData({ ...patientFormData, totalTestsFee: totalFee, testNetAmount: totalFee });
    };

    const deleteTest = (index, fee) => {
        setTestProfileData(testProfileData.filter(item => item.id !== index));
        setpatientFormData((prev) => ({
            ...prev,
            totalTestsFee: prev.totalTestsFee - fee,
            // testNetAmount:prev.testNetAmount - fee

        }))
    }

    const handleDiscountChange = (type, value) => {
        let total = Number(patientFormData.totalTestsFee) || 0;
        let discountInPKR = 0;

        if (type === "pkr") {
            discountInPKR = Number(value);
        } else if (type === "percent") {
            discountInPKR = (total * Number(value)) / 100;
        }

        let net = total - discountInPKR;

        setpatientFormData((prev) => ({
            ...prev,
            testDiscountInPKR: type === "pkr" ? value : discountInPKR,
            testDiscountInPercent: type === "percent" ? value : "",
            testNetAmount: net,
        }));
    };

    const handlePaidChange = (value) => {
        let net = Number(patientFormData.testNetAmount);
        let paid = Number(value);
        let due = net - paid;

        setpatientFormData((prev) => ({
            ...prev,
            testPaidAmount: value,
            testUnPaidAmount: due,
        }));
    };

    useEffect(() => {
        if (modalMode == "edit") {
            clearPatientForm();
            patchSelectedPatient(selectedPatient);
            patchedDropDownFields(selectedPatient);
        }
    }, [selectedPatient, isShowPatientModal == true]);

    return (
        <Modal show={isShowPatientModal} className="modal-xl">
            <Modal.Header className="primary">
                <Modal.Title className="color-white fw-bold">
                    {modalMode == "edit" ? "Edit Patient" : "Add Patient"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <>
                    <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Cell Number</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="patientCell"
                                            pattern="^\[3][0-9]{9}$"
                                            title="Enter a valid Pakistani mobile number. Example: +923001234567"
                                            placeholder="+923001234567"
                                            value={patientFormData.patientCell}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="patientName"
                                            placeholder="Enter full name"
                                            value={patientFormData.patientName}
                                            onChange={handleChange}
                                        />
                                        {patientFormData.patientName?.length === 30 && (
                                            <div className="text-danger small">
                                                Maximum character limit reached.
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label> Father/ Husband:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="patientFatherHasband"
                                            placeholder="Enter Father name or Husband"
                                            value={patientFormData.patientFatherHasband}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Age:</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="patienAge"
                                            placeholder="Enter age"
                                            min="0"
                                            max="120"
                                            value={patientFormData.patienAge}
                                            onChange={handleChange}
                                        />
                                        {patientFormData.patienAge > 120 && (
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
                                            name="patientCompany"
                                            value={patientFormData.patientCompany}
                                            placeholder="Select Company"
                                            onChange={(selectedOption) =>
                                                handleSelectChange(selectedOption, "patientCompany")
                                            }
                                            options={companyList?.map((company) => ({
                                                value: company.id,
                                                label: company.company_name
                                            }))}

                                        />
                                    </Form.Group>
                                </Col>

                                <Col style={{ zIndex: "11" }}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Referred By:</Form.Label>
                                        <Select
                                            name="patientRefferedBy"
                                            value={patientFormData.patientRefferedBy}
                                            onChange={(selectedOption) =>
                                                handleSelectChange(selectedOption, "patientRefferedBy")
                                            }
                                            options={doctorList?.map((doctor) => ({
                                                value: doctor.id,
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
                                            name="patientGender"
                                            value={patientFormData.patientGender}
                                            onChange={(selectedOption) =>
                                                handleSelectChange(selectedOption, "patientGender")
                                            }
                                            options={genderOptions.map((gender) => ({
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
                                            type="email"
                                            name="patientEmail"
                                            placeholder="Enter Email"
                                            value={patientFormData.patientEmail}
                                            onChange={handleChange}
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
                                            name="patientAddress"
                                            placeholder="Address Here"
                                            value={patientFormData.patientAddress}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col style={{ zIndex: "10" }}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Packages</Form.Label>
                                        <Select
                                            name="testPackage"
                                            placeholder="select packages"
                                            value={patientFormData.testPackage}
                                            onChange={(selectedOption) =>
                                                handleSelectChange(selectedOption, "testPackage")
                                            }
                                            options={testPackageList.map((pkg) => ({
                                                value: pkg.id,
                                                label: pkg.name
                                            }))}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col style={{ zIndex: "9" }}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Sample</Form.Label>
                                        <Select
                                            name="patientBloodSample"
                                            value={patientFormData.patientBloodSample}
                                            placeholder="select lab"
                                            onChange={(selectedOption) =>
                                                handleSelectChange(selectedOption, "patientBloodSample")
                                            }
                                            options={SampleOption.map((sample) => ({
                                                value: sample.value,
                                                label: sample.label
                                            }))}

                                        />
                                    </Form.Group>
                                </Col>
                                <Col style={{ zIndex: "8" }}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Test Priority</Form.Label>
                                        <Select
                                            name="testPriorityOptions"
                                            placeholder="select Priority"
                                            value={patientFormData?.testPriorityOptions}
                                            onChange={(selectedOption) =>
                                                handleSelectChange(selectedOption, "testPriorityOptions")
                                            }
                                            options={testPriorityOptions.map((priority) => ({
                                                value: priority.value,
                                                label: priority.label
                                            }))}

                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control type="text"
                                            name="patientRemarks"
                                            placeholder="remarks "
                                            value={patientFormData.patientRemarks}
                                            onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col style={{ zIndex: "8" }}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Test</Form.Label>
                                        <Select
                                            name="patientTest"
                                            placeholder="Select Test"
                                            value={patientFormData.patientTest}
                                            onChange={(selectedOption) =>
                                                handleSelectChange(selectedOption, "patientTest")
                                            }
                                            options={testProfiles.map((test) => ({
                                                id: test.id,
                                                name: test.test_name,
                                                label: test.test_name,
                                                takenSample: test.sample_required,
                                                testDeliveryTime: test.delivery_time,
                                                testFee: test.fee
                                            }))}
                                        />

                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3">
                                        <Button
                                            className="btn btn-primary fw-bold mt-4 primary"
                                            style={{ cursor: "pointer", fontSize: "12px" }}
                                            onClick={addResult}
                                            title="add test"
                                        >
                                            <i className="fa fa-plus "></i>
                                        </Button>
                                    </Form.Group>
                                </Col>

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
                                                {testProfileData?.length > 0 && (
                                                    <tbody>
                                                        {testProfileData?.map((row, index) => (
                                                            <tr key={index}>
                                                                <td className='text-center'>{index + 1}</td>
                                                                <td>{row.name}</td>
                                                                <td>{row.takenSample}</td>
                                                                <td>{row.testDeliveryTime}</td>
                                                                <td>{row.testFee}</td>
                                                                <td className="text-center">
                                                                    <span
                                                                        className="text-danger fw-bold"
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => deleteTest(row.id, row.testFee)}
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
                                        <Form.Control
                                            type="number"
                                            name="totalTestsFee"
                                            value={patientFormData.totalTestsFee}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>DSC PKR</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="testDiscountInPKR"
                                            value={patientFormData.testDiscountInPKR}
                                            placeholder="Discount PKR"
                                            onChange={(e) => handleDiscountChange("pkr", e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>DSC %</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="testDiscountInPercent"
                                            value={patientFormData.testDiscountInPercent}
                                            placeholder="Discount %"
                                            onChange={(e) => handleDiscountChange("percent", e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Net</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="testNetAmount"
                                            value={patientFormData.testNetAmount}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Paid</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="testPaidAmount"
                                            value={patientFormData.testPaidAmount}
                                            placeholder="Paid Amount"
                                            onChange={(e) => handlePaidChange(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Due Balance</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="testUnPaidAmount"
                                            value={patientFormData.testUnPaidAmount}
                                            readOnly
                                        />
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
                            </Row>


                        </Form>
                    </Container>
                </>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" className="secondary" onClick={closePatientModal}>
                    Cancel & Close
                </Button>
                {/* <Button variant="secondary" className="secondary" onClick={closePatientModal}>
                    Reset to Default
                </Button> */}
                <Button variant="primary" className="primary" onClick={handleSubmit} >
                    {modalMode == "edit" ? "Update Patient" : "Save Patient"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}