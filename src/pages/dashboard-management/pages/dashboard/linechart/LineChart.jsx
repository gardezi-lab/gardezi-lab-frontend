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
};

export default function LineChart({ fromDate, toDate }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!fromDate || !toDate) return;

        const fetchData = async () => {
            try {
                const url = `/dashboard/sale_report?from_date=${fromDate}&to_date=${toDate}`;
                const response = await httpClient.get(url);
                const data = response.data;

                setChartData({
                    labels: data.map(i =>
                        new Date(i.created_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })
                    ),
                    datasets: [
                        {
                            label: "Total Fee",
                            data: data.map(i => Number(i.total_fee)),
                            borderColor: "rgba(218, 113, 213, 0.44)",
                            backgroundColor: "rgba(219, 99, 255, 0.5)",
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

    return <Line options={options} data={chartData} height={400} />;
}
