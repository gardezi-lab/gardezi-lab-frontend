import React, { useEffect, useState } from "react";
import gheader2 from "../../../../public/assets/img/gheader2.png";
import { Table } from "react-bootstrap";

export default function InvoiceReport() {
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("selectedInvoice");
        if (storedData) {
            setSelectedInvoice({ data: JSON.parse(storedData) });

            setTimeout(() => {
                window.print();
            }, 800);
        }
    }, []);

    if (!selectedInvoice) {
        return <div className="text-center mt-5">Loading report...</div>;
    }

    const patient = selectedInvoice?.data?.patient;

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
            {/* ================= HEADER ================= */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: '2px solid rgb(0, 0, 0)',
                    paddingBottom: "10px",
                    marginBottom: "15px",
                }}
            >
                {/* Left Side - Logo */}
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

                {/* Right Side - QR Code */}
                {selectedInvoice?.data?.qr_code && (
                    <div
                        style={{
                            flex: "0 0 auto",
                            textAlign: "right",
                            marginLeft: "30px",
                        }}
                    >
                        <img
                            src={selectedInvoice.data.qr_code}
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

            {/* ================= BODY ================= */}
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

                {/* Patient Info */}
                <Table
                    borderless
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "15px",
                        zIndex: 1,
                        position: "relative",
                    }}
                >
                    <tbody>
                        <tr>
                            <td style={{ width: "20%", fontWeight: "bold" }}>
                                Patient Name:
                            </td>
                            <td style={{ width: "30%" }}>
                                {patient?.patient_name || "-"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Age:</td>
                            <td>{patient?.age || "-"}</td>
                        </tr>
                    </tbody>
                </Table>

                {/* Tests Section */}
                {selectedInvoice?.data?.tests?.map((test, index) => (
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

                        {test.parameters?.length ? (
                            <Table bordered hover responsive size="sm"
                                style={{
                                    width: "100%",
                                    fontSize: "13px",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            // background: "#f8f9fa",
                                            fontWeight: "bold",
                                            borderBottom: "2px solid #000",
                                        }}
                                    >
                                        <th style={{ width: "5%" }}>#</th>
                                        <th style={{ width: "35%" }}>
                                            Parameter
                                        </th>
                                        <th style={{ width: "20%" }}>Result</th>
                                        <th style={{ width: "20%" }}>Unit</th>
                                        <th style={{ width: "20%" }}>
                                            Normal Range
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {test.parameters.map((param, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{param.parameter_name}</td>
                                            <td>{param.result_value || "-"}</td>
                                            <td>{param.unit}</td>
                                            <td>{param.normalvalue}</td>
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

            {/* ================= FOOTER ================= */}
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
                <p style={{ margin: "0" }}>
                    Printed on: {new Date().toLocaleString()}
                </p>
            </div>
        </div >
    );
}
