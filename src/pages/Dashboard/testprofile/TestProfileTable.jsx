import { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import ParameterModal from "./ParameterModal";


export default function TestProfileTable({ TestProfileList, onDelete, onEdit, loading }) {
    const [selectedTest, setSelectedTest] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setSelectedTest(null);
    };

    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                        <table className="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                                    <th scope="col" style={{ width: '5%', textAlign: 'center' }}>Sr.</th>
                                    <th scope="col">Test</th>
                                    <th scope="col">Header</th>
                                    <th scope="col">Fees</th>
                                    <th scope="col">Delivery Date</th>
                                    <th scope="col">Parameter</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>

                            {loading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="7">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "250px",
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
                            ) : TestProfileList?.length > 0 ? (
                                <tbody>
                                    {TestProfileList.map((test, index) => (
                                        <tr key={test.id || index}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td>{test.test_name}</td>
                                            <td>{test.select_header}</td>
                                            <td>{test.fee}</td>
                                            <td>{test.delivery_time}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => {
                                                        setSelectedTest(test);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Manage Parameters
                                                </button></td>
                                            <td>
                                                <div className="d-flex gap-2 align-items-center justify-content-center">
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
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No Test Profiles Found
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
                <Modal
                    show={showModal}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    className="modal-xl"
                >
                    <Modal.Header className="primary">
                        <Modal.Title  className="color-white fw-bold"
                        >Manage Parameters for Test Profile: {selectedTest?.test_name}</Modal.Title>

                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedTest && (
                            <ParameterModal 
                            test={selectedTest} 
                            onClose={handleClose} />
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}
