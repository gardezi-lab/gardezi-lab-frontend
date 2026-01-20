import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { Table, Button, Modal } from 'react-bootstrap';
import { useState } from "react";

export default function TestPackageTable({ TestPackageList, onDelete, onEdit, loading }) {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");

    const [selectedId, setSelectedId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                <Table bordered striped hover size="sm">
                    <thead>
                        <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                            <th scope="col">Sr.</th>
                            <th scope="col" className="text-start">Name</th>
                            <th scope="col" className="text-start">Fees</th>
                            {/* <th scope="col" className="text-start"> Test</th> */}
                            <th scope="col" style={{ textAlign: "center" }} >Action</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan="6">
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
                    ) : TestPackageList?.length > 0 ? (
                        <tbody>
                            {TestPackageList.map((test, index) => (
                                <tr key={test.id || index}>
                                    <td>{index + 1}</td>
                                    <td className="text-start">{test.name}</td>
                                    <td className="text-start">{test.price}</td>
                                    {/* <td className="text-start">{test.selected_test}</td> */}
                                    <td>
                                        <div className="d-flex gap-2 align-items-center justify-content-center">
                                            {permissions["Test Package Edit"] == 1 &&
                                                <FaPenToSquare
                                                    onClick={() => onEdit(test)} style={{ fontSize: "22px", cursor: "pointer" }} />
                                            }
                                            {permissions["Test Package Delete"] == 1 &&
                                                <FaRegTrashCan
                                                    // onClick={() => {
                                                    //     if (window.confirm("Are you sure you want to delete this department?")) {
                                                    //         onDelete(test.id);
                                                    //     }
                                                    // }}

                                                    onClick={() => {
                                                        setSelectedId(test.id);
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
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No  packages Found
                                </td>
                            </tr>
                        </tbody>
                    )}
                </Table>


                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header className="primary"  >
                        <Modal.Title className="color-white fw-bold">Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h5 className="fw-semibold text-muted">
                            Are you sure you want to delete this package?
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
                                onDelete(selectedId);
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


            </div>
        </>
    );
}
