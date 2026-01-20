import { Table } from "react-bootstrap";


export default function TrialBalanceTable({ trialList }) {
    console.log("trial balance sheetbbbbbbb", trialList);

    return (
        <>
            <Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Account Title</th>
                        <th>Cretid</th>
                        <th>debit</th>
                        {/* <th>Date</th> */}
                    </tr>
                </thead>

                <tbody>
                    {trialList?.map((center, index) => (
                        <tr key={center.id}>
                            <td >{index + 1}</td>
                            <td>{center.account_title}</td>
                            <td>{center.credit}</td>
                            <td>{center.debit}</td>
                            {/* <td>{center.date}</td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
