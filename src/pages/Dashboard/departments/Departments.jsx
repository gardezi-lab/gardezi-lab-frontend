import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import DepartmentTable from "./DepartmentTable";
import DepartmentModal from "./DepartmentModal";
import httpClient from "../../../services/httpClient";
import { ThreeCircles } from "react-loader-spinner";

export default function Departments() {
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ new state for loader

  const handleClose = () => {
    setShowDepartmentModal(false);
    setIsCurrentEditModalOpen(false);
    setSelectedDepartment(null);
  };
  const handleShow = () => setShowDepartmentModal(true);

  const getDepartmentData = async () => {
    setLoading(true); // ✅ start loader
    try {
      const data = await httpClient.get("/department/");
      if (data) {
        setDepartmentList(data);
      }
      console.log("Department Data:", data);
    } catch (err) {
      console.error("Fetch Departments Error:", err);
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  const handleSave = async (formData) => {
    setLoading(true);
    try {
      const obj = {
        department_name: formData.departmentName,
      };

      if (isCurrentEditModalOpen && selectedDepartment) {
        await httpClient.put(
          `/department/${selectedDepartment.department_id}`,
          obj
        );
      } else {
        await httpClient.post("/department", obj);
      }

      getDepartmentData();
    } catch (err) {
      console.error("Save Department Error:", err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await httpClient.delete(`/department/${id}`);
      getDepartmentData();
    } catch (err) {
      console.error("Delete Department Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dep) => {
    setSelectedDepartment(dep);
    setIsCurrentEditModalOpen(true);
    handleShow();
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  return (
    <div>
      <h5 className="fw-bold page-header">Department</h5>

      {/* ✅ Spinner show only when loading is true */}


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
            onClick={() => {
              setIsCurrentEditModalOpen(false);
              handleShow();
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Departments
          </button>
        </div>
      </div>

      {/* ✅ Table hide when loading */}
      {/* {!loading && ( */}
        <DepartmentTable
          departmentList={departmentList}
          onDelete={handleDelete}
          onEdit={handleEdit}
          loading={loading}
        />
      {/* )} */}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-secondary primary">
          <i className="fas fa-file-excel me-2"></i> Export to Excel
        </button>
      </div>

      <Modal show={showDepartmentModal} onHide={handleClose} className="modal sm">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isCurrentEditModalOpen ? "Edit Department" : "Add Department"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DepartmentModal
            onSave={handleSave}
            department={selectedDepartment}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
