import { Table } from "react-bootstrap";
import { ThreeCircles } from "react-loader-spinner";

export default function LedgerTable({ accoutheadlist, loading }) {
    const entries = accoutheadlist.entries || [];

    const totalDebit = entries.reduce((sum, item) => sum + (parseFloat(item?.dr) || 0), 0);
    const totalCredit = entries.reduce((sum, item) => sum + (parseFloat(item?.cr) || 0), 0);

    let runningBalance = 0;
    const rowsWithBalance = entries.map((item) => {
        const debit = parseFloat(item?.dr) || 0;
        const credit = parseFloat(item?.cr) || 0;
        runningBalance += debit - credit;
        return { ...item, runningBalance };
    });

    const totalBalance = runningBalance;

    return (
        <>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Sr.</th>
                        <th>Voucher No</th>
                        <th>Date</th>
                        <th>Narration</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                    </tr>
                </thead>


                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "250px", // ✅ adjust karo apne table ke hisaab se
                                    }}
                                >
                                    <ThreeCircles
                                        visible={true}
                                        height="60"
                                        width="60"
                                        color="#fcb040"
                                        ariaLabel="three-circles-loading"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>

                ) : rowsWithBalance.length > 0 ? (
                    <tbody>
                        {rowsWithBalance.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td>{item?.listing_voucher}</td>
                                <td>{item?.date}</td>
                                <td>{item?.narration}</td>
                                <td>{item?.dr}</td>
                                <td>{item?.cr}</td>
                                <td>{item.runningBalance.toFixed(2)}</td>
                            </tr>
                        ))}

                        <tr className="fw-bold bg-light">
                            <td colSpan="4" className="text-center">Total:</td>
                            <td>{totalDebit.toFixed(2)}</td>
                            <td>{totalCredit.toFixed(2)}</td>
                            <td>{totalBalance.toFixed(2)}</td>
                        </tr>
                    </tbody>
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center text-muted">
                            No records found
                        </td>
                    </tr>
                )}

            </Table >
        </>
    );
}
