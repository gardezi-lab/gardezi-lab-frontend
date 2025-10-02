import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import PatientEntryModal from "./PatientEntryModal";
import Button from 'react-bootstrap/Button';
import httpClient from "../../../services/httpClient";
import PatientEntryTable from "./PatientEntryTable";
import Form from 'react-bootstrap/Form';


export default function PatientEntry() {
    const [showPatientEntryModal, setShowPatientEntryModal] = useState(false);
    const [patiententryList, setPatientEntryList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedPatientEntry, setSelectedPatientEntry] = useState(null);
    const [loading, setLoading] = useState(false); // ✅ new state for loader

    const handleClose = () => {
        setShowPatientEntryModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedPatientEntry(null);
    };
    const handleShow = () => setShowPatientEntryModal(true);

    const getPatientEntryData = async () => {
        setLoading(true);
        try {
            const data = await httpClient.get("/patient_entry");
            console.log("PatientEntry Data:", data);

            // Agar data ke andar "data" key hai
            if (Array.isArray(data)) {
                setPatientEntryList(data);
            } else if (Array.isArray(data.data)) {
                setPatientEntryList(data.data);
            } else {
                setPatientEntryList([]);
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
                contact_no: formData.patiententryCell,
                father_hasband_MR: formData.patiententryFatherHasbandMR,
                age: Number(formData.patiententryAge),
                company: formData.patiententryCompany,
                reffered_by: formData.patiententryRefferedBy,
                gender: formData.patiententryGender,
                email: formData.patiententryEmail,
                address: formData.patiententryAddress,
                package: formData.patiententryPackage,
                sample: formData.patiententrySample,
                priority: formData.patiententryPriority,
                remarks: formData.patiententryRemarks,
                test: formData.patiententryTest,

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
    }, []);




    return (
        <>

            <h5 className="fw-bold page-header">New Patient</h5>
            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
                {/* Left side title */}
                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Company </Form.Label>
                        <Form.Select>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Company </Form.Label>
                        <Form.Select>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Company </Form.Label>
                        <Form.Select>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>From :</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label> To :</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search profiles..."
                        style={{ width: "220px" }}
                    />
                    <Form.Group className="mb-3 mt-3">
                        <button className="btn btn-success primary">Show</button>
                    </Form.Group>
                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Patient
                    </button>
                </div>
            </div>

            <PatientEntryTable
                patiententryList={patiententryList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading} />

            {/* Footer below table */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Left side export */}
                <button className="btn btn-secondary primary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </button>

                {/* Right side pagination */}
                <nav>
                    <ul className="pagination mb-0 ">
                        <li className="page-item disabled">
                            <button className="page-link ">Previous</button>
                        </li>
                        <li className="page-item active ">
                            <button className="page-link primary">1</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">2</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">3</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>

            <Modal show={showPatientEntryModal} onHide={handleClose} className="modal-xl">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">New Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PatientEntryModal
                        onSave={handleSave}
                        patiententry={selectedPatientEntry}
                        onCancel={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
