import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DepartmentTable from "./DepartmentTable";
import DepartmentModal from "./DepartmentModal";
import httpClient from "../../../services/httpClient";

export default function Departments() {
  const [show, setShow] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedDept(null);
  };
  const handleShow = () => setShow(true);

  const getDepartmentData = async () => {
    try {
      const data = await httpClient.get("/department");
      setDepartments(data);
    } catch (err) {
      console.error("Fetch Departments Error:", err);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedDept) {
        // Update
        await httpClient.put(`/department/${selectedDept.id}`, formData);
      } else {
        // Create
        await httpClient.post("/department", formData);
      }
      getDepartmentData();
      handleClose();
    } catch (err) {
      console.error("Save Department Error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await httpClient.delete(`/departments/${id}`);
      getDepartmentData();
    } catch (err) {
      console.error("Delete Department Error:", err);
    }
  };

  const handleEdit = (dept) => {
    setSelectedDept(dept);
    handleShow();
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  return (
    <div>
      <h5 className="fw-bold page-header">Department</h5>

      <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search name"
            style={{ width: "220px" }}
          />
          <button
            className="btn btn-success primary"
            type="button"
            onClick={handleShow}
          >
            <i className="fas fa-plus me-2"></i> Add Department
          </button>
        </div>
      </div>

      <DepartmentTable
        departments={departments}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-secondary primary">
          <i className="fas fa-file-excel me-2"></i> Export to Excel
        </button>
      </div>

      <Modal show={show} onHide={handleClose} className="modal sm">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {selectedDept ? "Edit Department" : "Add Department"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DepartmentModal
            onSave={handleSave}
            department={selectedDept}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
