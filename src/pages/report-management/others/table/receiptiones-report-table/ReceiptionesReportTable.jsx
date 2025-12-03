import { Table } from "react-bootstrap";

export default function ReceptionistsReportTable({ discountList }) {

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact No</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th> Date</th>
                </tr>
            </thead>

            <tbody>
                {discountList?.length > 0 ? (
                    discountList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.contact_no}</td>
                            <td>{item.user_name}</td>
                            <td>{item.password}</td>
                            <td>{item.role}</td>
                            <td>{item.created_date}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center">
                            No Data Found
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
