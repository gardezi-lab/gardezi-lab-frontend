import { Table } from "react-bootstrap";

export default function ReceptionistsReportTable({ reportList }) {

    const totalFee = reportList?.reduce((sum, item) => sum + (item.total_fee || 0), 0);

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>MR#</th>
                    <th>Ref Consultant</th>
                    <th>Tests</th>
                    <th>Date</th>
                    <th>Fee</th>
                </tr>
            </thead>

            <tbody>
                {reportList?.length > 0 ? (
                    reportList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.patient_name}</td>
                            <td>{item.mr_number}</td>
                            <td>{item.ref_name}</td>
                            <td>{item.tests}</td>
                            <td>{item.patient_entry_date}</td>
                            <td>{item.total_fee}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No Data Found</td>
                    </tr>
                )}
                {reportList?.length > 0 && (
                    <tr>
                        <td colSpan="4" className="text-center fw-bold">TOTAL:</td>
                        <td className="fw-bold">{totalFee}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
