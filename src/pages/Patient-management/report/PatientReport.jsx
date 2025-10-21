import React, { useEffect, useState } from "react";
import gheader2 from "../../../../public/assets/img/gheader2.png";
import { Table } from "react-bootstrap";
import httpClient from "../../../services/httpClient";
import { useLocation } from "react-router-dom";

export default function PatientReport() {
    const [invoiceResult, setInvoiceResult] = useState(null);
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");

    const getPatientEntryData = async () => {
        try {
            const url = `/report/${id}`;
            const response = await httpClient.get(url);
            if (response) setInvoiceResult(response);
        } catch (err) {
            console.error("Fetch PatientEntry Error:", err);
        }
    };

    useEffect(() => {
        if (id) getPatientEntryData();
    }, [id]);

    return (
        <div
            style={{
                width: "95%",
                margin: "20px auto",
                backgroundColor: "#fff",
                border: "1px solid #000",
                color: "#000",
                fontFamily: "Arial, sans-serif",
                padding: "25px",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "2px solid #000",
                    paddingBottom: "10px",
                    marginBottom: "15px",
                }}
            >
                <div style={{ flex: "1" }}>
                    <img
                        src={gheader2}
                        alt="Gardezi Lab"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "contain",
                        }}
                    />
                </div>

                {invoiceResult?.qr_code && (
                    <div
                        style={{
                            flex: "0 0 auto",
                            textAlign: "right",
                            marginLeft: "30px",
                        }}
                    >
                        <img
                            src={invoiceResult.qr_code}
                            alt="QR Code"
                            style={{
                                width: "120px",
                                height: "120px",
                                border: "2px solid #000",
                                borderRadius: "8px",
                                padding: "4px",
                                backgroundColor: "#fff",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Patient Info */}
            <div style={{ marginBottom: "20px" }}>
                <h5
                    style={{
                        textAlign: "center",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        marginBottom: "20px",
                    }}
                >
                    Patient Report
                </h5>

                <Table borderless style={{ width: "100%", marginBottom: "15px" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "20%", fontWeight: "bold" }}>Patient Name:</td>
                            <td style={{ width: "30%" }}>
                                {invoiceResult?.patient?.patient_name || "-"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Age:</td>
                            <td>{invoiceResult?.patient?.age || "-"}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Gender:</td>
                            <td>{invoiceResult?.patient?.gender || "-"}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Cell:</td>
                            <td>{invoiceResult?.patient?.cell || "-"}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Report Date:</td>
                            <td>{invoiceResult?.patient?.invoice_date || "-"}</td>
                        </tr>
                    </tbody>
                </Table>

                {/* Tests Section */}
                {invoiceResult?.tests?.map((test, index) => (
                    <div key={index} style={{ marginTop: "25px" }}>
                        <h6
                            style={{
                                fontWeight: "700",
                                borderBottom: "1px solid #000",
                                paddingBottom: "5px",
                                marginBottom: "10px",
                            }}
                        >
                            {test.test_name}
                        </h6>

                        {test?.parameters?.length > 0 ? (
                            <Table
                                bordered
                                hover
                                responsive
                                size="sm"
                                style={{
                                    width: "100%",
                                    fontSize: "13px",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            fontWeight: "bold",
                                            borderBottom: "2px solid #000",
                                        }}
                                    >
                                        {
                                            (test.test_type === "four columns" || test.test_type === "three columns" || test.test_type === "two columns") &&
                                            <th>Parameter</th>
                                        }

                                        {
                                            (test.test_type === "four columns" || test.test_type === "three columns" || test.test_type === "two columns") &&
                                            <th>Result</th>
                                        }
                                        {
                                            (test.test_type === "three columns") &&
                                            <th>Cutt Off</th>
                                        }
                                        {
                                            (test.test_type === "four columns") &&
                                            <th>Unit</th>
                                        }
                                        {
                                            (test.test_type === "four columns") &&
                                            <th>Normal Range</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {test.parameters.map((param, idx) => (
                                        <tr key={idx}>
                                            {(test.test_type === "four columns" || test.test_type === "three columns" || test.test_type === "two columns") &&
                                                <td>{param.parameter_name}</td>
                                            }

                                            {
                                                (test.test_type === "four columns" || test.test_type === "three columns" || test.test_type === "two columns" || test.test_type === "editor") &&
                                                <td>
                                                    {test.test_type === "editor" ? (
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: param.result_value || "" }}
                                                        />
                                                    ) : (
                                                        param.result_value
                                                    )}
                                                </td>
                                            }
                                            {
                                                (test.test_type === "three columns" || test.test_type === "two columns") &&
                                                <td>{param.cutoff_value}</td>
                                            }
                                            {
                                                (test.test_type === "four columns") &&
                                                <td>{param.unit}</td>
                                            }

                                            {
                                                (test.test_type === "four columns") &&
                                                <td>{param.normalvalue}</td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p
                                style={{
                                    color: "#888",
                                    fontSize: "13px",
                                    marginLeft: "10px",
                                }}
                            >
                                No parameters available
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div
                style={{
                    borderTop: "1px solid #000",
                    paddingTop: "10px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#444",
                    marginTop: "30px",
                }}
            >
                <p style={{ margin: "0" }}>
                    Thank you for choosing <strong>Gardezi Lab</strong>.
                </p>
                <p style={{ margin: "0" }}>Printed on: {new Date().toLocaleString()}</p>
            </div>
        </div>
    );
}
