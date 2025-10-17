import { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";
import PatientListingTable from "./others/table/PatientListingTable";
import PatientModal from "./others/modal/PatientModal";
import { useFetchPatient } from "./others/custom-hooks/useFetchPatient";
import { Modal, Button } from "react-bootstrap";
import { useFetchProfileTest } from "./others/custom-hooks/useFetchProfileTest";
import { useFetchCompanies } from "./others/custom-hooks/useFetchCompany";
import { useFetchDoctor } from "./others/custom-hooks/useFetchDoctor";
import { useFetchPackages } from "./others/custom-hooks/useFetcPackages";

export default function PatientManagement() {
    const { testProfiles, getProfileList } = useFetchProfileTest();
    const { companyList, getCompinesList } = useFetchCompanies();
    const { doctorList, getDoctor } = useFetchDoctor();
    const { testPackageList, getFetchPackage } = useFetchPackages()
    const { patientList, getUpdatedPatientList } = useFetchPatient();
    const [modalMode, setModalMode] = useState("");
    const [isShowPatientModal, setIsShowPatientModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [singlePatientList, setSinglePatientList] = useState([]);
    const [loading, setLoading] = useState(false);



    const handleEditRecord = async (patientId) => {
        const nextMode = "edit";
        const bool = false;
        setLoading(bool);
        setModalMode(nextMode);
        setIsShowPatientModal(true);
        try {
            const url = `/patient_entry/${patientId.id}`;
            const response = await httpClient.get(url);
            if (response) {
                setSinglePatientList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePatient = async () => {
        const patientId = patientToDelete
        try {
            const url = `/patient_entry/${patientId}`;
            const response = await httpClient.delete(url);
            if (response) {
                getUpdatedPatientList();
                handleCloseDeleteModal();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const confirmDelete = async (patientId) => {
        handleShowDeleteModal();
        setPatientToDelete(patientId.id);
    };

    const openPatientModal = () => {
        setModalMode("add");
        setIsShowPatientModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true)
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <h5 className="fw-bold page-header">Patient Management</h5>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={openPatientModal}
                    >
                        <i className="fas fa-plus me-2"></i> Add Patient
                    </button>
                    <button
                        className="btn  filter-btn"
                        type="button"
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            <PatientListingTable
                patientList={patientList}
                confirmDelete={confirmDelete}
                testProfiles={testProfiles}
                companyList={companyList}
                doctorList={doctorList}
                testPackageList={testPackageList}
                getUpdatedPatientList={getUpdatedPatientList}
                handleEditRecord={handleEditRecord}
                modalMode={modalMode}
                singlePatientList={singlePatientList}
                setSelectedPatient={setSelectedPatient}
                setLoading={setLoading}
                isShowPatientModal={isShowPatientModal}
            />

            <PatientModal
                isShowPatientModal={isShowPatientModal}
                setIsShowPatientModal={setIsShowPatientModal}
                modalMode={modalMode}
                selectedPatient={selectedPatient}
                testProfiles={testProfiles}
                companyList={companyList}
                doctorList={doctorList}
                testPackageList={testPackageList}
                getUpdatedPatientList={getUpdatedPatientList}
                loading={loading}
            />

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5 className="fw-semibold text-muted">
                        Are you sure you want to delete this patient?
                    </h5>
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button variant="secondary" className="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" className="primary" onClick={deletePatient} >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}