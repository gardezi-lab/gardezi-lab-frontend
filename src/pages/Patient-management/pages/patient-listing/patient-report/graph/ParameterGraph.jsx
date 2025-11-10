// LineGraph.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

export default function ParameterGraph({ label = "Parameter", dataPoints = [10, 20, 15, 25, 30] }) {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"], // fake x-axis labels
    datasets: [
      {
        label: label,
        data: dataPoints,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: `${label} Trend`, font: { size: 14 } },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "300px", }}>
      <Line data={data} options={options} />
    </div>
  );
}
