import { useState, useEffect, useRef } from "react";
import Footer from "../../../../shared/components/footer/Footer";
import httpClient from "../../../../services/httpClient";
import LineChart from "./linechart/LineChart";
import CollectionBarChart from "./collection-barchart/CollectionBarChart";
import TechnicianBarChart from "./technician-barchart/TechnicianBarchart";
import ExpenseReportChart from "./expense-reportchart/ExpenseReportChart";

export default function Dashboard() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [apply, setApply] = useState(false);
  const [reports, setReports] = useState([]);
  const containerRef = useRef(null);
  const [draftFromDate, setDraftFromDate] = useState("");
  const [draftToDate, setDraftToDate] = useState("");

  const fetchReports = async () => {
    try {
      const response = await httpClient.get("/reporting/log_report");

      if (response?.activities) {
        setReports((prevReports) => {
          const existingIds = new Set(prevReports.map(r => r.id));
          const newActivities = response.activities.filter(r => !existingIds.has(r.id));
          const allReports = [...newActivities, ...prevReports];
          const grouped = {};
          allReports.forEach((r) => {
            const pid = r.patient_id;
            if (!grouped[pid] || new Date(r.created_at) > new Date(grouped[pid].created_at)) {
              grouped[pid] = r;
            }
          });
          return Object.values(grouped);
        });
      }
    } catch (error) {
      console.error("Fetch Reports Error:", error);
    }
  };


  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);

    const formatDate = (date) =>
      date.toISOString().split("T")[0];

    const from = formatDate(last7Days);
    const to = formatDate(today);

    setDraftFromDate(from);
    setDraftToDate(to);

    setFromDate(from);
    setToDate(to);
  }, []);


  const handleSubmit = () => {
    setFromDate(draftFromDate);
    setToDate(draftToDate);
  };


  return (
    <>
      <div className="flex justify-content-center align-items-center vh-100">
        <div className="row mb-1">
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={draftFromDate}
              onChange={(e) => setDraftFromDate(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={draftToDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDraftToDate(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn primary color-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="row">

          <div className="col-md-8">

            <div className="row g-3">
              <div className="col-md-6">
                <LineChart
                  fromDate={fromDate}
                  toDate={toDate}
                  key={`line-${apply}`}
                />
              </div>

              <div className="col-md-6">
                <CollectionBarChart
                  fromDate={fromDate}
                  toDate={toDate}
                  key={`collection-${apply}`}
                />
              </div>

              <div className="col-md-6">
                <TechnicianBarChart
                  fromDate={fromDate}
                  toDate={toDate}
                  key={`tech-${apply}`}
                />
              </div>

              <div className="col-md-6">
                <ExpenseReportChart
                  fromDate={fromDate}
                  toDate={toDate}
                  key={`expense-${apply}`}
                />
              </div>
            </div>

          </div>


          <div className="col-md-4">

            {reports.length === 0 && <p>No reports found</p>}

            <div

              className="border rounded p-3 fs-8"
              style={{
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {reports.map((r) => (
                <div key={r.id} className="mb-2">
                  <p className="small mb-0">
                    {r.patient_name ?? "Unknown"}
                    {r.mr_number ?? "-"}
                    {r.activity}
                    {" "}
                    {new Date(r.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </>
  );
}