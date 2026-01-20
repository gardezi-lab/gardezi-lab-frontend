import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import DuePatientTable from "../../others/table/due-patient-table/DuePatientTable";
import DuePatientModal from "../../others/modal/due-patient-modal/DuePatientModal";


export default function DuePatient() {
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
      const url = `/reporting/due_report?from_date=${formData.from}&to_date=${formData.to}`;
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
        <h5 className="fw-bold page-header">Due Pateint Report</h5>
      </div>
      <DuePatientTable
        discountList={discountList} />

      {/* <DuePatientModal
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        formData={formData}
        onChange={updateFilters}
        onApply={applyFilter}
      /> */}
    </>
  )
}