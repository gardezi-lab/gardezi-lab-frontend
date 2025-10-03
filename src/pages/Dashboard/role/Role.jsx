import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import RoleTable from "./RoleTable";
import RoleModal from "./RoleModal";
import httpClient from "../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";

export default function Role() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getRoleData();
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
    <div>
      <h5 className="fw-bold page-header">Role</h5>

      <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search role"
            style={{ width: "220px" }}
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <button
            className="btn btn-success primary"
            type="button"
            onClick={() => {
              setIsCurrentEditModalOpen(false);
              handleShow();
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Role
          </button>
        </div>
      </div>

      <RoleTable
        roleList={roleList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />

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
    </div>
  );
}
