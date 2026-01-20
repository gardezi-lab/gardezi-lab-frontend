import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import TestPanelModal from "../../others/modal/company-panel/TestPanelModal";
import TestPanelTable from "../../others/table/company-panel/TestPanelTable";
import httpClient from "../../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";
import { Button } from "react-bootstrap";

export default function AddPanel() {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedCompany, setSlectedCompany] = useState(null)
    const [companyList, setCompanyList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [tempSearch, setTempSearch] = useState("");
    const recordPerPage = 30;

    const [search, setSearch] = useState("");

    const handleClose = () => {
        setShowCompanyModal(false);
        setIsCurrentEditModalOpen(false);
        setSlectedCompany(null);
    };
    const handleShow = () => setShowCompanyModal(true);

    const getCompanyData = async () => {
        setLoading(true);
        try {
            const url = `/companies_panel?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

            const response = await httpClient.get(url);
            if (response) {
                setCompanyList(response.data || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error("Fetch Company Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        console.log("HANDLE SAVE:", formData);
        setLoading(true);

        try {
            const obj = {
                company_name: formData.company_name,
                head_name: formData.head_name,
                contact_no: formData.contact_no,
                user_name: formData.user_name,
                age: formData.age
            };
            console.log("-> payload prepared:", obj);

            if (isCurrentEditModalOpen && selectedCompany) {
                await httpClient.put(`/companies_panel/${selectedCompany.id}`, obj);
            } else {
                await httpClient.post("/companies_panel", obj);
            }
            getCompanyData();
        } catch (err) {
            console.error("Save Company Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/companies_panel/${id}`);
            getCompanyData();
        } catch (err) {
            console.error("Delete Company Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (company) => {
        setSlectedCompany(company);  // ✅ correct function use karo
        handleShow();
    };


    useEffect(() => {
        getCompanyData();
    }, [page, search]);

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
        <>


            <div className="d-flex justify-content-between align-items-center mb-3 mt-1">
                <h5 className="fw-bold page-header">Companies</h5>
                {/* Left side title */}

                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                    {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Search company by name"
                        style={{ width: "220px" }}
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    /> */}
                    {permissions["Company Panels Add"] == 1 &&
                        <Button
                            className="btn btn-success primary"
                            size="sm"
                            type="button"
                            onClick={() => {
                                setIsCurrentEditModalOpen(false);
                                handleShow();
                            }}
                        >
                            <i className="fas fa-plus me-2"></i> Add Company
                        </Button>
                    }
                    <Button
                        variant="outline-success"
                        size="sm"
                        className="btn filter-btn"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </Button>
                </div>
            </div>

            <TestPanelTable
                companyList={companyList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}

            />

            {/* Footer below table */}
            <div className="d-flex justify-content-end  mt-3">
                {/* Left side export */}
                {/* <button className="btn btn-secondary primary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </button> */}

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

            <Modal show={showCompanyModal} onHide={handleClose} className="modal sm">
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit Company" : "Add Company"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TestPanelModal
                        onSave={handleSave}
                        company={selectedCompany}
                        onCancel={handleClose}
                    />
                </Modal.Body>
            </Modal>
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
        </>
    )
}
