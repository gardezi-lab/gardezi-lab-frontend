import Button from 'react-bootstrap/Button';
import { ThreeCircles } from "react-loader-spinner";

export default function ParameterTable({ parameterList, onDelete, onEdit, loading }) {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-0">
                <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                                <th scope="col">Sr.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Order</th>
                                <th scope="col">Dropdowns</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        {loading ? (
                            <tbody>
                                <tr>
                                    <td colSpan="5">
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
                        ) : parameterList?.length > 0 ? (
                            <tbody>
                                {parameterList.map((dept, index) => (
                                    <tr key={dept.Parameter_id}>
                                        <td>{index + 1}</td>
                                        <td>{dept.parameter_name}</td>
                                        <td>{dept.order}</td>
                                        <td>{dept.dropdowns}</td>
                                        <td>
                                            <div className="d-flex gap-3 align-items-center justify-content-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => onEdit(dept)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => onDelete(dept.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No Parameters Found
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}


