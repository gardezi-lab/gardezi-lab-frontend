import { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";
import gheader2 from "../../../public/assets/img/gheader2.png";
import { useLocation } from "react-router-dom";

export default function InvoicePrint() {
    const [invoiceResult, setInvoiceResult] = useState(null);
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const getPatientEntryData = async () => {

        try {
            const url = `/invoice/${id}`;
            const response = await httpClient.get(url);
            if (response) {
                setInvoiceResult(response);

            }
        } catch (err) {
            console.error("Fetch PatientEntry Error:", err);
        } finally {

        }
    };

    useEffect(() => {
        getPatientEntryData();
    }, [id])

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                color: "#000",
                padding: "20px",
                fontSize: "14px",
            }}
        >
            {[1, 2].map((copy, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #000",
                        padding: "20px",
                        marginBottom: "40px",
                        position: "relative",
                        pageBreakAfter: index === 0 ? "always" : "auto",
                        backgroundColor: "#fff",
                    }}
                >
                    {/* Watermark */}
                    {copy === 2 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%) rotate(-30deg)",
                                fontSize: "90px",
                                color: "rgba(0,0,0,0.08)",
                                fontWeight: "bold",
                                zIndex: 0,
                                pointerEvents: "none",
                            }}
                        >
                            DUPLICATE
                        </div>
                    )}

                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            borderBottom: "2px solid #000",
                            paddingBottom: "10px",
                            marginBottom: "15px",
                        }}
                    >
                        {/* Left - Logo */}
                        <div style={{ flex: "1" }}>
                            <img
                                src={gheader2}
                                alt="Gardezi Lab"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>

                        {/* Right - QR */}
                        <div
                            style={{
                                width: "120px",
                                height: "120px",
                                border: "2px solid #000",
                                textAlign: "center",
                                lineHeight: "120px",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        >
                            {invoiceResult?.qr_code ? (
                                <img
                                    src={invoiceResult.qr_code}
                                    alt="QR Code"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            ) : (
                                "QR CODE"
                            )}
                        </div>
                    </div>

                    {/* Patient Info */}
                    <table
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
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Name:</td>
                                <td>{invoiceResult?.patient?.patient_name || "-"}</td>
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Age:</td>
                                <td>{invoiceResult?.patient?.age ? `${invoiceResult.patient.age} years` : "-"}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Gender:</td>
                                <td>{invoiceResult?.patient?.gender || "-"}</td>
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Ref#:</td>
                                <td>{invoiceResult?.patient?.refferd_by || "-"}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>MR No:</td>
                                <td>{invoiceResult?.patient?.MR_number || "-"}</td>
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Date:</td>
                                <td>{formattedDate}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Cell:</td>
                                <td>{invoiceResult?.patient?.cell || "-"}</td>
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                                    Sample Taken In Lab:
                                </td>
                                <td>{invoiceResult?.patient?.sample || "-"}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Remarks:</td>
                                <td colSpan="3">{invoiceResult?.patient?.remarks || "-"}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Tests Table */}
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            border: "1px solid #000",
                            fontSize: "14px",
                            marginBottom: "15px",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                                <th
                                    style={{
                                        border: "1px solid #000",
                                        padding: "6px",
                                        textAlign: "left",
                                    }}
                                >
                                    Description
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #000",
                                        padding: "6px",
                                        textAlign: "left",
                                    }}
                                >
                                    Reporting Time
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #000",
                                        padding: "6px",
                                        textAlign: "left",
                                    }}
                                >
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceResult?.tests?.length > 0 ? (
                                invoiceResult.tests.map((test, i) => (
                                    <tr key={i}>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: "6px",
                                            }}
                                        >
                                            {test?.test_name}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: "6px",
                                            }}
                                        >
                                            {test?.delivery_time}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: "6px",
                                            }}
                                        >
                                            {test?.fee ? `${test.fee}/-Rs` : "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center", padding: "8px" }}>
                                        No tests found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <table style={{ maxWidth: "83%", fontSize: "14px" }}>
                        <tbody>
                            <tr>
                                <td><strong>Total Amount</strong></td>
                                <td>{invoiceResult?.total_fee || 0}/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Discount</strong></td>
                                <td>{invoiceResult?.discount || 0}/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Advance Received</strong></td>
                                <td>{invoiceResult?.paid || 0}/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Balance Due</strong></td>
                                <td>{invoiceResult?.unpaid || 0}/-Rs</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Urdu Instruction */}
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "15px",
                            marginTop: "20px",
                            fontFamily: "'Noto Nastaliq Urdu', serif",
                            lineHeight: "1.8",
                        }}
                    >
                        اپنی رپورٹ دینے میں دیر ہو سکتی ہے۔ تاخیر کی وجہ سے رپورٹ میں دیر ہو سکتی ہے۔ اپنی رپورٹ آن لائن دیکھنے اور ڈاؤنلوڈ کرنے کے لیے کیو آر کوڈ کو سکین کریں یا پھر ہماری ویب سائٹ وزٹ کریں۔
                    </p>

                    {/* Footer */}
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "15px",
                            fontSize: "13px",
                            borderTop: "1px solid #000",
                            paddingTop: "10px",
                        }}
                    >
                        Username: <strong>{invoiceResult?.patient?.MR_number || "-"}</strong> | Password:{" "}
                        <strong>{invoiceResult?.password || "******"}</strong>
                        <br />
                        <span style={{ fontStyle: "italic" }}>* Receipt Made By *</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
