import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";

export function useFetchPatient() {
    const [patientList, setPatientList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const getPatientData = async (page = 1,
        limit = 50, name = "", cell = "", from_date = "", to_date = "", mr_number = "") => {
        try {
            console.log("pagepage",page)
            const url = `/patient_entry?currentpage=${page.page}&recordperpage=${limit}&patient_name=${name}&cell=${cell}&from_date=${from_date}&to_date=${to_date}&mr_number=${mr_number}`;
            setLoading(true);
            const response = await httpClient.get(url);
            console.log("response", response)
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
        console.log("patientList", patientList)
    }, [])

    return { patientList, loading, getUpdatedPatientList: getPatientData }
}