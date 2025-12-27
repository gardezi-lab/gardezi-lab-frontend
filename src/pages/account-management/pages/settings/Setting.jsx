import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";

export default function Setting() {
  const [accountList, setAccountList] = useState([]);
  const [defaultCash, setDefaultCash] = useState("");
  const [defaultBank, setDefaultBank] = useState("");
  const [defaultStock, setDefaultStock] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Load accounts first
  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const res = await httpClient.get("/accounts");
        const accounts = res.data.map((acc) => ({
          ...acc,
          id: acc.id.toString(),
        }));
        setAccountList(accounts);
      } catch (err) {
        console.error("Error loading accounts:", err);
      }
    };

    loadAccounts();
  }, []);

  // Step 2: Once accounts are loaded, fetch default values
  useEffect(() => {
    if (accountList.length > 0) {
      loadDefaults();
    }
  }, [accountList]);

  const loadDefaults = async () => {
    try {
      const res = await httpClient.get("/default/1");
      // console.log("Full API Response:", res);

      const data = res?.data ?? res; // works whether interceptor exists or not

      // console.log("Default settings loaded:", data);

      setDefaultCash(data?.default_cash?.toString() || "");
      setDefaultBank(data?.default_bank?.toString() || "");
      setDefaultStock(data?.default_stock_account?.toString() || "");
    } catch (err) {
      console.error("Error loading default settings:", err);
    }
  };

  const handleUpdate = async () => {
    if (!defaultCash || !defaultBank || !defaultStock) return;

    console.log("Updating defaults with:", {
      default_cash: defaultCash,
      default_bank: defaultBank,
      default_stock_account: defaultStock,
    });

    setLoading(true);
    try {
      await httpClient.put("/default/1", {
        default_cash: defaultCash,
        default_bank: defaultBank,
        default_stock_account: defaultStock,
      });
      await loadDefaults();
    } catch (err) {
      console.error("Error updating settings", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <h5 className="fw-bold mb-4 text-center">Default Account Settings</h5>

      <div className="row g-4">
        {/* Cash Account */}
        <div className="col-md-4">
          <label className="form-label">Cash Account</label>
          <select
            className="form-select"
            value={defaultCash}
            onChange={(e) => setDefaultCash(e.target.value)}
            disabled={loading || accountList.length === 0}
          >
            <option value="">-- Select Cash Account --</option>
            {accountList.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name_head}
              </option>
            ))}
          </select>
        </div>

        {/* Bank Account */}
        <div className="col-md-4">
          <label className="form-label">Bank Account</label>
          <select
            className="form-select"
            value={defaultBank}
            onChange={(e) => setDefaultBank(e.target.value)}
            disabled={loading || accountList.length === 0}
          >
            <option value="">-- Select Bank Account --</option>
            {accountList.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name_head}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label ">Stock Account</label>
          <select
            className="form-select"
            value={defaultStock}
            onChange={(e) => setDefaultStock(e.target.value)}
            disabled={loading || accountList.length === 0}
          >
            <option value="">-- Select Stock Account --</option>
            {accountList.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name_head}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Update Button */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn primary px-5 text-white"
          onClick={handleUpdate}
          disabled={loading || accountList.length === 0}
        >
          {loading ? "Updating..." : "Update Settings"}
        </button>
      </div>
    </div>
  );
}
