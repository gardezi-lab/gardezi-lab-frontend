import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import httpClient from "../../../../../services/httpClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Sales Report" },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function LineChart({ fromDate, toDate }) {
  const [chartData, setChartData] = useState({
    labels: ["No Data"],
    datasets: [
      {
        label: "Total Fee",
        data: [0],
        borderColor: "rgba(200, 200, 200, 0.8)",
        backgroundColor: "rgba(200, 200, 200, 0.3)",
      },
    ],
  });

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!fromDate || !toDate) return;

    const fetchData = async () => {
      try {
        const url = `/dashboard/sale_report?from_date=${fromDate}&to_date=${toDate}`;
        const response = await httpClient.get(url);
        const data = response.data || [];

        if (data.length === 0) {
          // 👉 Empty state
          setIsEmpty(true);
          setChartData({
            labels: ["No Records"],
            datasets: [
              {
                label: "Total Fee",
                data: [0],
                borderColor: "rgba(200, 200, 200, 0.8)",
                backgroundColor: "rgba(200, 200, 200, 0.3)",
              },
            ],
          });
          return;
        }

        // 👉 Normal state
        setIsEmpty(false);
        setChartData({
          labels: data.map(i =>
            new Date(i.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          ),
          datasets: [
            {
              label: "Total Fee",
              data: data.map(i => Number(i.total_fee)),
              borderColor: "rgba(218, 113, 213, 0.44)",
              backgroundColor: "rgba(219, 99, 255, 0.5)",
              tension: 0.4,
              fill: true,
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
      <Line options={options} data={chartData} height={400} />

      {isEmpty && (
        <p
          style={{
            textAlign: "center",
            marginTop: "8px",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          No sales data available for the selected date range
        </p>
      )}
    </div>
  );
}
