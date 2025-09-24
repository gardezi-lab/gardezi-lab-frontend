import { useState } from "react";

export default function JournalVocher() {
  const [rows, setRows] = useState([]);
  const [head, setHead] = useState("");
  const [dr, setDr] = useState("");
  const [cr, setCr] = useState("");

  const handleClick = () => {
    if (!head) return;

    const newRow = {
      head,
      dr: dr === "" ? 0 : Number(dr),
      cr: cr === "" ? 0 : Number(cr),
    };

    setRows([...rows, newRow]);

    setHead("");
    setDr("");
    setCr("");
  };

  const handleDelete = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const totalDr = rows.reduce((sum, row) => sum + row.dr, 0);
  const totalCr = rows.reduce((sum, row) => sum + row.cr, 0);

  return (
    <>
      <div className="card px-0">
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: "#f39c12",
            color: "#fff",
            padding: "2rem 1rem",
            height: "48px",
          }}
        >
          <h5 className="card-title mb-0" style={{ color: "#fff" }}>
            Journal Voucher
          </h5>
        </div>

        <div className="card-body">
          <div className="row g-1">
            <div className="col-md-6">
              <div className="mb-2">
                <label className="fw-bold mb-2">Date :</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Account Name"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <label className="fw-bold mb-2">Narration :</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Narration"
                />
              </div>
            </div>
          </div>

          <div className="row g-1">
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">Head Group :</label>
                <select
                  className="form-select"
                  value={head}
                  onChange={(e) => setHead(e.target.value)}
                >
                  <option value="">Select Head</option>
                  <option value="M&P">M&P</option>
                  <option value="Philbatmy">Philbatmy</option>
                  <option value="Lab">Lab</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-2">
                <label className="fw-bold mb-2">Opening Dr :</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="0"
                  value={dr}
                  onChange={(e) => setDr(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-2">
                <label className="fw-bold mb-2">Opening Cr :</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="0"
                  value={cr}
                  onChange={(e) => setCr(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-success fw-bold"
                style={{ cursor: "pointer", fontSize: "22px" }}
                onClick={handleClick}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="row">
            <div className="col-md-6">
              {rows.length > 0 && (
                <div className="table-responsive mt-3">
                  <table className="table table-bordered">
                    <thead style={{ backgroundColor: "deepskyblue" }}>
                      <tr>
                        <th>Account Head</th>
                        <th>Dr</th>
                        <th>Cr</th>
                        <th>DEL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index}>
                          <td>{row.head}</td>
                          <td>{row.dr}</td>
                          <td>{row.cr}</td>
                          <td>
                            <span
                              className="text-danger fw-bold"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(index)}
                            >
                              X
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: "salmon" }}>
                        <td><b>TOTAL</b></td>
                        <td><b>{totalDr}</b></td>
                        <td><b>{totalCr}</b></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <button className="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
