import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import httpClient from "../../../../../services/httpClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Expense Report" },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function ExpenseReportChart({ fromDate, toDate }) {
  const [chartData, setChartData] = useState({
    labels: ["No Data"],
    datasets: [
      {
        label: "Total Expense",
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
        const url = `/dashboard/expense_report?from_date=${fromDate}&to_date=${toDate}`;
        const response = await httpClient.get(url);
        const data = response.data || [];

        if (data.length === 0) {
          // 👉 Empty state
          setIsEmpty(true);
          setChartData({
            labels: ["No Records"],
            datasets: [
              {
                label: "Total Expense",
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
          labels: data.map(i => i.voucher_type),
          datasets: [
            {
              label: "Total Expense",
              data: data.map(i => Number(i.total_expense)),
              backgroundColor: "rgba(154, 99, 255, 0.83)",
              borderColor: "rgba(166, 143, 221, 1)",
              borderWidth: 1,
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
      <Bar options={options} data={chartData} height={400} />

      {isEmpty && (
        <p
          style={{
            textAlign: "center",
            marginTop: "8px",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          No expense data available for the selected date range
        </p>
      )}
    </div>
  );
}
