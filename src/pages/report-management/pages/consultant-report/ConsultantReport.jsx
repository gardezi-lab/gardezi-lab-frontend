import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import ConsultantReportTable from "../../others/table/consultant-report-table/ConsultantReportTable";
import ConsultantReportModal from "../../others/modal/consultant-report-modal/ConsultantReportModal";


export default function ConsultantReport() {
    const [consultantList, setConsultantList] = useState([]);
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
            const url = `/users/doctors_by_date?from_date=${formData.from}&to_date=${formData.to}`;
            const response = await httpClient.get(url);
            setConsultantList(response.data)
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
                <h5 className="fw-bold page-header">Consultant Report</h5>
                <div className="d-flex gap-2">

                    <button
                        className="btn filter-btn"
                        type="button"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            <ConsultantReportTable consultantList={consultantList} />

            <ConsultantReportModal
                show={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                formData={formData}
                onChange={updateFilters}
                onApply={applyFilter}
            />
        </>
    )
}