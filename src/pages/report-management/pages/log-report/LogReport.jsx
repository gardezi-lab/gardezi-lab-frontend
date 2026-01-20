import { useEffect, useState } from "react";
import axios from "axios";
// import httpClient from "../../../../services/httpClient";
import LogReportTable from "../../others/table/log-report-table/LogReportTable";
import LogReportFilterModal from "../../others/modal/log-report-filter-modal/LogReportFilterModal";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { "Content-Type": "application/json" }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token"); // optional
        }
        return Promise.reject(error);
    }
);

export default function LogReport() {
    const [logList, setLogList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        from: "",
        to: "",
    });

    const updateFilters = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLog = async () => {
        setLoading(true)
        try {
            const url = `/reporting/log_report`;
            const response = await axiosInstance.get(url);
            setLogList(response.activities);
        } catch (error) {
            console.log("Error:", error);
        }
        finally {
            setLoading(false)
        }
    };
    const applyFilter = () => {
        handleLog();
        setShowFilterModal(false);
    };

    useEffect(() => {
        handleLog();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold page-header">Log Report</h5>
            </div>

            <LogReportTable
                logList={logList}
                loading={loading}
            />

            {/* <LogReportFilterModal
                show={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                formData={formData}
                onChange={updateFilters}
                onApply={applyFilter}
            /> */}
        </>
    );
}
