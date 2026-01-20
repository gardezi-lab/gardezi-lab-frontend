import { Table } from "react-bootstrap";
import { ThreeCircles } from "react-loader-spinner";

export default function LogReportTable({ logList, loading }) {
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
                {loading ? (
                    <tr>
                        <td colSpan="7">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "150px", 
                                }}
                            >
                                <ThreeCircles
                                    visible={true}
                                    height="60"
                                    width="60"
                                    color="#fcb040"
                                    ariaLabel="three-circles-loading"
                                />
                            </div>
                        </td>
                    </tr>
                ) : logList?.length > 0 ? (
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
                        <td colSpan="5" className="text-center">
                            No Data Found
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
