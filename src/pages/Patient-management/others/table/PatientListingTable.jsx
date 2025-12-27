import { useState, useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import httpClient from "../../../../services/httpClient";
import { Row, Col, Form, Table, Modal, Button } from "react-bootstrap";
import { FaHistory, FaEye, FaFileMedical } from "react-icons/fa";
import {
    FaRegTrashCan, FaPenToSquare, FaPrint, FaFileInvoiceDollar, FaDollarSign,

    FaCheck, FaCheckDouble
} from "react-icons/fa6";
import { ConvertIdToNameArr } from "../utils/ConvertIdToNameArr";
import PatientLogModal from "../modal/PatientLogModal";
import PatientTestShow from "../modal/PatientTestShow";
import PatientDueAmountModal from "../modal/PatientDueAmountModal";
import ParameterResult from "../modal/ParameterResult";



export default function PatientListingTable({
    patientList, modalMode, confirmDelete, testProfiles, companyList, doctorList, testPackageList, getUpdatedPatientList,
    handleEditRecord, singlePatientList, setSelectedPatient, setLoading, isShowPatientModal
}) {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
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
        debugger
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
        console.log("pt convertedArray", convertedArray);
        setUpdatedPatientsArray(convertedArray);
    }, [patientList])


    useEffect(() => {
        const getPatientById = async () => {
            try {

                setLoading(true);
                const url = `/patient_entry/${dedicatedPatientObj?.cid}`;
                const response = await httpClient.get(url);
                console.log("edit call", response)
                setLoading(false);
                if (response) {
                    const convertedArray = ConvertIdToNameArr(response, testProfiles, doctorList, companyList, testPackageList);
                    console.log("vonvertarray", convertedArray)
                    setSelectedPatient(convertedArray[0]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPatientById();
    }, [modalMode == "edit", isShowPatientModal == true])


    return (
        <>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Date</th>
                        <th scope="col">MR#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Age</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Amount</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        updatedPatientsArray?.map((patientObj, index) => {
                            const formattedName = patientObj.patient_name
                                .split(" ")
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(" ");
                            return (
                                <tr key={index + 1}>
                                    <td  >{index + 1}</td>
                                    <td >
                                        {patientObj.date_created}
                                    </td>
                                    <td >{patientObj.mr_number}</td>

                                    <td style={{ display: 'flex', justifyContent: "space-between" }}>
                                        {formattedName}
                                        {patientObj?.status == 0 ? (
                                            <FaCheck />
                                        ) : patientObj?.status == 1 ? (
                                            <FaCheckDouble />
                                        ) : (
                                            <FaCheckDouble color="green" />
                                        )
                                        }
                                    </td>
                                    <td >{patientObj.cell}</td>
                                    <td >{patientObj.age}</td>
                                    <td >{patientObj.reff_by?.name}</td>
                                    <td >{patientObj.paid + " " + "/" + " " + patientObj.total_fee}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-item-center gap-2"  >
                                            <FaHistory
                                                className="FaHistory"
                                                title="View Patient Logs"
                                                onClick={() => handlePatientActivtyLog(patientObj)}
                                            />
                                            {/* <FaDollarSign
                                                className="FaHistory"
                                                title="View payment Logs"
                                                onClick={() => handlePatientPaymentLog(patientObj)}
                                            /> */}
                                            <FaEye
                                                className="FaEye"
                                                title="View Tests"
                                                onClick={() => handlePatientTest(patientObj)}
                                            />
                                            {permissions["Add Results"] === 1 &&
                                            <FaFileMedical
                                                className="FaFileMedical"
                                                title="Add Result"
                                                onClick={() => handleParameterResult(patientObj)}
                                            />
                        }
                                            {/* <Link to={`/patient-report?id=${patientObj.cid}`} target="_blank" rel="noopener noreferrer">
                                                <FaPrint
                                                    className="FaPrint"
                                                    title="Print"
                                                />
                                            </Link> */}
                                            <Link to={`/patient-management/invoice?id=${patientObj.cid}`} target="_blank" rel="noopener noreferrer">
                                                <FaFileInvoiceDollar
                                                    className="FaFileInvoiceDollar"
                                                    title="View Invoice"
                                                />
                                            </Link>
                                            {permissions["Patient Edit"] === 1 &&
                                                <FaPenToSquare
                                                    className="FaPenToSquare"
                                                    title="Edit"
                                                    onClick={() => handleEditPatient(patientObj)}
                                                />
                                            }
                                            {permissions["Patient Delete"] === 1 &&
                                                <FaRegTrashCan
                                                    className="FaRegTrashCan"
                                                    title="Delete"
                                                    onClick={() => handleDeletePatient(patientObj)}
                                                />
                                            }
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
                getUpdatedPatientList={getUpdatedPatientList}
            />

            {/* <PatientDueAmountModal
                showPatientAmountLog={showPatientAmountLog}
                setShowPatientAmountLog={setShowPatientAmountLog}
                patientPaymentLog={patientPaymentLog}
                getUpdatedPatientList={getUpdatedPatientList}
            /> */}

            <ParameterResult
                setShowParameterResult={setShowParameterResult}
                showParameterResult={showParameterResult}
                patientParameterRes={patientParameterRes}
            />
        </>
    );
}
