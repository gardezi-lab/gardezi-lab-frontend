import React, { useEffect, useState } from "react";
import Select from 'react-select';
import httpClient from "../../../../../services/httpClient";
import { Container, Row, Col, Modal, Button, Form, Table } from "react-bootstrap";
import { ReactSelectStyles } from "../../utils/reactSelectStyles";
import PatientVerifyModal from "./PatientVerifyModal";
import PatientHistoryModal from "./PatientHistoryModal";



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
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [patientHistory, setPatientHistory] = useState([]);
    const [errors, setErrors] = useState({});
    const [isPackageAdd, setIsPackageAdd] = useState(false)
    const [patientVerify, setPatientVerify] = useState({});
    const [amountSection, setAmountSection] = useState({
        total: false,
        dscPKR: false,
        dscPercent: false,
        net: false,
        paid: false,
    })
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
        patientBloodSample: SampleOption[0],
        testPriority: testPriorityOptions[0],
        patientRemarks: "",
        totalTestsFee: "",
        testDiscountInPKR: 0,
        testDiscountInPercent: 0,
        testNetAmount: "",
        testPaidAmount: "",
        testUnPaidAmount: "",
        paymentMethod: "cash",
        patient_id_posted: 0
    });
    const customStyles = ReactSelectStyles();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const LoggedUser = JSON.parse(localStorage.getItem("LoggedInUser"));
        const obj = {
            cell: patientFormData.patientCell,
            patient_name: patientFormData.patientName,
            father_hasband_MR: patientFormData.patientFatherHasband,
            age: patientFormData.patienAge,
            company_id: patientFormData.patientCompany["value"] || " ",
            // users_id: patientFormData.patientRefferedBy["value"],
            reff_by :patientFormData.patientRefferedBy["value"],
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
            paid: patientFormData.testPaidAmount || 0,
            patient_id_posted: patientFormData.patient_id_posted || 0,
            user_id : LoggedUser.user.id,
            token : LoggedUser.token
        }
        const validationErrors = validate();
        setErrors(validationErrors);
        console.log("validationErrors", validationErrors)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
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
            patientRefferedBy: { value: patientObj?.reff_by?.id, label: patientObj?.reff_by?.name },
            patientGender: { value: patientObj?.gender, label: patientObj?.gender },
            testPackage: { value: patientObj?.package_id?.id, label: patientObj?.package_id?.name },
            patientBloodSample: { value: patientObj?.sample, label: patientObj?.sample },
            testPriorityOptions: { value: patientObj?.priority, label: patientObj?.priority }
        }));

        const testObj = patientObj?.tests?.map((test) => {
            const obj = {
                id: test.test_id,
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
        setpatientFormData({
            ...patientFormData,
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
            patientRemarks: "",
            totalTestsFee: "",
            testDiscountInPKR: "",
            testDiscountInPercent: "",
            testNetAmount: "",
            testPaidAmount: "",
            testUnPaidAmount: "",
            paymentMethod: "cash",

        });
        setTestProfileData("");
        setErrors({});
    }

    const closePatientModal = () => {
        setIsShowPatientModal(false);
        clearPatientForm();
        setIsPackageAdd(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setpatientFormData((prev) => ({ ...prev, [name]: value }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };

            if (value.trim()) {
                delete newErrors[name];
            }

            return newErrors;
        });
    };

    const handleSelectChange = (selectedOption, name) => {
        setpatientFormData((prev) => ({ ...prev, [name]: selectedOption }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            debugger
            if (selectedOption && selectedOption.value) {
                delete newErrors[name];
            }
            return newErrors;
        });

        if (name === "testPackage") {
            const test = testPackageList.find(t => t.id == selectedOption.value);
            handlePackages(test.id);
        }
    };

    const handlePackages = async (id) => {
        try {
            const url = `/test-packages/${id}`;
            const response = await httpClient.get(url);
            if (response) {
                console.log("response", response)
                // const arr = response.tests.map((test) => {

                // const obj = {
                //     id: test.id,
                //     name: test.test_name,
                //     takenSample: test.sample_required,
                //     testDeliveryTime: Number(test.delivery_time),
                //     testFee: test.fee
                // }
                const newTests = response.tests.map((test) => ({
                    id: test.id,
                    name: test.test_name,
                    takenSample: test.sample_required,
                    testDeliveryTime: Number(test.delivery_time),
                    testFee: test.fee
                }));

                const updatedTests = [...newTests];
                if (updatedTests.length > 0) {
                    setIsPackageAdd(true);
                } else if (updatedTests.length == 0) {
                    setIsPackageAdd(false);
                }
                // const updatedTests = [...testProfileData, obj];
                setTestProfileData(updatedTests);
                setPatientVerify({
                    ...patientVerify,
                    test: updatedTests
                })

                const totalFee = updatedTests.reduce((total, test) => {
                    return total + Number(test.testFee);
                }, 0);

                if (totalFee) {
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors["totalTestsFee"];
                        return newErrors;
                    });
                    setAmountSection({
                        ...amountSection,
                        total: true,
                        net: true
                    })
                }

                // setpatientFormData({ ...patientFormData, totalTestsFee: totalFee, testNetAmount: totalFee });
                setpatientFormData(prev => ({
                    ...prev,
                    totalTestsFee: totalFee,
                    testNetAmount: totalFee
                }));

                // })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const validate = () => {
        const newErros = {};
        if (!patientFormData.patientName.trim()) newErros.patientName = "Name is required";
        if (!patientFormData.patientCell.trim()) newErros.patientCell = "Cell Number is required";
        if (!patientFormData.patienAge.trim()) newErros.patienAge = "Age is required";
        if (!patientFormData.patientRefferedBy) newErros.patientRefferedBy = "Reffered By is required";
        if (!patientFormData.patientGender) newErros.patientGender = "Gender is required";
        if (!patientFormData.totalTestsFee) newErros.totalTestsFee = "Total is required";
        return newErros;
    }

    const addResult = () => {
        const getTestResults = patientFormData.patientTest;
        if (getTestResults == undefined) {
            return;
        }
        patientFormData.patientTest.testDeliveryTime = Number(patientFormData.patientTest.testDeliveryTime)
        const updatedTests = [...testProfileData, getTestResults];
        setTestProfileData(updatedTests);
        setPatientVerify({
            ...patientVerify,
            test: updatedTests
        })

        // console.log("totalFee", totalFee);
        const totalFee = updatedTests.reduce((total, test) => {
            return total + Number(test.testFee);
        }, 0);

        console.log("totalFee", totalFee);
        if (totalFee) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors["totalTestsFee"];
                return newErrors;
            });
            setAmountSection({
                ...amountSection,
                total: true,
                net: true
            })
        }
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
        console.log("paid", paid)
        if (paid) {
            setAmountSection({
                ...amountSection,
                paid: true
            });

            setPatientVerify({
                ...patientVerify,
                name: patientFormData.patientName,
                cell: patientFormData.patientCell,
                age: patientFormData.patienAge,
                gender: patientFormData.patientGender["value"],
                consultant: patientFormData.patientRefferedBy["label"],
                total: patientFormData.totalTestsFee,
                discount: patientFormData.testDiscountInPKR,
                net: patientFormData.testNetAmount,
                paid: patientFormData.testPaidAmount,
                balenc: patientFormData.testUnPaidAmount
            })
        }
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

    const checkHistoryOfPatient = async (e) => {
        try {
            const url = `/patient_entry/cell/${patientFormData.patientCell}`;
            const response = await httpClient.get(url);
            if (response.status == 200) {
                setShowHistoryModal(true);
                setPatientHistory(response.data);
            }
            console.log(response);
        } catch (error) {

        }
    };

    const closeHistoryModal = () => {
        setShowHistoryModal(false)
    }

    const handleHistoryData = (historyObj) => {
        const gender = genderOptions.find(g => g.label == historyObj.gender);
        setpatientFormData({
            ...patientFormData,
            patienAge: historyObj.age,
            patientFatherHasband: historyObj.father_hasband_MR,
            patientName: historyObj.patient_name,
            patient_id_posted: historyObj.id,
            patientFatherHasband: historyObj.father_hasband_MR,
            patientGender: { id: gender?.id, value: gender?.value, label: gender?.label },
        });

        setErrors((prev) => {
            const newError = { ...prev };
            if (historyObj.age) {
                delete newError["patienAge"];
            }
            if (historyObj.patient_name) {
                delete newError["patientName"];
            }
            if (historyObj.gender) {
                delete newError["patientGender"]
            }
            return newError;
        });
        setShowHistoryModal(false);
    }

    const handleVerifyModal = () => {
        // showHistoryModal
        setShowVerifyModal(true);
    }

    const closeVerifyModal = () => {
        setShowVerifyModal(false);
    }

    return (
        <>
            <Modal show={isShowPatientModal} className="modal-xl" centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {modalMode == "edit" ? "Edit Patient" : "Add Patient"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <>
                        <Container>
                            <Form>
                                <Row className="mb-1">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Cell Number<span style={{ color: '#ff6666' }}> *</span></Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="patientCell"
                                                pattern="^\[3][0-9]{9}$"
                                                title="Enter a valid Pakistani mobile number. Example: +923001234567"
                                                placeholder="+923001234567"
                                                value={patientFormData.patientCell}
                                                onChange={handleChange}
                                                onBlur={checkHistoryOfPatient}
                                            />
                                            {errors?.patientCell && <p className="patient-error">{errors.patientCell}</p>}
                                        </Form.Group>

                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Name<span style={{ color: '#ff6666' }}> *</span></Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="patientName"
                                                placeholder="Enter Full Name"
                                                value={patientFormData.patientName}
                                                onChange={handleChange}
                                            />
                                            {patientFormData.patientName?.length === 30 && (
                                                <div className="text-danger small">
                                                    Maximum character limit reached.
                                                </div>
                                            )}
                                            {errors?.patientName && <p className="patient-error">{errors.patientName}</p>}
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label> Father/ Husband</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="patientFatherHasband"
                                                placeholder="Enter Father Name Or Husband"
                                                value={patientFormData.patientFatherHasband}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Age<span style={{ color: '#ff6666' }}> *</span></Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="patienAge"
                                                placeholder="Enter Age"
                                                min="0"
                                                max="120"
                                                value={patientFormData.patienAge}
                                                onChange={handleChange}
                                            />
                                            {patientFormData.patienAge > 120 && (
                                                <div className="text-danger small">Maximum age allowed is 120.</div>
                                            )}
                                            {errors?.patienAge && <p className="patient-error">{errors.patienAge}</p>}
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Row className="mb-2">
                                    <Col style={{ zIndex: "12" }}>
                                        <Form.Group>
                                            <Form.Label className="form-label">Company</Form.Label>
                                            <Select
                                                className="input-text-color"
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
                                                styles={customStyles}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col style={{ zIndex: "11" }}>
                                        <Form.Group>
                                            <Form.Label className="form-label">Referred By<span style={{ color: '#ff6666' }}> *</span></Form.Label>
                                            <Select
                                                name="patientRefferedBy"
                                                className="input-text-color"
                                                value={patientFormData.patientRefferedBy}
                                                onChange={(selectedOption) =>
                                                    handleSelectChange(selectedOption, "patientRefferedBy")
                                                }
                                                options={doctorList?.map((doctor) => ({
                                                    value: doctor.id,
                                                    label: doctor.name
                                                }))}
                                                placeholder="Select Referred By"
                                                styles={customStyles}
                                            />
                                            {errors?.patientRefferedBy && <p className="patient-error">{errors.patientRefferedBy}</p>}
                                        </Form.Group>
                                    </Col>
                                    <Col style={{ zIndex: "10" }}>
                                        <Form.Group>
                                            <Form.Label className="form-label">Gender<span style={{ color: '#ff6666' }}> *</span></Form.Label>
                                            <Select
                                                className="input-text-color"
                                                placeholder="Select Gender"
                                                name="patientGender"
                                                value={patientFormData.patientGender}
                                                onChange={(selectedOption) =>
                                                    handleSelectChange(selectedOption, "patientGender")
                                                }
                                                options={genderOptions.map((gender) => ({
                                                    value: gender.value,
                                                    label: gender.label
                                                }))}
                                                styles={customStyles}
                                            />
                                            {errors?.patientGender && <p className="patient-error">{errors.patientGender}</p>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
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

                                <Row className="mb-2">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="patientAddress"
                                                placeholder="Enter Address"
                                                value={patientFormData.patientAddress}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col style={{ zIndex: "10" }}>
                                        <Form.Group>
                                            <Form.Label className="form-label">Packages</Form.Label>
                                            <Select
                                                className="input-text-color"
                                                name="testPackage"
                                                placeholder="Select Package"
                                                value={patientFormData.testPackage}
                                                onChange={(selectedOption) =>
                                                    handleSelectChange(selectedOption, "testPackage")
                                                }
                                                options={testPackageList.map((pkg) => ({
                                                    value: pkg.id,
                                                    label: pkg.name
                                                }))}
                                                styles={customStyles}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col style={{ zIndex: "9" }}>
                                        <Form.Group>
                                            <Form.Label className="form-label">Sample</Form.Label>
                                            <Select
                                                name="patientBloodSample"
                                                value={patientFormData.patientBloodSample}
                                                placeholder="Select Sample Taken Place"
                                                onChange={(selectedOption) =>
                                                    handleSelectChange(selectedOption, "patientBloodSample")
                                                }
                                                options={SampleOption.map((sample) => ({
                                                    value: sample.value,
                                                    label: sample.label
                                                }))}
                                                styles={customStyles}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col style={{ zIndex: "8" }}>
                                        <Form.Group>
                                            <Form.Label className="form-label">Test Priority</Form.Label>
                                            <Select
                                                className="input-text-color"
                                                name="testPriorityOptions"
                                                placeholder="Select Test Priority"
                                                value={patientFormData?.testPriority}
                                                onChange={(selectedOption) =>
                                                    handleSelectChange(selectedOption, "testPriorityOptions")
                                                }
                                                options={testPriorityOptions.map((priority) => ({
                                                    value: priority.value,
                                                    label: priority.label
                                                }))}
                                                styles={customStyles}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Remarks</Form.Label>
                                            <Form.Control type="text"
                                                name="patientRemarks"
                                                placeholder="Enter Remarks "
                                                value={patientFormData.patientRemarks}
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col style={{ zIndex: "8" }}>
                                        <Form.Group>
                                            <Form.Label className="form-label">Test <span style={{ color: '#ff6666' }}> *</span></Form.Label>
                                            <Select
                                                className="input-text-color"
                                                name="patientTest"
                                                placeholder="Select Test"
                                                value={patientFormData?.patientTest}
                                                onChange={(selectedOption) =>
                                                    handleSelectChange(selectedOption, "patientTest")
                                                }
                                                options={testProfiles.map((test) => ({
                                                    value: test.id,
                                                    id: test.id,
                                                    name: test.test_name,
                                                    label: test.test_name,
                                                    takenSample: test.sample_required,
                                                    testDeliveryTime: test.delivery_time,
                                                    testFee: test.fee
                                                }))}
                                                styles={customStyles}
                                            />
                                        </Form.Group>

                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Button
                                                className="btn btn-primary fw-bold mt-4 primary"
                                                style={{ cursor: "pointer", fontSize: "12px" }}
                                                onClick={addResult}
                                                disabled={isPackageAdd}
                                                title="add test"
                                            >
                                                <i className="fa fa-plus "></i>
                                            </Button>
                                        </Form.Group>
                                    </Col>
                                    <div className="table-responsive mt-3">
                                        <Table className="table table-bordered table-sm">
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

                                        </Table>
                                    </div>
                                </Row>

                                <Row className="mb-2">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Total<span style={{ color: '#ff6666' }}> *</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="totalTestsFee"
                                                value={patientFormData.totalTestsFee}
                                                readOnly
                                            />
                                            {errors?.totalTestsFee && <p className="patient-error">{errors.totalTestsFee}</p>}
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
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
                                        <Form.Group>
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
                                        <Form.Group>
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
                                        <Form.Group>
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
                                        <Form.Group>
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
                                        <Form.Group>
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
                    <Button variant="secondary" className="primary"
                        disabled={!(amountSection.total && amountSection.paid)}
                        onClick={handleVerifyModal}>
                        Verify
                    </Button>
                    <Button variant="primary" className="primary" onClick={handleSubmit} >
                        {modalMode == "edit" ? "Update Patient" : "Save Patient"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <PatientHistoryModal
                showHistoryModal={showHistoryModal}
                patientHistory={patientHistory}
                handleHistoryData={handleHistoryData}
                closeHistoryModal={closeHistoryModal}
            />

            <PatientVerifyModal
                showVerifyModal={showVerifyModal}
                closeVerifyModal={closeVerifyModal}
                patientVerify={patientVerify}
            />
        </>
    );
}