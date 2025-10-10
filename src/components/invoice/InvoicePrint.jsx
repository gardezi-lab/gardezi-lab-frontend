import gheader2 from "../../../public/assets/img/gheader2.png";

export default function InvoicePrint() {
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
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    background: "#f1f1f1",
                                    border: "2px solid #000",
                                    textAlign: "center",
                                    lineHeight: "120px",
                                    fontSize: "12px",
                                }}
                            >
                                QR CODE
                            </div>
                        </div>
                    </div>

                    {/* QR + Info */}
                    <div className="d-flex justify-content-between align-items-start mt-3">
                        <table className="table table-borderless mb-0" style={{ width: "75%" }}>
                            <tbody style={{ fontSize: "14px" }}>
                                <tr>
                                    <td><strong>Name :</strong></td>
                                    <td>SHOAIB TURN AROUNFK</td>
                                    <td><strong>Age :</strong></td>
                                    <td>99years/s</td>
                                </tr>
                                <tr>
                                    <td><strong>Gender :</strong></td>
                                    <td>Male</td>
                                    <td><strong>Ref# :</strong></td>
                                    <td>MURTAZA QASIM</td>
                                </tr>
                                <tr>
                                    <td><strong>MR No :</strong></td>
                                    <td>2025-GL-5914</td>
                                    <td><strong>Date :</strong></td>
                                    <td>10:29am/09-10-2025</td>
                                </tr>
                                <tr>
                                    <td><strong>Cell :</strong></td>
                                    <td>03344558899</td>
                                    <td><strong>Sample Taken in Lab</strong></td>
                                    <td></td>
                                </tr>
                                 {/* <tr>
                                    <td><strong>Father/Husband/MR# :</strong></td>
                                    <td></td>
                                </tr> */}
                                <tr>
                                    <td><strong>Remarks :</strong></td>
                                    <td colSpan="3"></td>
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
                            <tr>
                                <td>Endocrinology Report (T3, T4, TSH)</td>
                                <td>09-10-2025 02:29 PM</td>
                                <td>3300.00/-Rs</td>
                            </tr>
                            <tr>
                                <td>Blood Group</td>
                                <td>09-10-2025 09:29 AM</td>
                                <td>400.00/-Rs</td>
                            </tr>
                            <tr>
                                <td>ESR</td>
                                <td>09-10-2025 12:29 PM</td>
                                <td>200.00/-Rs</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Totals */}
                    <table className="table table-borderless" style={{maxWidth: '83%', fontSize: "14px" }}>
                        <tbody>
                            <tr>
                                <td><strong>Total Amount</strong></td>
                                <td>3,900.00/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Discount</strong></td>
                                <td>0.00/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Advance Received</strong></td>
                                <td>200.00/-Rs</td>
                            </tr>
                            <tr>
                                <td><strong>Balance Due</strong></td>
                                <td>3,700.00/-Rs</td>
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
