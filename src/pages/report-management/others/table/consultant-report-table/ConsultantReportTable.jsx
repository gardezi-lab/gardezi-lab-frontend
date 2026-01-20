import { Table } from "react-bootstrap";
import { ThreeCircles } from "react-loader-spinner";

export default function ConsultantReportTable({ consultantList, loading }) {

    const totalFee = consultantList?.reduce(
        (sum, item) => sum + (item.total_fee || 0),
        0
    );

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
                {loading ? (
                    <tr>
                        <td colSpan="7">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "250px",
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
                ) : consultantList?.length > 0 ? (
                    <>
                        {consultantList.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.patient_name}</td>
                                <td>{item.mr_number}</td>
                                <td>{item.tests?.join(", ")}</td>
                                <td>{item.total_fee}</td>
                            </tr>
                        ))}

                        {/* TOTAL ROW */}
                        <tr>
                            <td colSpan="4" className="text-end fw-bold">
                                TOTAL:
                            </td>
                            <td className="fw-bold">{totalFee}</td>
                        </tr>
                    </>
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
