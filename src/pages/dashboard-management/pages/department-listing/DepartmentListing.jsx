import { useEffect, useState } from "react";
import { Button,Pagination } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";
import DepartmentModal from "../../others/modal/department/DepartmentModal";
import FilterModal from "../../others/modal/department/FilterModal";
import DepartmentTable from "../../others/table/department/DepartmentTable";

export default function DepartmentListing() {
  const [isShowDepartmentModal, setIsShowDepartmentModal] = useState(false);
  const [isShowFilterModal, setIsShowFilterModal] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [modalHeader, setModalHeader] = useState("");
  const [updateObj, setUpdateObj] = useState(null);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordPerPage = 30;


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
      const url = `/department?search=${encodeURIComponent(
        search || ""
      )}&currentpage=${page}&recordperpage=${recordPerPage}`;
      const response = await httpClient.get(url);
      if (response) {
        setDepartmentList(response.data);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDepartmentData();
  }, [page]);

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
      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <h5 className="fw-bold page-header">Department</h5>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <Button
            size="sm"
            className="btn btn-success primary"
            type="button"
            onClick={handleDepartmentModal}
          >
            <i className="fas fa-plus me-2"></i> Add Departments
          </Button>

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
