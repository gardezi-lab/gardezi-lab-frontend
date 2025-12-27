import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import ReceiptionesReportTable from "../../others/table/receiptiones-report-table/ReceiptionesReportTable";
import ReceiptionesReportModal from "../../others/modal/receiptiones-report-modal/ReceiptionesReportModal";

export default function ReceiptionesReport() {
  const [receptionList, setReceptionList] = useState([]);   // 👈 Dropdown data
  const [reportList, setReportList] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    receptionist_id: ""
  });

  const loadReceptionList = async () => {
    try {
      const response = await httpClient.get("/users/receptionists");
      setReceptionList(response.data);
    } catch (error) {
      console.log("Error loading re list:", error);
    }
  };

  const loadReport = async () => {
    try {
      const url = `/users/receptionists_by_date/${formData.receptionist_id}?from_date=${formData.from}&to_date=${formData.to}`;
      const response = await httpClient.get(url);
      setReportList(response.data);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleModalClose = () => {
    setFormData({
      from: "",
      to: "",
      receptionist_id: ""
    });
    setShowFilterModal(false);
  };

  const updateFilters = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const applyFilter = () => {
    loadReport();
    setShowFilterModal(false);

  };

  useEffect(() => {
    loadReceptionList();
    loadReport();
  }, [formData.receptionist_id, formData.from, formData.to]);

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h5 className="fw-bold page-header">Receiptiones Report</h5>
        <div className="d-flex gap-2">

          <button
            className="btn filter-btn"
            type="button"
            onClick={() => setShowFilterModal(true)}
          >
            <i className="fas fa-filter"></i>
          </button>
        </div>
      </div>
      <ReceiptionesReportTable
        reportList={reportList} />

      <ReceiptionesReportModal
        show={showFilterModal}
        onClose={handleModalClose}
        formData={formData}
        receptionList={receptionList}
        onChange={updateFilters}
        onApply={applyFilter}
      />
    </>
  )
}