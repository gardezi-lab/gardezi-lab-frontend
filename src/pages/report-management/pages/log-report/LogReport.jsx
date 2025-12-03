import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import LogReportTable from "../../others/table/log-report-table/LogReportTable";
import LogReportFilterModal from "../../others/modal/log-report-filter-modal/LogReportFilterModal";

export default function LogReport() {
    const [logList, setLogList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const [formData, setFormData] = useState({
        from: "",
        to: ""
    });

    const updateFilters = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLog = async () => {
        try {
            const url = `/patient_entry/activity?from_date=${formData.from}&to_date=${formData.to}`;
            const response = await httpClient.get(url);

            setLogList(response.activities);

        } catch (error) {
            console.log("Error:", error);
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

                <button
                    className="btn filter-btn"
                    type="button"
                    onClick={() => setShowFilterModal(true)}
                >
                    <i className="fas fa-filter"></i>
                </button>
            </div>

            <LogReportTable logList={logList} />

            <LogReportFilterModal
                show={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                formData={formData}
                onChange={updateFilters}
                onApply={applyFilter}
            />
        </>
    );
}
