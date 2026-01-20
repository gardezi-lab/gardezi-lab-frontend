import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import TrailBalanceTable from "../../others/table/trial-balance/TrialBalanceTable";
import TrialBalanceModal from "../../others/modal/trial-balance/TrialBalanceModal";

export default function TrialBalance() {
    const [trialList, setTrialList] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [formData, setFormData] = useState({
        from: "",
        to: "",
    });

    const BalanceReport = async () => {
        try {
            const url = `/trial_balance?from_date=${formData.from}&to_date=${formData.to}`;
            const response = await httpClient.get(url);
            console.log("trial balance sheeet", response);
            if (response) {
                setTrialList(response.trial_balance)
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
                <h5 className="fw-bold page-header">Trial Balance</h5>
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
            <TrailBalanceTable
                trialList={trialList} />

            <TrialBalanceModal
                show={showFilterModal}
                onClose={handleModalClose}
                formData={formData}
                onChange={handleChange}
                onApply={applyFilter}
            />
        </>
    )
}