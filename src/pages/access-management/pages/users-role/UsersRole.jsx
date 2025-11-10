import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import RoleTable from "../../others/table/users-role/RoleTable";
// import RoleModal from "../../others/table/users-role-table/RoleModal";
// import RoleModal
import RoleModal from "../../others/modal/users-role/RoleModal";
import httpClient from "../../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";
import FilterModal from "../../others/modal/users-role/FilterModal";

export default function UsersRole() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false)

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordPerPage = 5;

  const [search, setSearch] = useState("");

  const handleClose = () => {
    setShowRoleModal(false);
    setIsCurrentEditModalOpen(false);
    setSelectedRole(null);
  };



  const handleShow = () => setShowRoleModal(true);

  const getRoleData = async () => {
    setLoading(true);
    try {
      const url = `/role?search=${encodeURIComponent(
        search || ""
      )}&currentpage=${page}&recordperpage=${recordPerPage}`;

      const response = await httpClient.get(url);
      if (response) {
        setRoleList(response.data || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err) {
      console.error("Fetch Role Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    setLoading(true);
    try {
      const obj = { role_name: formData.roleName };

      if (isCurrentEditModalOpen && selectedRole) {
        await httpClient.put(`/role/${selectedRole.id}`, obj);
      } else {
        await httpClient.post("/role", obj);
      }
      getRoleData();
    } catch (err) {
      console.error("Save Role Error:", err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await httpClient.delete(`/role/${id}`);
      getRoleData();
    } catch (err) {
      console.error("Delete Role Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsCurrentEditModalOpen(true);
    handleShow();
  };

  const handleFilterModal = () => {
    setOpenFilterModal(true);
  }

  const handleRoleModal = () => {
    setShowRoleModal(true);
  }

  useEffect(() => {
    getRoleData();
  }, [page, search]);



  return (
    <div>
      <h5 className="fw-bold page-header">Role</h5>

      <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button
            className="btn btn-success primary"
            type="button"
            onClick={handleRoleModal}
          >
            <i className="fas fa-plus me-2"></i> Add Role
          </button>
          <button
            className="btn filter-btn"
            type="button"
            onClick={handleFilterModal}
          >
            <i className="fas fa-filter"></i>
          </button>
        </div>
      </div>

      <RoleTable
        roleList={roleList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />

      <Modal show={showRoleModal} onHide={handleClose} className="modal sm">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isCurrentEditModalOpen ? "Edit Role" : "Add Role"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoleModal
            onSave={handleSave}
            role={selectedRole}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>

      <FilterModal
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
      />
    </div>
  );
}
