import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import httpClient from "../../../../services/httpClient";
import TestPackageTable from "../../others/table/test-package/TestPackageTable";
import TestPackageModal from "../../others/modal/test-package/TestPackageModal";
import { useFetchProfileTest } from "../../../Patient-management/others/custom-hooks/useFetchProfileTest";
import { Button, Pagination } from "react-bootstrap";

export default function TestPackage() {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
    const [show, setShow] = useState(false);
    const [selectedTestPackage, setSelectedTestPackage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [TestPackageList, setTestPackageList] = useState([])
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const { testProfiles, getProfileList } = useFetchProfileTest();
    const [search, setSearch] = useState("");
    const [tempSearch, setTempSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const recordPerPage = 30;

    const handleShow = () => setShow(true);

    const getTestPackageData = async () => {
        setLoading(true);
        try {
            const url = `/test-packages?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;
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
    }, [search]);

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
            <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
                <h5 className="fw-bold page-header">Test Packages</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">
                    {permissions["Test Package Add"] == 1 &&
                        <Button
                            className="btn btn-success primary"
                            type="button"
                            size="sm"
                            onClick={handleShow}
                        >
                            <i className="fas fa-plus me-2"></i> Add Package
                        </Button>
                    }
                    {/* Filter Button */}
                    <Button
                        variant="outline-success"
                        size="sm"
                        className="btn filter-btn"
                        type="button"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </Button>
                </div>
            </div>
            <TestPackageTable
                TestPackageList={TestPackageList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
            />
            <div className="d-flex justify-content-end align-items-center mt-3">
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

            <Modal show={showFilterModal}>
                <Modal.Header className="primary">
                    <Modal.Title className="text-white">Filter</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Search by Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={tempSearch}
                            onChange={(e) => setTempSearch(e.target.value)}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className="btn secondary text-white"
                        onClick={() => setShowFilterModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-danger text-white"
                        onClick={() => {
                            setTempSearch("");
                            setSearch("");
                            setPage(1);
                            setShowFilterModal(false);
                        }}
                    >
                        Clear
                    </button>

                    <button
                        className="btn primary text-white"
                        onClick={() => {
                            setSearch(tempSearch);
                            setPage(1);
                            setShowFilterModal(false);
                        }}
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
