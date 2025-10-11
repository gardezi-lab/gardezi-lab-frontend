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
            console.log("invoce response", response)
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
    }, [])

    return (
        <div className="container mt-3" style={{ fontFamily: "Arial, sans-serif", color: "#000" }}>
            {[1, 2].map((copy, index) => (
                <div
                    key={index}
                    className="border p-3 mb-5 position-relative"
                    style={{
                        pageBreakAfter: index === 0 ? "always" : "auto",
                        position: "relative"
                    }}
                >
                    {/* Duplicate Watermark */}
                    {copy === 2 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%) rotate(-30deg)",
                                fontSize: "90px",
                                color: "rgba(0,0,0,0.1)",
                                fontWeight: "bold",
                                zIndex: 0,
                                pointerEvents: "none"
                            }}
                        >
                            DUPLICATE
                        </div>
                    )}

                    {/* Header */}
                    <div className="row align-items-center mb-2 text-center text-md-start">
                        {/* Logo Section */}
                        <div className="col-12 col-md-9 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
                            <img
                                src={gheader2}
                                alt="Gardezi Lab"
                                className="img-fluid"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>

                        {/* QR Code Section */}
                        <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end">
                            <div
                            // style={{
                            //     width: "10px",
                            //     height: "10px",
                            //     background: "#f1f1f1",
                            //     border: "2px solid #000",
                            //     textAlign: "center",
                            //     lineHeight: "120px",
                            //     fontSize: "12px",
                            // }}
                            >

                                <img style={{ height: '100px' }} src={invoiceResult?.qr_code} alt="" srcset="" />
                            </div>
                        </div>
                    </div>

                    {/* QR + Info */}
                    <div className="d-flex justify-content-between align-items-start mt-3">
                        <table className="table table-borderless mb-0" style={{ width: "75%" }}>
                            <tbody style={{ fontSize: "14px" }}>
                                <tr>
                                    <td><strong>Name :</strong></td>
                                    <td>{invoiceResult?.patient?.patient_name}</td>
                                    <td><strong>Age :</strong></td>
                                    <td> {invoiceResult?.patient?.age} years/s</td>
                                </tr>
                                <tr>
                                    <td><strong>Gender :</strong></td>
                                    <td>{invoiceResult?.patient?.gender}</td>
                                    <td><strong>Refferd by :</strong></td>
                                    <td>{invoiceResult?.patient?.refferd_by}</td>
                                </tr>
                                <tr>
                                    <td><strong>MR No :</strong></td>
                                    <td>{invoiceResult?.patient?.MR_number}</td>
                                    <td><strong>Invoice Issue Date :</strong></td>
                                    <td>{formattedDate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Cell :</strong></td>
                                    <td>{invoiceResult?.patient?.cell}</td>
                                    <td><strong>Sample</strong></td>
                                    <td>{invoiceResult?.patient?.sample}</td>
                                </tr>
                                {/* <tr>
                                    <td><strong>Father/Husband/MR# :</strong></td>
                                    <td></td>
                                </tr> */}
                                <tr>
                                    <td><strong>Remarks :</strong></td>
                                    <td colSpan="3">{invoiceResult?.patient?.remarks}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Tests Table */}
                    <table className="table table-bordered mt-3" style={{ fontSize: "14px" }}>
                        <thead className="table-light">
                            <tr>
                                <th>Description</th>
                                <th>Reporting Time</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoiceResult?.tests?.map((test) => {
                                    return (
                                        <tr>
                                            <td>{test?.test_name}</td>
                                            <td>09-10-2025 02:29 PM</td>
                                            <td>{test?.fee}/-Rs</td>
                                        </tr>
                                    )
                                })
                            }



                        </tbody>
                    </table>

                    {/* Totals */}
                    <table className="table table-borderless" style={{ maxWidth: '83%', fontSize: "14px" }}>
                        <tbody>
                            <tr>
                                <td><strong>Total Amount</strong></td>
                                <td>{invoiceResult?.total_fee}/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Discount</strong></td>
                                <td>{invoiceResult?.discount}/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Advance Received</strong></td>
                                <td>{invoiceResult?.paid}/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Balance Due</strong></td>
                                <td>{invoiceResult?.unpaid}/-Rs</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Urdu Text */}
                    <p
                        className="text-center mt-3"
                        style={{ fontSize: "15px", fontFamily: "Noto Nastaliq Urdu, serif" }}
                    >
                        اپنی رپورٹ دینے میں دیر ہو سکتی ہے۔ تاخیر کی وجہ سے رپورٹ میں دیر ہو سکتی ہے۔
                        اپنی رپورٹ آن لائن دیکھنے اور ڈاؤنلوڈ کرنے کے لیے کیو آر کوڈ کو سکین کریں یا پھر ہماری ویب سائٹ وزٹ کریں۔
                    </p>

                    {/* Footer */}
                    <div className="text-center mt-2" style={{ fontSize: "13px" }}>
                        Username : <strong>2025-GL-5914</strong> Password : <strong>22227630</strong>
                        <br />
                        <span className="fst-italic">* Receipt Made By *</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
