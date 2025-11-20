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
                        <th style={{textAlign: 'center'}}>Sr.</th>
                        <th>Voucher No</th>
                        <th>Date</th>
                        <th>Narration</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="text-center py-5">
                                <ThreeCircles
                                    height="60"
                                    width="60"
                                    color="#0d6efd"
                                    visible={true}
                                />
                            </td>
                        </tr>
                    ) : rowsWithBalance.length > 0 ? (
                        <>
                            {rowsWithBalance.map((item, index) => (
                                <tr key={index}>
                                    <td style={{textAlign: 'center'}}>{index + 1}</td>
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
                        </>
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-muted">
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}
