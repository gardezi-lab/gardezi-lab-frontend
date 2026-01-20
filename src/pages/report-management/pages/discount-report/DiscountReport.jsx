import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import DiscountReportTable from "../../others/table/discount-report-table/DiscountReportTable";
import DiscountReportModal from "../../others/modal/discount-report-modal/DiscountReportModal";
import { Button } from "react-bootstrap";


export default function DiscountReport() {
    const [discountList, setDiscountList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        from: "",
        to: ""
    });

    const updateFilters = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLog = async () => {
        setLoading(true)
        try {
            const url = `/reporting/discount_report?from_date=${formData.from}&to_date=${formData.to}`;
            const response = await httpClient.get(url);
            setDiscountList(response.data)
        } catch (error) {
            console.log("Error:", error);
        } finally {
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
                <h5 className="fw-bold page-header">Discount Report</h5>
                <div className="d-flex gap-2">

                    <Button
                        variant="outline-success"
                        size="sm"
                        className="btn filter-btn"
                        type="button"
                        onClick={() => setShowFilterModal(true)}                    >
                        <i className="fas fa-filter"></i>
                    </Button>
                </div>
            </div>
            <DiscountReportTable
                discountList={discountList}
                loading={loading} />

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