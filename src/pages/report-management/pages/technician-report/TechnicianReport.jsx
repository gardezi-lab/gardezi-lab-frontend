import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import TechnicianTable from "../../others/table/technician/TechnicianTable";
import TechnicianModal from "../../others/modal/technician/TechnicianModal";

export default function TechnicianReport() {
    const [cashList, setCashList] = useState([]);
    const [technician, setTechnician] = useState ([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        technician_id: ""
    });


    const tech = async () => {
        try {
            const response = await httpClient.get("/users/technicians");
            setTechnician(response.data)
        } catch (error) {
            console.log("Error loading re list:", error);
        }
    };

    const handleCash = async () => {
        const url = `/reporting/technician_report/${formData.technician_id}?from_date=${formData.from}&to_date=${formData.to}`;
        const response = await httpClient.get(url);

        if (response) {
            setCashList(response.tests);
        }
    }

    useEffect(() => {
        handleCash();
        tech();
    }, []);


    const handleFilters = () => {
        setShowFilterModal(true);
    }

    const handleModalClose = () => {
        setFormData({
            from: "",
            to: "",
            technician_id: ""
        });
        setShowFilterModal(false);
    };

    const applyFilter = () => {
        handleCash();
        setShowFilterModal(false);

    };

    const onChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };


    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold page-header">Technician Report</h5>
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
            <TechnicianTable
                cashList={cashList}
            />

            <TechnicianModal
                formData={formData}
                show={showFilterModal}
                technician={technician}
                onClose={handleModalClose}
                applyFilter={applyFilter}
                onChange={onChange}
            />

        </>
    )
}