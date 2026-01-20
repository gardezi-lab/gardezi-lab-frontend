import { Button, Modal, Table } from "react-bootstrap";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import httpClient from "../../../../../services/httpClient";
import { useState } from "react";


export default function DepartmentTable({ departmentList, EditRecord, handleDelete }) {
    const [selectedDept, setSelectedDept] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    };

    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");

    const deleteRecord = async (obj) => {
        try {
            const url = `/department/${obj.id}`;
            const response = await httpClient.delete(url);
            if (response) {
                console.log(response);
                handleDelete(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateRecord = (obj) => {
        if (obj) {
            EditRecord(true, obj);
        }
    }

    return (
        <>
            <div className="table-responsive table-sm" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                <Table bordered striped hover size="sm">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Sr.</th>
                            <th scope="col" className="text-start">Name</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentList.map((dept, index) => (
                            <tr key={dept.department_id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-start">{dept.department_name}</td>
                                <td>
                                    <div className="d-flex gap-2 align-items-center justify-content-center">
                                        {permissions["Departments Edit"] == 1 &&
                                            <FaPenToSquare
                                                className="cursor"
                                                onClick={() => updateRecord(dept)}
                                                style={{ fontSize: "22px", cursor: "pointer" }}
                                            />
                                        }
                                        {permissions["Departments Delete"] == 1 &&
                                            <FaRegTrashCan
                                                className="cursor"
                                                onClick={() => {
                                                    setSelectedDept(dept);
                                                    setShowDeleteModal(true);
                                                }} 
                                                style={{ fontSize: "22px", cursor: "pointer", color: 'red' }}
                                            />
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

 
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header className="primary"  >
                    <Modal.Title className="color-white fw-bold">Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5 className="fw-semibold text-muted">
                        Are you sure you want to delete this departement?
                    </h5>
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button variant="secondary" size="sm" className="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    {/* <Button variant="danger" size="sm" onClick={deletePatient}
                        style={{
                            backgroundColor: "#e74c3c",
                            borderColor: "#c0392b",
                        }}
                    >
                        Delete Visit
                    </Button> */}
                    <Button variant="danger" size="sm"
                        onClick={() => {
                            deleteRecord(selectedDept);
                            setShowDeleteModal(false);
                        }}
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