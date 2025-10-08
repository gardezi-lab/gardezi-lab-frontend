
import { useState, useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import httpClient from "../../../services/httpClient";

export default function AddResultTable({ AddResultList, onDelete, onEdit, loading }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [tests, setTests] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [resultData, setResultData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!showModal || !selectedResult) return;

    const fetchTests = async () => {
      try {
        const patient_Id =
          selectedResult?.patient_id ||
          selectedResult?.patient_entry_id ||
          selectedResult?.id;

        const response = await httpClient.get(`/patient_entry/tests_result/${patient_Id}`);
        console.log(" Full API Response:", response);

        const apiData = response.data ?? response;
        const dataArray = Array.isArray(apiData.tests) ? apiData.tests : [];
        console.log(" Extracted Tests Array:", dataArray);

        const formatted = dataArray.map((t, i) => ({
          id: i + 1,
          name: t.name || t.test_name || t || `Test ${i + 1}`,
        }));

        setTests(formatted);
      } catch (err) {
        console.error(" Error fetching tests:", err);
        setTests([]);
      }
    };

    fetchTests();
  }, [showModal, selectedResult]);

  useEffect(() => {
    if (!selectedTest) {
      setParameters([]);
      setResultData({});
      return;
    }

    const fetchParams = async () => {
      try {
        const res = await httpClient.get(`/test_parameters`, { test_id: selectedTest });
        const data = res?.data ?? res ?? [];
        setParameters(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching parameters:", err);
        setParameters([]);
      }
    };

    fetchParams();
  }, [selectedTest]);

  const handleTestChange = (e) => {
    setSelectedTest(e.target.value);
  };

  const handleResultChange = (paramId, value) => {
    setResultData((prev) => ({ ...prev, [paramId]: value }));
  };

  const handleSaveAll = async () => {
    if (!selectedTest) return alert("Select a test first");
    setSaving(true);
    try {
      const payload = {
        patient_entry_id:
          selectedResult.id ||
          selectedResult.results_id ||
          selectedResult.patient_entry_id,
        test_id: selectedTest,
        results: Object.entries(resultData).map(([paramId, value]) => ({
          parameter_id: paramId,
          value,
        })),
      };

      await httpClient.post("/save_results", payload);
      alert("Results saved successfully!");
      setShowModal(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const dynamicColumns = [...new Set(parameters.flatMap((p) => Object.keys(p)))];

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: "scroll" }}>
          <table className="table table-bordered" style={{ minHeight: "150px" }}>
            <thead>
              <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                <th>Sr.</th>
                <th>Name</th>
                <th>MR#</th>
                <th>Date</th>
                <th>Sample</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>

            {loading ? (
              <tbody >
                <tr style={{ height: "20px" }}>
                  <td colSpan="3">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "250px",
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
            ) : AddResultList?.length > 0 ? (
              <tbody>
                {AddResultList.map((row, idx) => (
                  <tr key={row.id || row.results_id || idx}>
                    <td>{idx + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.mr}</td>
                    <td>{row.date}</td>
                    <td>{row.sample}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setSelectedResult(row);
                          setShowModal(true);
                          setSelectedTest("");
                          setParameters([]);
                          setResultData({});
                        }}
                      >
                        Add Result
                      </button>
                    </td>
                    <td className="text-center">
                      <FaPenToSquare onClick={() => onEdit(row)} style={{ fontSize: 20, cursor: "pointer" }} />
                      <FaRegTrashCan
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this result?")) {
                            onDelete(row.id || row.results_id);
                          }
                        }}
                        style={{ fontSize: 20, cursor: "pointer", color: "red", marginLeft: 10 }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center">
                    No Results Found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        <Modal show={showModal} size="lg">
          <Modal.Header >
            <Modal.Title>Add Test Result</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {selectedResult && (
              <div className="mb-3 border rounded p-3 bg-light">
                <div className="row g-3">
                  <div className="col-md-4">
                    <Form.Label className="fw-bold">Name</Form.Label>
                    <Form.Control value={selectedResult.name || ""} readOnly />
                  </div>
                  <div className="col-md-4">
                    <Form.Label className="fw-bold">Date</Form.Label>
                    <Form.Control value={selectedResult.date || ""} readOnly />
                  </div>
                  <div className="col-md-4">
                    <Form.Label className="fw-bold">Sample</Form.Label>
                    <Form.Control value={selectedResult.sample || ""} readOnly />
                  </div>
                </div>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Select Test</Form.Label>
                <Form.Select value={selectedTest} onChange={handleTestChange}>
                  <option value="">-- Select Test --</option>
                  {tests.map((test) => (
                    <option key={test.id} value={test.test_id}>
                      {test.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form.Group>

            {parameters.length > 0 && (
              <Table bordered hover responsive>
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th>Sr.</th>
                    {dynamicColumns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((p, idx) => {
                    const pid = p.id ?? p.parameter_id ?? idx;
                    return (
                      <tr key={pid}>
                        <td>{idx + 1}</td>
                        {dynamicColumns.map((col) => (
                          <td key={col}>{p[col]}</td>
                        ))}
                        <td>
                          <Form.Control
                            type="text"
                            placeholder="Enter result"
                            value={resultData[pid] ?? ""}
                            onChange={(e) => handleResultChange(pid, e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveAll} disabled={parameters.length === 0 || saving}>
              {saving ? "Saving..." : "Save All Results"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
