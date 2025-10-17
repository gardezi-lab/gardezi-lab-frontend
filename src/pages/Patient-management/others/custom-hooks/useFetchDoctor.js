

import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";

export function useFetchDoctor() {
    const [doctorList, setDoctorList] = useState([]);
    const [loading, setLoading] = useState(false);


    const getDoctor = async () => {
        try {
            const url = `/users/doctors`;
            setLoading(true);
            const response = await httpClient.get(url);
            console.log("response", response)
            if (response) {
                setDoctorList(response.data);
            }
        } catch (err) {
            console.error("Fetch PatientEntry Error:", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDoctor();
    }, [])

    return { doctorList, loading, getDoctor: getDoctor }
}

