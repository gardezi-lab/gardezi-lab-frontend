import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare, FaPrint } from "react-icons/fa6";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function PatientEntryTable({ patiententryList, onEdit, onDelete, loading }) {
    const [show, setShow] = useState(false);

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div class="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                        <table class="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765" }} >
                                    <th scope="col">Sr.</th>
                                    <th scope="col">X</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">MR# </th>
                                    <th scope="col">Reception</th>
                                    <th scope="col">Fees</th>
                                    <th scope="col">Ref Consultant </th>
                                    <th scope="col">Test</th>
                                    <th scope="col">Action </th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="10">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "250px", // ✅ adjust karo apne table ke hisaab se
                                                }}
                                            >
                                                <ThreeCircles
                                                    visible={true}
                                                    height="60"
                                                    width="60"
                                                    color="#fcb040"
                                                    ariaLabel="three-circles-loading"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : patiententryList?.length > 0 ? (
                                <tbody>
                                    {patiententryList.map((patient, index) => (
                                        <tr key={patient.id}>
                                            <td>{index + 1}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{patient.patient_name}</td>
                                            <td>{patient.father_hasband_MR}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{patient.reffered_by}</td>
                                            <td>{patient.test}</td>
                                            <td>
                                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                                    <FaPenToSquare
                                                        onClick={() => onEdit(patient)} style={{ fontSize: "22px", cursor: "pointer" }} />
                                                    <FaRegTrashCan onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this department?")) {
                                                            onDelete(patient.id);
                                                        }
                                                    }}
                                                        style={{ fontSize: "22px", cursor: "pointer", color: 'red' }}
                                                    />
                                                    <FaPrint
                                                        onClick={handleOpen}
                                                        style={{ fontSize: "22px", cursor: "pointer", color: "#333" }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No Departments Found
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Print Preview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Patient Name: {patiententryList.name}</p>
                            <p>Age: {patiententryList.age}</p>
                            <p>Contact: {patiententryList.contact_no}</p>
                            {/* You can add a printable layout here */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => window.print()} // trigger print
                            >
                                Print
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    )
}