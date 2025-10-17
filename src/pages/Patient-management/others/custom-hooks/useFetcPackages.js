


import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";

export function useFetchPackages() {
    const [testPackageList, setTestPackageList] = useState([]);
    const [loading, setLoading] = useState(false);


    const getFetchPackage = async () => {
        try {
            const url = `/test-packages`;
            setLoading(true);
            const response = await httpClient.get(url);
            console.log("response", response)
            if (response) {
                setTestPackageList(response.data);
            }
        } catch (err) {
            console.error("Fetch PatientEntry Error:", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFetchPackage();
    }, [])

    return { testPackageList, loading, getFetchPackage: getFetchPackage }
}
