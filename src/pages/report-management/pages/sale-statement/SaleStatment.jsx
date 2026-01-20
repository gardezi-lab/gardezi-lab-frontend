import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import SaleStatementTable from "../../others/table/sale-statement-table/SaleStatementTable";
import SaleStatementModal from "../../others/modal/sale-statement-modal/SaleStatementModal";
import { Button } from "react-bootstrap";

export default function SaleStatement() {
  const [cashList, setCashList] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [loading, setLoading] = useState(false)

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
        <h5 className="fw-bold page-header">Sale Satement Report</h5>
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
      <SaleStatementTable
        // loading={loading}
      />

      <SaleStatementModal
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </>
  )
}