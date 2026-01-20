import { Table } from "react-bootstrap";


export default function BalanceSheetTable({ balanceList }) {
    console.log("balance sheetbbbbbbb", balanceList);

    return (
        <>
            <Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Account Name</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {balanceList?.map((center, index) => (
                        <tr key={center.id}>
                            <td >{index + 1}</td>
                            <td>{center.account_name}</td>
                            <td>{center.amount}</td>
                            <td>{center.type}</td>
                            <td>{center.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
