import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import PatientListingTable from "../../others/table/PatientListingTable";
// import PatientModal from "./others/modal/PatientModal";
import FilterModal from "../../others/modal/FilterModal";
import PatientModal from '../../others/modal/patient-modal/PatientModal'
import { useFetchPatient } from "../../others/custom-hooks/useFetchPatient";
import { Modal, Button, Pagination } from "react-bootstrap";
import { useFetchProfileTest } from "../../others/custom-hooks/useFetchProfileTest";
import { useFetchCompanies } from "../../others/custom-hooks/useFetchCompany";
import { useFetchDoctor } from "../../others/custom-hooks/useFetchDoctor";
import { useFetchPackages } from "../../others/custom-hooks/useFetcPackages";

export default function PatientManagement() {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
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
    const [showFilterModal, setShowFilterModal] = useState(false);

    //Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 30;


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
        const patientId = patientToDelete;
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

    const Permanentdelete = async () => {
        const patientId = patientToDelete;
        try {
            const url = `/patient_entry/all_delete/${patientId}`;
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
        setPatientToDelete(patientId.cid);
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

    const handleFilterModal = () => {
        setShowFilterModal(true);
    }

    const renderPaginationItems = () => {
        let items = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            items.push(
                <Pagination.Item key={1} active={page === 1} onClick={() => setPage(1)}>
                    1
                </Pagination.Item>
            );

            if (page > 3) items.push(<Pagination.Ellipsis key="start-ellipsis" />);

            if (page > 2 && page < totalPages - 1) {
                items.push(
                    <Pagination.Item key={page} active onClick={() => setPage(page)}>
                        {page}
                    </Pagination.Item>
                );
            }

            if (page < totalPages - 2) items.push(<Pagination.Ellipsis key="end-ellipsis" />);

            items.push(
                <Pagination.Item
                    key={totalPages}
                    active={page === totalPages}
                    onClick={() => setPage(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }
        return items;
    };

    useEffect(() => {
        getUpdatedPatientList({
            page,
            limit: recordPerPage
        });
    }, [page]);

    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <h5 className="fw-bold page-header">Patient Management</h5>
                <div className="d-flex gap-2">
                    {permissions["Patients Add"] == 1 &&
                        <button
                            className="btn btn-success primary"
                            type="button"
                            onClick={openPatientModal}
                        >
                            <i className="fas fa-plus me-2"></i> Add Patient
                        </button>
                    }
                    <button
                        className="btn filter-btn"
                        type="button"
                        onClick={handleFilterModal}
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

            <div className="d-flex justify-content-end align-items-center mt-3">
                <Pagination >
                    <Pagination.Prev
                        onClick={() => page > 1 && setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Pagination.Prev>
                    {renderPaginationItems()}
                    <Pagination.Next

                        onClick={() => page < totalPages && setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </Pagination.Next>
                </Pagination>
            </div>

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

            <FilterModal
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}

                getUpdatedPatientList={getUpdatedPatientList}
            />

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header className="primary"  >
                    <Modal.Title className="color-white fw-bold">Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5 className="fw-semibold text-muted">
                        Are you sure you want to delete this patient?
                    </h5>
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button variant="secondary" size="sm" className="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" size="sm" onClick={deletePatient}
                        style={{
                            backgroundColor: "#e74c3c",
                            borderColor: "#c0392b",
                        }}
                    >
                        Delete Visit
                    </Button>
                    <Button variant="danger" size="sm" onClick={Permanentdelete}
                        style={{
                            backgroundColor: "#c0392b",
                            borderColor: "#922b21",
                        }}
                    >
                        Delete Record
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}