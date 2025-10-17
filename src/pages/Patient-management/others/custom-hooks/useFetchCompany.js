

import { useState, useEffect } from "react";
import httpClient from "../../../../services/httpClient";

export function useFetchCompanies() {
    const [companyList, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(false);


    const getCompanies = async () => {
        try {
            const url = `/companies_panel`;
            setLoading(true);
            const response = await httpClient.get(url);
            console.log("response", response)
            if (response) {
                setCompanyList(response.data);
            }
        } catch (err) {
            console.error("Fetch PatientEntry Error:", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCompanies();
    }, [])

    return { companyList, loading, getCompinesList: getCompanies }
}