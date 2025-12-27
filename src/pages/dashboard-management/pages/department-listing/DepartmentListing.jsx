import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";
import DepartmentModal from "../../others/modal/department/DepartmentModal";
import FilterModal from "../../others/modal/department/FilterModal";
import DepartmentTable from "../../others/table/department/DepartmentTable";

export default function DepartmentListing() {
  const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
  const [isShowDepartmentModal, setIsShowDepartmentModal] = useState(false);
  const [isShowFilterModal, setIsShowFilterModal] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [modalHeader, setModalHeader] = useState("");
  const [updateObj, setUpdateObj] = useState(null);

  const handleDepartmentModal = () => {
    setIsShowDepartmentModal(true);
    setModalHeader("save");
  }

  const handleFilterModal = () => {
    setIsShowFilterModal(true);
  }

  const EditRecord = (isOpen = false, obj) => {
    isOpen && setIsShowDepartmentModal(true);
    isOpen && setModalHeader("Update");
    isOpen && setUpdateObj(obj);
  }

  const handleDelete = (isDelete = false) => {
    isDelete && getDepartmentData();
  }

  const getDepartmentData = async () => {
    try {
      const url = `/department`;
      const response = await httpClient.get(url);
      if (response) {
        setDepartmentList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <h5 className="fw-bold page-header">Department</h5>
        <div className="d-flex flex-wrap align-items-center gap-2">
          {permissions["Departments Add"] === 1 && 
          
          <Button
            size="sm"
            className="btn btn-success primary"
            type="button"
            onClick={handleDepartmentModal}
          >
            <i className="fas fa-plus me-2"></i> Add Departments
          </Button>
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
      </div>

      <DepartmentTable
        departmentList={departmentList}
        EditRecord={EditRecord}
        handleDelete={handleDelete}
      />

      <DepartmentModal
        setIsShowDepartmentModal={setIsShowDepartmentModal}
        isShowDepartmentModal={isShowDepartmentModal}
        modalHeader={modalHeader}
        updateObj={updateObj}
      />

      <FilterModal
        setIsShowFilterModal={setIsShowFilterModal}
        isShowFilterModal={isShowFilterModal}
      />

    </>
  );
}
