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
    },
};

export default function TechnicianBarChart({ fromDate, toDate }) {
    const [chartData, setChartData] = useState(null
   
      );

    useEffect(() => {
        if (!fromDate || !toDate) return;

        const fetchData = async () => {
            try {
                const url = `/dashboard/technician_report?from_date=${fromDate}&to_date=${toDate}`;
                const response = await httpClient.get(url);
                const data = response.data;

                setChartData({
                    labels: data.map(i => i.technician_name),
                    datasets: [
                        {
                            data: data.map(i => Number(i.total_tests)),
                            borderColor: "rgba(59, 43, 202, 1)",
                            backgroundColor: "rgba(99, 102, 255, 0.83)",
                        },
                    ],
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);
    if (!chartData) return null;

    return <Pie options={options} data={chartData} height={400} />;
}
