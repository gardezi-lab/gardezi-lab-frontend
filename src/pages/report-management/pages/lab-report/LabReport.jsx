import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import LabReportTable from "../../others/table/lab-report-table/LabReportTable";
import LabReportModal from "../../others/modal/lab-report-modal/LabReportModal";

export default function LabReport() {
  const [cashList, setCashList] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // const handleCash = async () => {
  //     const url = `/cash?from_date=${formData.from}&to_date=${formData.to}`;
  //     const response = await httpClient.get(url);
  //     if (response) {
  //         setCashList(response.result);
  //     }
  // }

  // useEffect(() => {
  //     handleCash()
  // }, []);

  // useEffect(() => {
  //     if (formData.from === "" && formData.to === "") {
  //         handleCash();
  //     }
  // }, []);

  const handleFilters = () => {
    setShowFilterModal(true);
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h5 className="fw-bold page-header">Lab Report</h5>
        <div className="d-flex gap-2">

          <button
            className="btn filter-btn"
            type="button"
            onClick={handleFilters}
          >
            <i className="fas fa-filter"></i>
          </button>
        </div>
      </div>
      <LabReportTable />

      <LabReportModal
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </>
  )
}