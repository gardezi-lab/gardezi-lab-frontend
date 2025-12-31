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
};

export default function ExpenseReportChart({ fromDate, toDate }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!fromDate || !toDate) return;

        const fetchData = async () => {
            try {
                const url = `/dashboard/expense_report?from_date=${fromDate}&to_date=${toDate}`;
                const response = await httpClient.get(url);
                const data = response.data;

                setChartData({
                    labels: data.map(i => i.voucher_type),
                    datasets: [
                        {
                            label: "Total Fee",
                            data: data.map(i => Number(i.total_expense)),
                            borderColor: "rgba(166, 143, 221, 1)",
                            backgroundColor: "rgba(154, 99, 255, 0.83)",
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

    return <Bar options={options} data={chartData} height={400} />;
}
