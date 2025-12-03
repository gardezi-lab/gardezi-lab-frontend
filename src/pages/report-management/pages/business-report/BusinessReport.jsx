import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import BusinessReportTable from "../../others/table/business-report/BusinessReportTable";
import BusinessReportFilterModal from "../../others/modal/business-report-filter-modal/BusinessReportFilterModal";


export default function BusinessReport() {
    const [cashList, setCashList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);

    // const handleCash = async () => {
    //     const url = `/cash?from_date=${formData.from}&to_date=${formData.to}`;
    //     const response = await httpClient.get(url);
    //     if (response) {
    //         setCashList(response.result);
    //     }
    // }

    // useEffect(() => {
    //     handleCash()
    // }, []);

    // useEffect(() => {
    //     if (formData.from === "" && formData.to === "") {
    //         handleCash();
    //     }
    // }, []);

    const handleFilters = () => {
        setShowFilterModal(true);
    }

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold page-header">Business Report</h5>
                <div className="d-flex gap-2">

                    <button
                        className="btn filter-btn"
                        type="button"
                        onClick={handleFilters}
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            <BusinessReportTable />

            <BusinessReportFilterModal
                show={showFilterModal}
                onClose={() => setShowFilterModal(false)}
            />
        </>
    )
}