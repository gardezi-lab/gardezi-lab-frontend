import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import httpClient from "../../../../services/httpClient";
import UserTable from "../../others/table/system-user/SystemUserTable";
import UserModal from "../../others/modal/system-user/SystemUserModal";

export default function SystemUserModal() {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
    const [showConsultantModal, setShowConsultantModal] = useState(false);
    const [consultantList, setConsultantList] = useState([]);
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const recordPerPage = 10;
    const [search, setSearch] = useState("");

    const handleClose = () => {
        setShowConsultantModal(false);
        setIsCurrentEditModalOpen(false);
        setSelectedConsultant(null);
    };
    const handleShow = () => setShowConsultantModal(true);

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




    return (
        <>
            <h5 className="fw-bold page-header">Users</h5>
            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">

                <div className="d-flex flex-wrap align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search profiles..."
                        style={{ width: "220px" }}
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                    {permissions["User Add"] === 1 &&
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
                </div>
            </div >

            <UserTable
                consultantList={consultantList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading} />

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
        </>
    )
}
