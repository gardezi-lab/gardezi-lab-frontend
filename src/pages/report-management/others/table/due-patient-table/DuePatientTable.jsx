import { Table } from "react-bootstrap";

export default function DuePatientTable({ discountList }) {

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>MR Number</th>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Total Fee</th>
                    <th>Paid</th>
                    <th>Due Amount</th>
                </tr>
            </thead>

            <tbody>
                {discountList?.length > 0 ? (
                    discountList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.mr_number}</td>
                            <td>{item.pt_id}</td>
                            <td>{item.name}</td>
                            <td>{item.total_fee}</td>
                            <td>{item.paid}</td>
                            <td>{item.due_amount}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">
                            No Data Found
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
