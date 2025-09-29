import { ThreeCircles } from "react-loader-spinner";

export default function TestProfileTable({ companyList, onDelete, onEdit, loading }) {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-0">
                <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                                <th scope="col">Sr.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Head Name</th>
                                <th scope="col">Contact No.</th>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Rate List</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        {loading ? (
                            <tbody>
                                <tr>
                                    <td colSpan="8">
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
                        ) : companyList?.length > 0 ? (
                            <tbody>
                                {companyList.map((company, index) => (
                                    <tr key={company.company_id}>
                                        <td>{index + 1}</td>
                                        <td>{company.company_name}</td>
                                        <td>{company.head_name}</td>
                                        <td>{company.contact_no}</td>
                                        <td>{company.user_name}</td>
                                        <td>{company.password || "—"}</td>
                                        <td>{company.rate_list || "—"}</td>
                                        <td>
                                            <div className="d-flex gap-3 align-items-center justify-content-center">
                                                <button
                                                    onClick={() => onEdit(company)}
                                                    className="btn btn-sm btn-light"
                                                >
                                                    <i className="fas fa-edit" style={{ fontSize: "18px" }}></i>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        onDelete(company.id);
                                                    }}
                                                    className="btn btn-sm btn-light"
                                                >
                                                    <i className="fas fa-trash-alt" style={{ fontSize: "18px" }}></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        No Companies Found
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
