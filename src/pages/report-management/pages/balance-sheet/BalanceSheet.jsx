import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import BalanceSheetTable from "../../others/table/balance-sheet/BalanceSheetTable";
import BalanceSheetModal from "../../others/modal/balance-sheet/BalanceSheetModal";

export default function BalanceSheet() {
    const [balanceList, setBalancetList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [formData, setFormData] = useState({
        from: "",
        to: "",
    });

    const BalanceReport = async () => {
        try {
            const url = `/balance_sheet?from_date=${formData.from}&to_date=${formData.to}`;
            const response = await httpClient.get(url);
            console.log(" balance sheeet", response);
            if (response) {
                setBalancetList(response.entries)
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleModalClose = () => {
        setShowFilterModal(false);
    };

    const applyFilter = () => {
        setShowFilterModal(false);
    };

    useEffect(() => {
        BalanceReport();
    }, []);

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold page-header">Balance Sheet</h5>
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
            <BalanceSheetTable
                balanceList={balanceList} />

            <BalanceSheetModal
                show={showFilterModal}
                onClose={handleModalClose}
                formData={formData}
                onChange={handleChange}
                onApply={applyFilter}
            />
        </>
    )
}