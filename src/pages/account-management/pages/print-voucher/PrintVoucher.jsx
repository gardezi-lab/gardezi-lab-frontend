import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import httpClient from "../../../services/httpClient";
import logo from "../../../../public/assets/img/gheader2.png";

export default function PrintVoucher() {
  const [voucher, setVoucher] = useState(null);
  console.log("Voucher data:", voucher);

  // Read query param ?id=25
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  console.log("Voucher ID:", id);

  useEffect(() => {
    if (!id) return;

    const fetchVoucher = async () => {
      console.log("Fetching voucher for ID:", id);
      try {
        const res = await httpClient.get(`/journal_vouchers/print/${id}`);
         console.log("Fetched voucher:", res.data);
        setVoucher(res.data);
      } catch (err) {
        console.error("Error fetching voucher:", err);
      }
    };

    fetchVoucher();
  }, [id]);

  if (!voucher) return <p>Loading...</p>;
  if (!voucher.entries || voucher.entries.length === 0) return <p>No entries found.</p>;




  const totalDr = voucher.total_dr || 0;
  const totalCr = voucher.total_cr || 0;

  return (
    <div style={{ width: "90%", margin: "20px auto", border: "1px solid #000", padding: "20px", fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#000" }}>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <img src={logo} alt="Logo" style={{ width: "80%", height: "auto" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div><strong>VOUCHER # :</strong> <span style={{ border: "1px solid #000", padding: "3px 10px" }}>{voucher.listing_voucher}</span></div>
        <div><strong>DATED :</strong> {new Date(voucher.date).toLocaleDateString()}</div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #000", padding: "6px", textAlign: "center", width: "5%" }}>SR.</th>
            <th style={{ border: "1px solid #000", padding: "6px", textAlign: "center" }}>ACCOUNT</th>
            <th style={{ border: "1px solid #000", padding: "6px", textAlign: "center", width: "20%" }}>DEBIT <br />(Rupees)</th>
            <th style={{ border: "1px solid #000", padding: "6px", textAlign: "center", width: "20%" }}>CREDIT <br />(Rupees)</th>
          </tr>
        </thead>
        <tbody>
          {voucher.entries.map((e, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #000", textAlign: "center", padding: "6px" }}>{i + 1}</td>
              <td style={{ border: "1px solid #000", padding: "6px" }}>{e.account_head_name}</td>
              <td style={{ border: "1px solid #000", textAlign: "right", padding: "6px" }}>{parseFloat(e.dr).toFixed(2)}</td>
              <td style={{ border: "1px solid #000", textAlign: "right", padding: "6px" }}>{parseFloat(e.cr).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" style={{ border: "1px solid #000", textAlign: "right", fontWeight: "bold", padding: "6px" }}>TOTAL</td>
            <td style={{ border: "1px solid #000", textAlign: "right", fontWeight: "bold", padding: "6px" }}>{totalDr.toFixed(2)}</td>
            <td style={{ border: "1px solid #000", textAlign: "right", fontWeight: "bold", padding: "6px" }}>{totalCr.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}><strong>Narration :</strong> {voucher.narration}</div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "60px" }}>
        <div style={{ textAlign: "center" }}>...............................<br />Prepared By</div>
        <div style={{ textAlign: "center" }}>...............................<br />Received By</div>
        <div style={{ textAlign: "center" }}>...............................<br />Sign Director</div>
      </div>

      {/* <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button className="btn btn-primary" onClick={() => window.print()}>Print</button>
      </div> */}
    </div>
  );
}
