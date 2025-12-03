import { Table } from "react-bootstrap";

export default function LogReportTable({ logList }) {

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>MR#</th>
                    <th>Patient Name</th>
                    <th>Activity</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody>
                {logList?.length > 0 ? (
                    logList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.mr_number}</td>
                            <td>{item.patient_name}</td>
                            <td>{item.activity}</td>
                            <td>{item.created_at}</td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">
                            No Data Found
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
