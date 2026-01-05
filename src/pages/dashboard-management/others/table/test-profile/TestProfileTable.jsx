import { useState,useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { FaSlidersH } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import ParameterModal from "../../modal/test-profile-modal/parameter-modal/ParameterModal";
import { Table } from "react-bootstrap";
import httpClient from "../../../../../services/httpClient";


export default function TestProfileTable({ TestProfileList, onDelete, onEdit, loading }) {
    const [selectedTest, setSelectedTest] = useState(null);
    const [showModal, setShowModal] = useState(false);
     const [departments, setDepartments] = useState([]);

    const handleClose = () => {
        setShowModal(false);
        setSelectedTest(null);
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await httpClient.get("/department");
                const deptList = res?.data?.data || res?.data || res;
                setDepartments(Array.isArray(deptList) ? deptList : []);
            } catch (err) {
                console.error("Error fetching departments:", err);
            }
        };
        fetchDepartments();
    }, [TestProfileList]);


    return (
        <>
            <div className="table-responsive table-sm" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                <Table bordered striped hover size="sm">
                    <thead>
                        <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                            <th scope="col" style={{ width: '5%', textAlign: 'center' }}>Sr.</th>
                            <th scope="col">Test</th>
                            <th scope="col">Header</th>
                            <th scope="col">Fees</th>
                            <th scope="col">Delivery Date</th>
                            <th scope="col" style={{ textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TestProfileList?.map((test, index) => (
                            <tr key={test.id || index}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td>{test.test_name}</td>
                                <td>{departments.find(d => d.id === test.department_id)?.department_name || "—"}</td>
                                <td>{test.fee}</td>
                                <td>{test.delivery_time}</td>
                                <td>
                                    <div className="d-flex gap-2 align-items-center justify-content-center">
                                        <FaSlidersH
                                            onClick={() => {
                                                setSelectedTest(test);
                                                setShowModal(true);
                                            }}
                                            style={{ fontSize: "20px", cursor: "pointer", color: "#fcb040" }}
                                            title="Manage Parameters"
                                        />

                                        <FaPenToSquare
                                            onClick={() => onEdit(test)}
                                            style={{ fontSize: "22px", cursor: "pointer" }}
                                        />
                                        <FaRegTrashCan
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this department?")) {
                                                    onDelete(test.id);
                                                }
                                            }}
                                            style={{ fontSize: "22px", cursor: "pointer", color: 'red' }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-xl"
            >
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold"
                    >Manage Parameters for Test Profile: {selectedTest?.test_name}</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    {selectedTest && (
                        <ParameterModal
                            test={selectedTest}
                            onClose={handleClose} />
                    )}
                </Modal.Body>
            </Modal>

        </>
    );
}
