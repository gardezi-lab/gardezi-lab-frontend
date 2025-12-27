import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function TestProfileTable({ companyList, onDelete, onEdit, loading }) {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
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
                                            <div className="d-flex gap-2 align-items-center justify-content-center">
                                                {permissions["Company Panel Edit"] === 1 &&
                                                    <FaPenToSquare
                                                        onClick={() => onEdit(company)} style={{ fontSize: "22px", cursor: "pointer" }} />
                                                }
                                                {permissions["Company Panel Delete"] === 1 &&
                                                    <FaRegTrashCan onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this department?")) {
                                                            onDelete(company.id);
                                                        }
                                                    }}

                                                        style={{ fontSize: "22px", cursor: "pointer", color: 'red' }}
                                                    />
                                                }
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
