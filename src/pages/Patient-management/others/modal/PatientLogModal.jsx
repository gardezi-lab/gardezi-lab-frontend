import { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";

export default function PatientLogModal({
  dedicatedPatientObj,
  patientActivityShow,
  setPatientActivityShow,
}) {
  const [patientLog, setPatientLog] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const closeLogModal = () => {
    setPatientActivityShow(false);
  };

  const getLogData = async () => {
    if (!dedicatedPatientObj?.id) return;
    try {
      setLoadingLogs(true);
      const url = `/patient_entry/activity/${dedicatedPatientObj.id}`;
      const response = await httpClient.get(url);
      setPatientLog(response.activities || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    getLogData();
  }, [patientActivityShow, dedicatedPatientObj]);

  return (
    <Modal show={patientActivityShow} onHide={closeLogModal} centered size="md">
      <Modal.Header className="primary">
        <Modal.Title className="color-white fw-bold">
          {dedicatedPatientObj?.patient_name || "Patient Activity"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {loadingLogs ? (
          <div className="d-flex justify-content-center py-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {patientLog.length > 0 ? (
              patientLog.map((log, index) => (
                <li key={index} className="list-group-item">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <small
                      style={{
                        flex: "0 0 120px",
                        color: "#007bff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {log.created_at}
                    </small>
                    <strong
                      style={{
                        flex: "1",
                        wordBreak: "break-word",
                        color: "#333",
                      }}
                    >
                      {log.activity}
                    </strong>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-muted text-center py-3 mb-0">
                No activity logs found.
              </p>
            )}
          </ul>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" className="secondary" onClick={closeLogModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
