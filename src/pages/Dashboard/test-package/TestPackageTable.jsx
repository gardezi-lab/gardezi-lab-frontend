import Button from 'react-bootstrap/Button';
import { ThreeCircles } from "react-loader-spinner";

export default function TestPackageTable({ TestPackageList, onDelete, onEdit, loading }) {
    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                        <table className="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                                    <th scope="col">Sr.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Fees</th>
                                    <th scope="col"> Test</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>

                            {loading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="6">
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
                                </tbody>
                            ) : TestPackageList?.length > 0 ? (
                                <tbody>
                                      {TestPackageList.map((test, index) => (
                                        <tr key={test.id || index}>
                                            <td>{index + 1}</td>
                                            <td>{test.name}</td>
                                            <td>{test.price}</td>
                                            <td>{test.selected_test}</td>
                                            <td>
                                                <div className="d-flex gap-3 align-items-center justify-content-center">
                                                    <button onClick={() => onEdit(test)}>
                                                        <i className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onDelete(test.id);
                                                        }}
                                                    >
                                                        <i className="fas fa-trash-alt" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No  packages Found
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
