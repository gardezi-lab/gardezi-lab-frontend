import { useState, useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import httpClient from "../../../../services/httpClient";
import { Row, Col, Form, Table, Modal, Button } from "react-bootstrap";
import { FaHistory, FaEye, FaFileMedical } from "react-icons/fa";
import { FaRegTrashCan, FaPenToSquare, FaPrint, FaFileInvoiceDollar, FaDollarSign } from "react-icons/fa6";
import { ConvertIdToNameArr } from "../utils/ConvertIdToNameArr";
import PatientLogModal from "../modal/PatientLogModal";
import PatientTestShow from "../modal/PatientTestShow";
import PatientDueAmountModal from "../modal/PatientDueAmountModal";
import AddParameterResult from "../modal/AddParameterResult";



export default function PatientListingTable({
    patientList, modalMode, confirmDelete, testProfiles, companyList, doctorList, testPackageList, getUpdatedPatientList,
    handleEditRecord, singlePatientList, setSelectedPatient, setLoading,isShowPatientModal
}) {
    const [updatedPatientsArray, setUpdatedPatientsArray] = useState([]);
    const [patientActivityShow, setPatientActivityShow] = useState(false);
    const [patientTest, setPatientTest] = useState();
    const [isPatientTest, setIsPatientTest] = useState(false)
    const [showPatientAmountLog, setShowPatientAmountLog] = useState(false);
    const [patientPaymentLog, setPatientPaymenLog] = useState();
    const [showParameterResult, setShowParameterResult] = useState(false);
    const [patientParameterRes, setPatientParameterRes] = useState();

    const [dedicatedPatientObj, setDedicatedPatientObj] = useState(null)

    //for edit any patient
    const handleEditPatient = (patientObject) => {
        handleEditRecord(patientObject);
        setDedicatedPatientObj(patientObject)
    }

    //for delete any patient
    const handleDeletePatient = (patientObject) => {
        confirmDelete(patientObject);
    }

    const handlePatientActivtyLog = (patientObj) => {
        // setPatientActivityLog(patientObj);
        setDedicatedPatientObj(patientObj)
        setPatientActivityShow(true);
    }

    const handlePatientPaymentLog = (patientObj) => {
        setPatientPaymenLog(patientObj);
        setShowPatientAmountLog(true);
    }

    const handlePatientTest = (patientObj) => {
        setPatientTest(patientObj);
        setIsPatientTest(true);
    }

    const handleParameterResult = (patientObj) => {
        setShowParameterResult(true);
        setPatientParameterRes(patientObj);
    }

    useEffect(() => {
        const convertedArray = ConvertIdToNameArr(patientList, testProfiles, doctorList, companyList, testPackageList);
        setUpdatedPatientsArray(convertedArray);
    }, [patientList])


    useEffect(() => {
        const getPatientById = async () => {
            try {
                setLoading(true);
                const url = `/patient_entry/${dedicatedPatientObj?.id}`;
                const response = await httpClient.get(url);
                setLoading(false);
                if (response) {
                    const convertedArray = ConvertIdToNameArr(response.data, testProfiles, doctorList, companyList, testPackageList);
                    setSelectedPatient(convertedArray[0]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPatientById();
    }, [modalMode == "edit",isShowPatientModal==true])


    return (
        <>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th style={{ width: '2.5rem' }} scope="col">Sr.</th>
                        <th style={{ width: '10rem' }} scope="col">MR#</th>
                        <th style={{ width: '10rem' }} scope="col">Phone</th>
                        <th style={{ width: '12rem' }} scope="col">Name</th>
                        <th style={{ width: '8rem' }} scope="col">Age</th>
                        <th style={{ width: '10rem' }} scope="col">Doctor</th>
                        <th style={{ width: '7rem' }} scope="col">Received/Total</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        updatedPatientsArray?.map((patientObj, index) => {
                            return (
                                <tr key={patientObj.id}>
                                    <td style={{ width: '2.5rem' }} >{index + 1}</td>
                                    <td style={{ width: '10rem' }}>{patientObj.mr_number}</td>
                                    <td style={{ width: '10rem' }}>{patientObj.cell}</td>
                                    <td style={{ width: '12rem' }}>{patientObj.patient_name}</td>
                                    <td style={{ width: '8rem' }}>{patientObj.age}</td>
                                    <td style={{ width: '10rem' }}>{patientObj.users_id?.name}</td>
                                    <td style={{ width: '8rem' }}>{patientObj.paid + " " + "/" + " " + patientObj.total_fee}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-item-center gap-2"  >
                                            <FaHistory
                                                className="FaHistory"
                                                title="View Patient Logs"
                                                onClick={() => handlePatientActivtyLog(patientObj)}
                                            />
                                            <FaDollarSign
                                                className="FaHistory"
                                                title="View payment Logs"
                                                onClick={() => handlePatientPaymentLog(patientObj)}
                                            />
                                            <FaEye
                                                className="FaEye"
                                                title="View Tests"
                                                onClick={() => handlePatientTest(patientObj)}
                                            />
                                            <FaFileMedical
                                                className="FaFileMedical"
                                                title="Add Result"
                                                onClick={() => handleParameterResult(patientObj)}
                                            />
                                            <Link to={`/patient-report?id=${patientObj.id}`} target="_blank" rel="noopener noreferrer">
                                                <FaPrint
                                                    className="FaPrint"
                                                    title="Print"
                                                />
                                            </Link>
                                            <Link to={`/patient-invoice?id=${patientObj.id}`} target="_blank" rel="noopener noreferrer">
                                                <FaFileInvoiceDollar
                                                    className="FaFileInvoiceDollar"
                                                    title="View Invoice"
                                                />
                                            </Link>
                                            <FaPenToSquare
                                                className="FaPenToSquare"
                                                title="Edit"
                                                onClick={() => handleEditPatient(patientObj)}
                                            />
                                            <FaRegTrashCan
                                                className="FaRegTrashCan"
                                                title="Delete"
                                                onClick={() => handleDeletePatient(patientObj)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <PatientLogModal
                dedicatedPatientObj={dedicatedPatientObj}
                patientActivityShow={patientActivityShow}
                setPatientActivityShow={setPatientActivityShow}
            />

            <PatientTestShow
                setIsPatientTest={setIsPatientTest}
                isPatientTest={isPatientTest}
                patientTest={patientTest}
            />

            <PatientDueAmountModal
                showPatientAmountLog={showPatientAmountLog}
                setShowPatientAmountLog={setShowPatientAmountLog}
                patientPaymentLog={patientPaymentLog}
                getUpdatedPatientList={getUpdatedPatientList}
            />

            <AddParameterResult
                setShowParameterResult={setShowParameterResult}
                showParameterResult={showParameterResult}
                patientParameterRes={patientParameterRes}
            />
        </>
    );
}
