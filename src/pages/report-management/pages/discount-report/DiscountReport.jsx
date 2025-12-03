import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import DiscountReportTable from "../../others/table/discount-report-table/DiscountReportTable";
import DiscountReportModal from "../../others/modal/discount-report-modal/DiscountReportModal";


export default function DiscountReport() {
    const [discountList, setDiscountList] = useState([]);
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
            const url = `/patient_entry/discount_report?from_date=${formData.from}&to_date=${formData.to}`;
            const response = await httpClient.get(url);
            setDiscountList(response.data)
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
                <h5 className="fw-bold page-header">Discount Report</h5>
                <div className="d-flex gap-2">

                    <button
                        className="btn filter-btn"
                        type="button"
                        onClick={() => setShowFilterModal(true)}                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            <DiscountReportTable
                discountList={discountList} />

            <DiscountReportModal
                show={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                formData={formData}
                onChange={updateFilters}
                onApply={applyFilter}
            />
        </>
    )
}