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

  const fetchReports = async () => {
    try {
      const response = await httpClient.get("/reporting/log_report");

      if (response?.activities) {
        setReports((prevReports) => {
          // Filter new activities
          const existingIds = new Set(prevReports.map(r => r.id));
          const newActivities = response.activities.filter(r => !existingIds.has(r.id));

          // Prepend new activities to the top
          const allReports = [...newActivities, ...prevReports];

          // Group by patient_id and keep the latest activity per patient
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

  // Fetch new reports every 3 seconds
  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    setApply(!apply);
  };

  return (
    <>
      <div className="flex justify-content-center align-items-center vh-100">

        <div className="row mb-1">
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
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

          {/* ===== LEFT SIDE : GRAPHS (8 Columns) ===== */}
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

          {/* ===== RIGHT SIDE : LOG REPORTS (4 Columns) ===== */}
          <div className="col-md-4">

            {reports.length === 0 && <p>No reports found</p>}

            <div
              ref={containerRef}
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


















// import { useEffect, useState, useRef } from "react";
// import httpClient from "../../../../services/httpClient";
// import Footer from "../../../../shared/components/footer/Footer"

// export default function Dashboard() {

//   const [reports, setReports] = useState([]);
//   const containerRef = useRef(null);

//   const fetchReports = async () => {
//     try {
//       const response = await httpClient.get("/reporting/log_report");

//       if (response?.activities) {
//         setReports((prevReports) => {
//           // Filter new activities
//           const existingIds = new Set(prevReports.map(r => r.id));
//           const newActivities = response.activities.filter(r => !existingIds.has(r.id));

//           // Prepend new activities to the top
//           const allReports = [...newActivities, ...prevReports];

//           // Group by patient_id and keep the latest activity per patient
//           const grouped = {};
//           allReports.forEach((r) => {
//             const pid = r.patient_id;
//             if (!grouped[pid] || new Date(r.created_at) > new Date(grouped[pid].created_at)) {
//               grouped[pid] = r;
//             }
//           });

//           return Object.values(grouped);
//         });
//       }
//     } catch (error) {
//       console.error("Fetch Reports Error:", error);
//     }
//   };

//   // Fetch new reports every 3 seconds
//   useEffect(() => {
//     fetchReports();
//     const interval = setInterval(fetchReports, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="row">

//           {/* <div className="col-md-2"></div> */}
//           <div className="col-md-6">
//             <h1 className="text-center">Welcome to Dashboard</h1>
//           </div>
//           <div className="col-md-6">
//             <div>
//               {reports.length === 0 && <p>No reports found</p>}

//               <div
//                 ref={containerRef}
//                 style={{
//                   maxHeight: '400px',
//                   overflowY: 'auto',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: '16px',
//                   padding: '16px',
//                   borderRadius: '8px',

//                 }}
//               >
//                 {reports.map((r) => (
//                   <div
//                     key={r.id}
//                   >
//                     <p style={{ margin: 0, lineHeight: '1.5', fontSize: '14px' }}>
//                       <strong>Patient:</strong> {r.patient_name ?? "Unknown"} &nbsp; | &nbsp;
//                       <strong>MR #:</strong> {r.mr_number ?? "-"} &nbsp; | &nbsp;
//                       <strong>Activity:</strong> {r.activity} &nbsp; | &nbsp;
//                       <strong>Date:</strong> {new Date(r.created_at).toLocaleString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
