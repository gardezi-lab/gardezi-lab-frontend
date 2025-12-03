import { Table } from "react-bootstrap";

export default function DiscountReportTable({ discountList }) {

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Patient ID</th>
                    <th>Total Fee</th>
                    <th>Paid</th>
                    <th>Discount</th>
                    <th>Pending</th>
                    <th>Referred By</th>
                    <th>Sample</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {discountList?.length > 0 ? (
                    discountList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.pt_id}</td>
                            <td>{item.total_fee}</td>
                            <td>{item.paid}</td>
                            <td>{item.discount}</td>
                            <td>{item.pending_discount}</td>
                            <td>{item.reff_by}</td>
                            <td>{item.sample}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="text-center">
                            No Data Found
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
