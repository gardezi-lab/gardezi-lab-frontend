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

export default function ParameterGraph({ label = "", dataPoints = [], dates = [] }) {
  let validLength = Math.min(dates.length, dataPoints.length);
  let labels = dates.slice(0, validLength);

  let values = dataPoints.slice(0, validLength).map(v => {
    const numericValue = parseFloat(String(v).replace(/[^\d.-]/g, ""));
    return isNaN(numericValue) ? null : numericValue; 
  });

  if (values.length === 1 && values[0] !== null) {
    const dummyDate = "Next Date";
    const dummyValue = values[0];

    labels = [...labels, dummyDate];
    values = [...values, dummyValue];
  }



  console.log(`Graph for ${label}:`, values);
  const data = {
    labels,
    datasets: [
      {
        label: label || "Trend",
        data: values,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
        pointRadius: 3,
        spanGaps: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } },
    
  };

  return (
    <div style={{ width: "300px", height: "150px" }}>
      <Line data={data} options={options} />
    </div>
  );
}
