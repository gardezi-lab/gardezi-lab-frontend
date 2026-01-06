import { useEffect, useState } from "react";
import { Table, Form, Spinner, Button, Pagination, Modal } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";

export default function RoleUserManagement() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isShowFilterModal, setIsShowFilterModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const recordPerPage = 30;

  const permissionTypes = ["admin", "reception", "technician", "pathologist", "manager", "doctor", "patient", "accountant"];
  const perModuleFunction = ["read", "add", "edit", "delete"];

  const getPermissions = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get(`/permission?search=${encodeURIComponent(
        search || ""
      )}&currentpage=${page}&recordperpage=${recordPerPage}`);

      if (response) {
        setModules(response.module);
      } else {
        console.warn("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFilterModal = () => {
    setIsShowFilterModal(true);
  }

  const handleToggle = (moduleIndex, permission) => {
    const updated = [...modules];
    updated[moduleIndex].crud[permission] =
      updated[moduleIndex].crud[permission] === 1 ? 0 : 1;
    setModules(updated);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("LoggedInUser"));

      const payload = {
        modules: modules?.map((mod) => ({
          moduleid: mod.moduleid,
          modulename: mod.modulename,
          crud: {
            reception: Number(mod.crud.reception),
            technician: Number(mod.crud.technician),
            pathologist: Number(mod.crud.pathologist),
            doctor: Number(mod.crud.doctor),
            patient: Number(mod.crud.patient),
            accountant: Number(mod.crud.accountant),
            manager: Number(mod.crud.manager)
          },
        })),
      };


      const res = await httpClient.put(`/permission`, payload);
      if (res.status == 200) {
        getPermissions();
      }

    } catch (error) {
      console.error("Error updating permissions:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getPermissions();
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
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold page-header">Role User Management</h5>
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

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="table-responsive table-sm" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
          <Table
            bordered
            hover

            size="sm"
            className="align-middle text-center shadow-sm"
          >
            <thead className="table-dark" style={{ position: 'sticky', top: 0, }} >
              <tr>
                <th style={{ textAlign: 'center' }}>Sr</th>
                <th>Module Name</th>
                {permissionTypes.map((perm) => (
                  <th key={perm} className="text-uppercase small">
                    {perm}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((mod, i) => (
                <tr key={mod.module_id}>
                  <td style={{ textAlign: 'center' }}>
                    {i + 1}
                  </td>
                  <td className="">
                    {mod.modulename}
                  </td>
                  {permissionTypes.map((perm) => (
                    <td key={perm}>
                      <Form.Check
                        type="checkbox"
                        checked={mod.crud[perm] == 1}
                        onChange={() => handleToggle(i, perm)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <div className="d-flex justify-content-between mt-3">
        <div >
          <Button
            size="sm"
            variant="primary"
            onClick={handleSave}
            className="primary"
            disabled={loading}
          >
            Update Changes
          </Button>
        </div>
        <div>
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
      </div>
      <Modal show={isShowFilterModal} size="md" centered>
        <Modal.Header className="primary">
          <Modal.Title className="text-white fw-bold">
            Filter Modal
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="form-label">Search by Module Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn secondary text-white"
            onClick={() => setIsShowFilterModal(false)}
          >
            Close
          </button>

          <button
            className="btn btn-danger text-white"
            onClick={() => {
              setTempSearch("");
              setSearch("");
              setPage(1);
              setIsShowFilterModal(false);
            }}
          >
            Clear
          </button>

          <button
            className="btn primary text-white"
            onClick={() => {
              setSearch(tempSearch);
              setPage(1);
              setIsShowFilterModal(false);
            }}
          >
            Apply
          </button>
        </Modal.Footer>
      </Modal>

    </div>

  );
}
