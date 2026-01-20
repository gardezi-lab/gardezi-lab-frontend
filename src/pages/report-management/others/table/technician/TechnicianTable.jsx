import { Table } from "react-bootstrap";

export default function TechnicianTable({ cashList }) {
    return (
        <>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Tech Name</th>
                        <th>MR #</th>
                        <th>Tests</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {cashList?.map((cash, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{cash?.patient_name}</td>
                            <td>{cash?.mr_number}</td>
                            <td>{cash?.test_name}</td>
                            <td>{cash?.date}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
