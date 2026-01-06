import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

export default function FilterModal({
  isShowFilterModal,
  setIsShowFilterModal,
  search,
  setSearch,
  setPage
}) {
  const [tempSearch, setTempSearch] = useState("");

  useEffect(() => {
    if (isShowFilterModal) {
      setTempSearch(search);
    }
  }, [isShowFilterModal, search]);

  return (
    <Modal show={isShowFilterModal} size="md" centered>
      <Modal.Header className="primary">
        <Modal.Title className="text-white fw-bold">
          Filter Modal
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="form-label">Search by Name</label>
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
  );
}