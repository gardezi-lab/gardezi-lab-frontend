import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CreateAccountTable from "./CreateAccountTable";
import CreateAccountModal from "./CreateAccountModal";
import httpClient from "../../../services/httpClient";
import Pagination from "react-bootstrap/Pagination";

export default function CreateAccount() {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [departmentList, setDepartmentList] = useState([])

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordPerPage = 5;

  const [search, setSearch] = useState("");

  const handleClose = () => {
    setShowAccountModal(false);
    setIsCurrentEditModalOpen(false);
    setSelectedAccount(null);
  };

  const handleShow = () => setShowAccountModal(true);

  const getAccountData = async () => {
    setLoading(true);
    try {
      const url = `/accounts?search=${encodeURIComponent(
        search || ""
      )}&currentpage=${page}&recordperpage=${recordPerPage}`;
      const response = await httpClient.get(url);
      if (response) {
        setDepartmentList(response.data);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      console.error("Fetch Account Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    setLoading(true);
    try {
      const obj = {
        name_head: formData.NameHead,
        head_code: formData.headCode,
        ob: formData.ob,
        ob_date: formData.obDate,
        parent_account: formData.parentAccount,
      };

      if (isCurrentEditModalOpen && selectedAccount) {
        obj["id"] = selectedAccount.id;
        await httpClient.put(`/accounts/${selectedAccount.id}`, obj);
      } else {
        await httpClient.post("/accounts", obj);
      }

      getAccountData();
    } catch (err) {
      console.error("Save Account Error:", err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await httpClient.delete(`/accounts/${id}`);
      getAccountData();
    } catch (err) {
      console.error("Delete Account Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setIsCurrentEditModalOpen(true);
    handleShow();
  };

  useEffect(() => {
    getAccountData();
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


      <div className="d-flex justify-content-between mb-2 ">
        <h5 className="fw-bold page-header">Accounts</h5>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search account"
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
            <i className="fas fa-plus me-2"></i> Add Account
          </button>
        </div>
      </div>

      <CreateAccountTable
        departmentList={departmentList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-secondary primary">
          <i className="fas fa-file-excel me-2"></i> Export to Excel
        </button>

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

      <Modal show={showAccountModal}
        backdrop="static" keyboard={false} className="modal-lg">
        <Modal.Header className="primary">
          <Modal.Title className="color-white fw-bold">
            {isCurrentEditModalOpen ? "Edit Account" : "Add Account"}
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <CreateAccountModal
            onSave={handleSave}
            account={selectedAccount}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
