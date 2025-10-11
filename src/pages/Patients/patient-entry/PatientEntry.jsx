import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import PatientEntryModal from "./modal/PatientEntryModal";
import Button from 'react-bootstrap/Button';
import httpClient from "../../../services/httpClient";
import PatientEntryTable from "./table/PatientEntryTable";
import Pagination from "react-bootstrap/Pagination";
import FilterModal from "./modal/FilterModal";

export default function PatientEntry() {
    const [showPatientEntryModal, setShowPatientEntryModal] = useState(false);
    const [patiententryList, setPatientEntryList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedPatientEntry, setSelectedPatientEntry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 15;
    const [search, setSearch] = useState("");

    const [showFilterModal, setShowFilterModal] = useState(false);

    const handleCloseFilterModal = () => setShowFilterModal(false);
    const handleShowFilterModal = () => setShowFilterModal(true);

    const handleVerify = () => {
        console.log("Verify clicked");
    };

    const handleClose = () => {
        setShowPatientEntryModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedPatientEntry(null);
    };
    const handleShow = () =>
        setShowPatientEntryModal(true);

    const getPatientEntryData = async () => {
        setLoading(true);
        try {
            const url = `/patient_entry?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

            const response = await httpClient.get(url);
            if (response) {
                setPatientEntryList(response.data || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error("Fetch PatientEntry Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {

        setLoading(true);
        try {
            const obj = {
                cell: formData.patiententryCell,
                patient_name: formData.patiententryPatientName,
                father_hasband_MR: formData.patiententryFatherHasbandMR,
                age: formData.patiententryAge,
                company: formData.patiententryCompany,
                reffered_by: formData.patiententryRefferedBy.value,
                gender: formData.patiententryGender,
                email: formData.patiententryEmail,
                address: formData.patiententryAddress,
                package: formData.patiententryPackage,
                sample: formData.patiententrySample,
                priority: formData.patiententryPriority,
                remarks: formData.patiententryRemarks,
                test: formData.test
            };

            if (isCurrentEditModalOpen && selectedPatientEntry) {
                await httpClient.put(
                    `/patient_entry/${selectedPatientEntry.id}`,
                    obj
                );
            } else {
                await httpClient.post("/patient_entry/", obj);
            }

            getPatientEntryData();
        } catch (err) {
            console.error("Save PatientEntry Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };
    
    const handleEdit = (dep) => {
        setSelectedPatientEntry(dep);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/patient_entry/${id}`);
            getPatientEntryData();
        } catch (err) {
            console.error("Delete PatientEntry Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPatientEntryData();
    }, [page, search]);
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

    return (
        <>

            {/* Page name and filter */}

            <div className="d-flex justify-content-between mb-2">
                <h5 className="fw-bold page-header">Patient Management</h5>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={() => {
                            setIsCurrentEditModalOpen(false);
                            handleShow();
                        }}
                    >
                        <i className="fas fa-plus me-2"></i> Add Patient
                    </button>
                    <button
                        className="btn  filter-btn"
                        type="button"
                        onClick={() => { handleShowFilterModal(true) }}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            {/* Patient Listing Table */}
            <PatientEntryTable
                patiententryList={patiententryList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading} />

            {/* Pagination and Export to excel  */}

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary primary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </button>
                {/* Right side pagination */}


                <Pagination>
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

            <Modal
                show={showPatientEntryModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-xl"
            >
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">New Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PatientEntryModal
                        onSave={handleSave}
                        patiententry={selectedPatientEntry}
                        onCancel={handleClose}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleVerify();
                        }} >
                        Verify
                    </Button>
                    
                    <Button
                        variant="primary"
                        onClick={() => {handleSave}}>
                        {selectedPatientEntry ? "Update" : "Submit"}
                    </Button>

                    <Button variant="secondary" className="secondary text-start" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
            <FilterModal showFilterModal={showFilterModal} handleCloseFilterModal={handleCloseFilterModal} />
        </>
    )
}
