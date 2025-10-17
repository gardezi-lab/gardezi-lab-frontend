

import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";

export function useFetchProfileTest() {
    const [testProfiles, setTestProfiles] = useState([]);
    const [loading, setLoading] = useState(false);


    const getProfileTest = async () => {
        try {
            const url = `/test_profile`;
            setLoading(true);
            const response = await httpClient.get(url);
            console.log("response", response)
            if (response) {
                setTestProfiles(response.data);
            }
        } catch (err) {
            console.error("Fetch PatientEntry Error:", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfileTest();
    }, [])

    return { testProfiles, loading, getProfileList: getProfileTest }
}

