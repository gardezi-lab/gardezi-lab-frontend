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


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 5;

    const [search, setSearch] = useState("");



    const getTestPackageData = async () => {
        setLoading(true);
        try {
            const response = await httpClient.get("/test-packages");
            console.log("response data:", response)
            console.log("State TestPackageList:", TestPackageList);

            if (response.data) {
                setTestPackageList(response.data);
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
                <div className="d-flex justify-content-between mt-2">
                    <div>
                        <button className="btn btn-sm btn-secondary primary">
                            <i className="fas fa-file-excel me-2"></i> Export to Excel
                        </button>
                    </div>
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
