import { Table } from "react-bootstrap";
import { ThreeCircles } from "react-loader-spinner";

export default function LabReportTable({ cashList, loading }) {
    return (
        <>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>MR #</th>
                        <th>Ref Consultant</th>
                        <th>Test</th>
                        <th>Fees</th>
                        {/* <th>Status</th> */}
                    </tr>
                </thead>
                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "250px", // ✅ adjust karo apne table ke hisaab se
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
                    </tbody>

                ) : cashList?.length > 0 ? (
                    <tbody>
                        {cashList?.map((cash, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{cash?.patient_name}</td>
                                <td>{cash?.mr_number}</td>
                                <td>{cash?.ref_name}</td>
                                <td>{cash?.tests}</td>
                                <td>{cash?.total_fee}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center">
                                No Data Found
                            </td>
                        </tr>
                    </tbody>
                )}

            </Table >
        </>
    );
}
