import { Table } from "react-bootstrap";

export default function ConsultantReportTable({ consultantList }) {

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Password</th>
                </tr>
            </thead>

            <tbody>
                {consultantList?.length > 0 ? (
                    consultantList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.role}</td>
                            <td>{item.password}</td>
                            
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
