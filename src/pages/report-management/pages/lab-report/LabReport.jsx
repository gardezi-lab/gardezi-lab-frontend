import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import LabReportTable from "../../others/table/lab-report-table/LabReportTable";
import LabReportModal from "../../others/modal/lab-report-modal/LabReportModal";
import { Button } from "react-bootstrap";

export default function LabReport() {
  const [cashList, setCashList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    center_id: ""
  });


  const CCList = async () => {
    setLoading(true)
    try {
      const response = await httpClient.get("/collectioncenter");
      setCcList(response.data);
    } catch (error) {
      console.log("Error loading re list:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleCash = async () => {

    const url = `/reporting/cc_report/${formData.center_id}?from_date=${formData.from}&to_date=${formData.to}`;
    const response = await httpClient.get(url);

    if (response) {
      setCashList(response.data);
    }
  }

  useEffect(() => {
    handleCash();
    CCList();
  }, []);


  const handleFilters = () => {
    setShowFilterModal(true);
  }

  const handleModalClose = () => {
    setFormData({
      from: "",
      to: "",
      center_id: ""
    });
    setShowFilterModal(false);
  };

  const applyFilter = () => {
    handleCash();
    setShowFilterModal(false);

  };

  const onChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };


  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h5 className="fw-bold page-header">Lab Report</h5>
        <div className="d-flex gap-2">

          <Button
            variant="outline-success"
            size="sm"
            className="btn filter-btn"
            type="button"
            onClick={handleFilters}
          >
            <i className="fas fa-filter"></i>
          </Button>
        </div>
      </div>
      <LabReportTable
        cashList={cashList}
        loading={loading}
      />

      <LabReportModal
        formData={formData}
        show={showFilterModal}
        ccList={ccList}
        onClose={handleModalClose}
        applyFilter={applyFilter}
        onChange={onChange}
      />

    </>
  )
}