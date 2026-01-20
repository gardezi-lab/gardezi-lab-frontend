import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { Table, Modal, Button } from "react-bootstrap";
import { useState } from "react";


export default function CreateAccountTable({ departmentList, onDelete, onEdit, loading }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  return (

    <div
      className="table-responsive"
      style={{ maxHeight: "62vh", overflowY: "scroll" }}
    >
      <Table bordered striped hover size="sm">
        <thead>
          <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
            <th scope="col">Sr.</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Opening Balence</th>
            <th scope="col">Parent Account</th>
            <th scope="col">Opening Balence Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        {loading ? (
          <tbody>
            <tr>
              <td colSpan="7">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "250px", // ✅ adjust karo apne table ke hisaab se
                  }}
                >
                  <ThreeCircles
                    visible={true}
                    height="60"
                    width="60"
                    color="#fcb040"
                    ariaLabel="three-circles-loading"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        ) : departmentList?.length > 0 ? (
          <tbody>
            {departmentList.map((dept, index) => (
              <tr key={dept.id}>
                <td>{index + 1}</td>
                <td>{dept.name_head}</td>
                <td>{dept.head_code}</td>
                <td>{dept.ob}</td>
                <td>{dept.parent_account}</td>
                <td>{dept.ob_date}</td>
                <td>
                  <div className="d-flex gap-2 align-items-center justify-content-center">
                    <FaPenToSquare
                      onClick={() => onEdit(dept)} style={{ fontSize: "22px", cursor: "pointer" }} />
                    <FaRegTrashCan
                      //  onClick={() => {
                      //   if (window.confirm("Are you sure you want to delete this department?")) {
                      //     onDelete(dept.id);
                      //   }
                      // }}
                      onClick={() => {
                        setSelectedId(dept.id);
                        setShowDeleteModal(true);
                      }}
                      style={{ fontSize: "22px", cursor: "pointer", color: 'red' }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="3" className="text-center">
                No Departments Found
              </td>
            </tr>
          </tbody>
        )}
      </Table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header className="primary"  >
          <Modal.Title className="color-white fw-bold">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5 className="fw-semibold text-muted">
            Are you sure you want to delete this account?
          </h5>
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button variant="secondary" size="sm" className="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          {/* <Button variant="danger" size="sm" onClick={deletePatient}
                        style={{
                            backgroundColor: "#e74c3c",
                            borderColor: "#c0392b",
                        }}
                    >
                        Delete Visit
                    </Button> */}
          <Button variant="danger" size="sm"
            onClick={() => {
              onDelete(selectedId);
              setShowDeleteModal(false);
            }}
            style={{
              backgroundColor: "#c0392b",
              borderColor: "#922b21",
            }}
          >
            Delete Record
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}
