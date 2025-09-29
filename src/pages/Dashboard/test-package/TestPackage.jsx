import { useEffect, useState } from "react";
import feather from "feather-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import httpClient from "../../../services/httpClient";
import TestPackageTable from "./TestPackageTable";
import TestPackageModal from "./TestPackageModal";

export default function TestPackage() {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [selectedTestPackage, setSelectedTestPackage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [TestPackageList, setTestPackageList] = useState([])
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);

    const getTestPackageData = async () => {
        setLoading(true);
        try {
            const data = await httpClient.get("/test-packages");
            console.log("response data:", data)
            if (data) {
                setTestPackageList(data);
            }
            console.log("TestPackage Data:", data);
        } catch (err) {
            console.error("Fetch TestPackage Error:", err);
        } finally {
            setLoading(false); // ✅ stop loader
        }
    };

    const handleSave = async (formData) => {
        setLoading(true);
       
        try {
            const obj = {
                name: formData.name,
                price: formData.price,
                selected_test: formData.selected_test
            };

            if (isCurrentEditModalOpen && selectedTestPackage) {
                await httpClient.put(
                    `/test-packages/${selectedTestPackage.id}`,
                    obj
                );
            } else {
                await httpClient.post("/test-packages", obj);
            }
             console.log("formData:", obj)

            getTestPackageData();
        } catch (err) {
            console.error("Save TestPackage Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/test-packages/${id}`);
            getTestPackageData();
        } catch (err) {
            console.error("Delete Test Package Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (TestPackage) => {
        setSelectedTestPackage(TestPackage);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    const handleClose = () => {
        setShow(false);
        setSelectedTestPackage(null);   // ✅ reset selected profile
        setIsCurrentEditModalOpen(false); // ✅ reset edit mode
    };

    useEffect(() => {
        feather.replace();
        getTestPackageData();
    }, []);

    return (
        <div>
            <h5 className="fw-bold page-header">Test Packages</h5>

            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
                {/* Left side title */}

                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search profiles..."
                        style={{ width: "220px" }}
                    />

                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Package
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <TestPackageTable
                TestPackageList={TestPackageList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
            />


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

            <Modal show={show} onHide={handleClose} className="modal sm">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">Add Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TestPackageModal
                        onSave={handleSave}
                        TestPackage={selectedTestPackage}
                        onCancel={handleClose}

                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}
