import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddResultMudal from "./AddResultModal";
export default function AddResult() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
                <div
                    className="card shadow-lg border-0 rounded-3"
                    style={{ width: "100%" }}
                >
                    <div
                        className="card-header text-white d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "rgba(243,156,18,255)" }}
                    >
                        <h5 className="mb-1 text-white">Add aresults</h5>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleShow}
                        >
                            Add Result
                        </button>
                    </div>

                    <div className="card-body">

                        <form
                            className="d-flex align-items-center w-100 mb-4"
                            role="search"
                        >
                            <button type="button" className="btn btn-secondary me-1 ">
                                Excel
                            </button>
                            <div className="d-flex ms-auto">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <button
                                    className="btn btn-outline-success"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* Table */}
                        <div className="table-responsive">
                            <Table striped bordered hover size="sm" responsive>
                                <thead>
                                    <tr>
                                        <th className="bg-black text-white">SR.</th>
                                        <th className="bg-black text-white">Name</th>
                                        <th className="bg-black text-white">MR#</th>
                                        <th className="bg-black text-white">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Microbiology</td>
                                        <td>Microbiology</td>
                                        <td>Microbiology</td>
                                        <td>Microbiology</td>
                                    </tr>
                                    <tr>
                                        <td>Routine</td>
                                        <td>Routine</td>
                                        <td>Routine</td>
                                        <td>Routine</td>
                                    </tr>
                                    <tr>
                                        <td>Special Chemistry</td>
                                        <td>Special Chemistry</td>
                                        <td>Special Chemistry</td>
                                        <td>Special Chemistry</td>
                                    </tr>
                                    <tr>
                                        <td>Serology</td>
                                        <td>Serology</td>
                                        <td>Serology</td>
                                        <td>Serology</td>
                                    </tr>
                                    <tr>
                                        <td>Molecular</td>
                                        <td>Molecular</td>
                                        <td>Molecular</td>
                                        <td>Molecular</td>
                                    </tr>
                                    <tr>
                                        <td>Serology Elisa</td>
                                        <td>Serology Elisa</td>
                                        <td>Serology Elisa</td>
                                        <td>Serology Elisa</td>
                                    </tr>
                                    <tr>
                                        <td>Hematology</td>
                                        <td>Hematology</td>
                                        <td>Hematology</td>
                                        <td>Hematology</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header >
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddResultMudal />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    {/* Card Footer */}
                    <div className="card-footer d-flex justify-content-between align-items-center">
                        <div>Showing 1 to 7 of 7 entries</div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination mb-0">
                                <li className="page-item disabled">
                                    <a className="page-link">Previous</a>
                                </li>
                                <li className="page-item active" aria-current="page">
                                    <a className="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        Next
                                    </a>
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}