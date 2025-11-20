import { useEffect, useState } from "react";
import StockInventoryTable from "./StockInventoryTable";
import httpClient from "../../../services/httpClient";

export default function StockInventory() {
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(false);


  // Fetch Stock Purchase Data
  const getStockData = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get("/inventory/all");
      console.log("Fetch Stock Purchase Full Response:", response);
      console.log("Inventory Data:", response.data);

      setStockList(response.data);


    } catch (err) {
      console.error("Fetch Stock Purchase Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStockData();
  }, []);


  return (
    <div>
      {/* Header + Search + Add Button */}
      <div className="d-flex justify-content-between mb-2">
        <h5 className="fw-bold page-header">Inventory</h5>
      </div>

      {/* Table Component */}
      <StockInventoryTable
        stockList={stockList}
        loading={loading}
      />

      {/* Footer Buttons */}
      <div className="d-flex justify-content-end align-items-center mt-3">
        <button className="btn btn-secondary primary">
          <i className="fas fa-file-excel me-2"></i> Export to Excel
        </button>
      </div>

    </div>
  );
}
