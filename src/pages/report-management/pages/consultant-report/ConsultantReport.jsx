import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import ConsultantReportTable from "../../others/table/consultant-report-table/ConsultantReportTable";
import ConsultantReportModal from "../../others/modal/consultant-report-modal/ConsultantReportModal";
import { Button } from "react-bootstrap";


export default function ConsultantReport() {
    const [consultantList, setConsultantList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [consultant, setConsultant] = useState([]);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        doctors_id: ""
    });

    const updateFilters = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const Consultant = async () => {
        try {
            const response = await httpClient.get("/users/doctors");
            setConsultant(response.data);
        } catch (error) {
            console.log("Error loading Consultant:", error);
        }
    };

    const handleLog = async () => {
        setLoading(true)
        try {
            if (!formData.doctors_id) {
                setConsultantList([]);
                return;
            }
            const url = `/reporting/doctors_report/${formData.doctors_id}?from_date=${formData.from}&to_date=${formData.to}`;
            const response = await httpClient.get(url);
            setConsultantList(response.patients);
        } catch (error) {
            console.log("Error in API call:", error);
        } finally {
            setLoading(false)
        }
    };


    const applyFilter = () => {
        handleLog();
        setShowFilterModal(false);
    };


    useEffect(() => {
        Consultant();
        handleLog();
    }, [formData.doctors_id, formData.from, formData.to]);

    const handleModalClose = () => {
        setFormData({
            from: "",
            to: "",
            doctors_id: ""
        });
        setShowFilterModal(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold page-header">Consultant Report</h5>
                <div className="d-flex gap-2">

                    <Button
                        variant="outline-success"
                        size="sm"
                        className="btn filter-btn"
                        type="button"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="fas fa-filter"></i>
                    </Button>
                </div>
            </div>
            <ConsultantReportTable
                consultantList={consultantList}
                loading={loading}
            />

            <ConsultantReportModal
                show={showFilterModal}
                consultant={consultant}
                onClose={handleModalClose}
                formData={formData}
                onChange={updateFilters}
                onApply={applyFilter}
            />
        </>
    )
}