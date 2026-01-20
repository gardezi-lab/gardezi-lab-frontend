import { ThreeCircles } from "react-loader-spinner";
import { Table, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function AddStockTable({ stockList, onDelete, onEdit, loading }) {

    const [selectedId, setSelectedId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };
    return (

        <div
            className="table-responsive"
            style={{ maxHeight: "62vh", overflowY: "scroll" }}
        >
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr style={{ backgroundColor: "#1c2765", color: "white", }}>
                        <th scope="col" className="text-center" style={{ width: "80px" }}>Sr.</th>
                        <th scope="col" className="text-start">Name Item</th>
                        <th scope="col" className="text-center" style={{ width: "120px" }}>Action</th>
                    </tr>
                </thead>

                {loading ? (
                    <tbody >
                        <tr style={{ height: "20px" }}>
                            <td colSpan="3">
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
                ) : stockList?.length > 0 ? (
                    <tbody>
                        {stockList.map((stk, index) => (
                            <tr style={{ height: "20px" }} key={stk.id}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td className="text-start">{stk.name}</td>
                                <td>
                                    <div className="d-flex gap-2 align-items-center justify-content-center">
                                        <FaPenToSquare
                                            onClick={() => onEdit(stk)} style={{ fontSize: "22px", cursor: "pointer" }} />
                                        <FaRegTrashCan
                                            //  onClick={() => {
                                            //     if (window.confirm("Are you sure you want to delete this item?")) {
                                            //         onDelete(stk.id);
                                            //     }
                                            // }}
                                            onClick={() => {
                                                setSelectedId(stk.id);
                                                setShowDeleteModal(true);
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
                            <td colSpan="3" className="text-center">
                                No Items Found
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
                        Are you sure you want to delete this stock?
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

    );
}
