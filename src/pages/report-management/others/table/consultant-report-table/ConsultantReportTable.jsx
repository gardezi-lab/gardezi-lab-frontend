import { Table } from "react-bootstrap";

export default function ConsultantReportTable({ consultantList }) {

    console.log("consultantnnnn", consultantList);

    const totalFee = consultantList?.reduce((sum, item) => sum + (item.total_fee || 0), 0);

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>MR#</th>
                    <th>Tests</th>
                    <th>Fee</th>
                </tr>
            </thead>

            <tbody>
                {consultantList?.length > 0 ? (
                    consultantList.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.patient_name}</td>
                            <td>{item.mr_number}</td>
                            <td>{item.tests?.join(", ")}</td>
                            <td>{item.total_fee}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No Data Found</td>
                    </tr>
                )}

                {/* Total Fee row */}
                {consultantList?.length > 0 && (
                    <tr>
                        <td colSpan="4" className="text-center fw-bold">TOTAL:</td>
                        <td className="fw-bold">{totalFee}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
