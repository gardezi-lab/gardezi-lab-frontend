import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import UserTable from "../../others/table/system-user/SystemUserTable";
import UserModal from "../../others/modal/system-user/SystemUserModal";
import { Modal, Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";

export default function SystemUserModal() {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
    const [showConsultantModal, setShowConsultantModal] = useState(false);
    const [consultantList, setConsultantList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [departmentName, setDepartmentName] = useState("")
    const [isShowFilterModal, setIsShowFilterModal] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 30;
    const [search, setSearch] = useState("");

    const handleClose = () => {
        setShowConsultantModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedConsultant(null);
    };
    const handleShow = () => setShowConsultantModal(true);


    const handleFilterModal = () => {
        setIsShowFilterModal(true);
    }

    const closeModal = () => {
        setIsShowFilterModal(false);
    }

    const saveChanges = () => {
        setIsShowFilterModal(false);
    }

    const getConsultantData = async () => {
        setLoading(true);
        try {
            const url = `/users?search=${encodeURIComponent(
                search || ""
            )}&currentpage=${page}&recordperpage=${recordPerPage}`;

            const response = await httpClient.get(url);
            if (response) {
                setConsultantList(response.data || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error("Fetch Consultant Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        setLoading(true);
        try {
            const obj = {
                name: formData.consultantName,
                user_name: formData.consultantUserName,
                contact_no: formData.consultantContact,
                role: formData.consultantRole,
                age: Number(formData.consultantAge),
                discount: formData.discount
            };

            if (isCurrentEditModalOpen && selectedConsultant) {
                await httpClient.put(
                    `/users/${selectedConsultant.id}`,
                    obj
                );
            } else {
                await httpClient.post("/users/", obj);
            }

            getConsultantData();
        } catch (err) {
            console.error("Save Consultant Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/users/${id}`);
            getConsultantData();
        } catch (err) {
            console.error("Delete Consultant Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dep) => {
        setSelectedConsultant(dep);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    useEffect(() => {
        getConsultantData();
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
            <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
                <h5 className="fw-bold page-header">Users</h5>

                <div className="d-flex flex-wrap align-items-center gap-2">
                    {permissions["User Add"] === 0 &&
                        < button
                            className="btn btn-success primary"
                            type="button"
                            onClick={() => {
                                setIsCurrentEditModalOpen(false);
                                handleShow();
                            }}
                        >
                            <i className="fas fa-plus me-2"></i> Add User
                        </button>
                    }
                    <Button
                        variant="outline-success"
                        size="sm"
                        className="btn filter-btn"
                        type="button"
                        onClick={handleFilterModal}
                    >
                        <i className="fas fa-filter"></i>
                    </Button>
                </div>
            </div >

            <UserTable
                consultantList={consultantList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading} />

            <div className="d-flex justify-content-end align-items-center mt-3">
                {/* Left side export */}
                {/* <button className="btn btn-secondary primary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </button> */}

                {/* Right side pagination */}
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

            <Modal show={showConsultantModal} onHide={handleClose} className="modal" size="md" >
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">
                        {isCurrentEditModalOpen ? "Edit User" : "Add User"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserModal
                        onSave={handleSave}
                        consultant={selectedConsultant}
                        onCancel={handleClose} />
                </Modal.Body>
            </Modal>
            <Modal show={isShowFilterModal} size="md"  >
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">Filter Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search with department name"
                                            value={departmentName}
                                            onChange={(e) => setDepartmentName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" className="secondary" onClick={closeModal}>
                        Clear & Close
                    </Button>
                    <Button variant="primary" size="sm" className="primary" onClick={saveChanges} >
                        Apply Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
