import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import ReceiptionesReportTable from "../../others/table/receiptiones-report-table/ReceiptionesReportTable";
import ReceiptionesReportModal from "../../others/modal/receiptiones-report-modal/ReceiptionesReportModal";

export default function ReceiptionesReport() {
  const [discountList, setDiscountList] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [formData, setFormData] = useState({
    from: "",
    to: ""
  });

  const updateFilters = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLog = async () => {
    try {
      const url = `/users/receptionists_by_date?from_date=${formData.from}&to_date=${formData.to}`;
      const response = await httpClient.get(url);
      setDiscountList(response.data)
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const applyFilter = () => {
    handleLog();
    setShowFilterModal(false);
  };

  useEffect(() => {
    handleLog();
  }, []);

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
        discountList={discountList} />

      <ReceiptionesReportModal
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        formData={formData}
        onChange={updateFilters}
        onApply={applyFilter}
      />
    </>
  )
}