export default function BasicInformation({ invoiceResult, barcode }) {
    return (
        <>
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
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Father/Husband:</td>
                        <td>{invoiceResult?.patient?.age ? `${invoiceResult.patient.father_hasband_MR} years` : "-"}</td>

                    </tr>
                    <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Gender:</td>
                        <td>{invoiceResult?.patient?.gender || "-"}</td>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Registration Date::</td>
                        <td>{"-"}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>MR No:</td>
                        <td>{invoiceResult?.patient?.MR_number || "-"}</td>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Date:</td>
                        <td>{invoiceResult?.patient?.invoice_date}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Phone:</td>
                        <td>{invoiceResult?.patient?.cell || "-"}</td>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                            Sample Taken In Lab:
                        </td>
                        <td>{invoiceResult?.patient?.sample || "-"}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>Address:</td>
                        <td colSpan="1">{invoiceResult?.patient?.remarks || "-"}</td>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>MR No:</td>
                        <td colSpan="1">
                            <img src={barcode} alt="MR Barcode" style={{ height: "50px", width: "auto", objectFit: "contain" }} />
                        </td>

                    </tr>
                </tbody>
            </table>
        </>
    )
}