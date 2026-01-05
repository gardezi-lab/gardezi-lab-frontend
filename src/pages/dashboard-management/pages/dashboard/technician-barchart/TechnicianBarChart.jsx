import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import httpClient from "../../../../../services/httpClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Technician Report" },
    tooltip: {
      enabled: true,
    },
  },
};

export default function TechnicianBarChart({ fromDate, toDate }) {
  const [chartData, setChartData] = useState({
    labels: ["No Data"],
    datasets: [
      {
        data: [0],
        backgroundColor: "rgba(200, 200, 200, 0.6)",
      },
    ],
  });

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!fromDate || !toDate) return;

    const fetchData = async () => {
      try {
        const url = `/dashboard/technician_report?from_date=${fromDate}&to_date=${toDate}`;
        const response = await httpClient.get(url);
        const data = response.data || [];

        if (data.length === 0) {
          // 👉 Empty state
          setIsEmpty(true);
          setChartData({
            labels: ["No Records"],
            datasets: [
              {
                data: [0],
                backgroundColor: "rgba(200, 200, 200, 0.6)",
              },
            ],
          });
          return;
        }

        // 👉 Normal state
        setIsEmpty(false);
        setChartData({
          labels: data.map(i => i.technician_name),
          datasets: [
            {
              data: data.map(i => Number(i.total_tests)),
              backgroundColor: [
                "#6366f1",
                "#22c55e",
                "#f97316",
                "#ef4444",
                "#0ea5e9",
              ],
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  return (
    <div style={{ position: "relative" }}>
      <Pie options={options} data={chartData} height={400} />

      {isEmpty && (
        <p
          style={{
            textAlign: "center",
            marginTop: "8px",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          No data available for the selected date range
        </p>
      )}
    </div>
  );
}
