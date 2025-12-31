import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import httpClient from "../../../../services/httpClient";
import TestPackageTable from "../../others/table/test-package/TestPackageTable";
import TestPackageModal from "../../others/modal/test-package/TestPackageModal";
import { useFetchProfileTest } from "../../../Patient-management/others/custom-hooks/useFetchProfileTest";

export default function TestPackage() {
    const [show, setShow] = useState(false);
    const [selectedTestPackage, setSelectedTestPackage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [TestPackageList, setTestPackageList] = useState([])
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const { testProfiles, getProfileList } = useFetchProfileTest();
    const [search, setSearch] = useState("");


    const handleShow = () => setShow(true);

    const getTestPackageData = async () => {
        setLoading(true);
        try {
            const url = `/test-packages`;
            const response = await httpClient.get(url);
            if (response.data) {
                setTestPackageList(response.data || []);
            }
        } catch (err) {
            console.error("Fetch TestPackage Error:", err);
        } finally {
            setLoading(false); 
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
        setSelectedTestPackage(null);
        setIsCurrentEditModalOpen(false);
    };

    useEffect(() => {
        getTestPackageData();
    }, []);



    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
                <h5 className="fw-bold page-header">Test Packages</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">

                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Package
                    </button>
                    {/* Filter Button */}
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            <TestPackageTable
                TestPackageList={TestPackageList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
            />

           
            <Modal show={showFilterModal} >
                <Modal.Header >
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Search by Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => {
                                setPage(1);
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowFilterModal(false)}>
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowFilterModal(false)}
                    >
                        Apply
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} className="modal sm">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">{selectedTestPackage ? "Edit Package" : "Add Package"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TestPackageModal
                        onSave={handleSave}
                        TestPackage={selectedTestPackage}
                        onCancel={handleClose}
                        testProfiles={testProfiles}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}
