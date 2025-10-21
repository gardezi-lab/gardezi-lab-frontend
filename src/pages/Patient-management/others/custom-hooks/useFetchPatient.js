import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";

export function useFetchPatient() {
    const [patientList, setPatientList] = useState([]);
    const [loading, setLoading] = useState(false);


    const getPatientData = async () => {
        try {
            const url = `/patient_entry`;
            setLoading(true);
            const response = await httpClient.get(url);
            console.log("response",response)
            if (response) {

                setPatientList(response.patients);
            }
        } catch (err) {
            console.error("Fetch PatientEntry Error:", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPatientData();
    }, [])
    
    return { patientList, loading, getUpdatedPatientList: getPatientData }
}