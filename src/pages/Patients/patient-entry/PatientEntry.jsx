import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import PatientEntryModal from "./PatientEntryModal";
import Button from 'react-bootstrap/Button';
import httpClient from "../../../services/httpClient";
import PatientEntryTable from "./PatientEntryTable";
import Form from 'react-bootstrap/Form';
import Pagination from "react-bootstrap/Pagination";


export default function PatientEntry() {
    const [showPatientEntryModal, setShowPatientEntryModal] = useState(false);
    const [patiententryList, setPatientEntryList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedPatientEntry, setSelectedPatientEntry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;
    const [search, setSearch] = useState("");

    const handleSubmit = () => {
        console.log("Submit / Update clicked");
    };

    const handleVerify = () => {
        console.log("Verify clicked");
    };

    const handleClose = () => {
        setShowPatientEntryModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedPatientEntry(null);
    };
    const handleShow = () => setShowPatientEntryModal(true);

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
                reffered_by: formData.patiententryRefferedBy,
                gender: formData.patiententryGender,
                email: formData.patiententryEmail,
                address: formData.patiententryAddress,
                package: formData.patiententryPackage,
                sample: formData.patiententrySample,
                priority: formData.patiententryPriority,
                remarks: formData.patiententryRemarks,
                test: formData.test   // ✅ already array of {name, fee}
            };


            if (isCurrentEditModalOpen && selectedPatientEntry) {
                await httpClient.put(
                    `/patient_entry/${selectedPatientEntry.id}`,
                    obj
                );
            } else {
                const obj1 = {
                    "cell": "03111234567",
                    "patient_name": "Murtaza Hussain",
                    "father_hasband_MR": "Mr. Hussain",
                    "age": "30 days",
                    "company": "ABC Diagnostics",
                    "reffered_by": "Dr. Bilal",
                    "gender": "Male",
                    "email": "murtaza@example.com",
                    "address": "Street 5, Lahore",
                    "package": "Basic Health",
                    "sample": "Blood, Urine",
                    "priority": "Normal",
                    "remarks": "No special instructions",
                    "test": [
                        { "name": "Complete Blood Count", "fee": 1200 },
                        { "name": "Liver Function Test", "fee": 1500 }
                    ]
                }
                await httpClient.post("/patient_entry/", obj1);
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

            <h5 className="fw-bold page-header">New Patient</h5>
            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">

                <div className="d-flex flex-wrap align-items-center gap-2">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Lab </Form.Label>
                        <Form.Select>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Receptionist </Form.Label>
                        <Form.Select>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Company </Form.Label>
                        <Form.Select>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group> */}
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
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                    <Form.Group className="mb-3 mt-3">
                        <button className="btn btn-success primary">Show</button>
                    </Form.Group>
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
                </div>
            </div>

            <PatientEntryTable
                patiententryList={patiententryList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading} />

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
                backdrop="static"   // ✅ side click se close nahi hoga
                keyboard={false}    // ✅ ESC press karne se close nahi hoga
                className="modal-xl"
            >
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">New Patient</Modal.Title>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={handleClose} // ✅ sirf is button pe close hoga
                        aria-label="Close"
                    ></button>
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
                        onClick={() => {
                            const form = document.querySelector("form");
                            if (form) {
                                form.requestSubmit();
                            }
                        }}  >
                        {selectedPatientEntry ? "Update" : "Submit"}
                    </Button>

                    <Button variant="secondary" className="secondary text-start" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
