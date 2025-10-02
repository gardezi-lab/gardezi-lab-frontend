import { ThreeCircles } from "react-loader-spinner";

export default function PatientEntryTable({ patiententryList,onEdit, onDelete, loading }) {
    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div class="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                        <table class="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765" }} >
                                    <th scope="col">Sr.</th>
                                    <th scope="col">X</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">MR# </th>
                                    <th scope="col">Reception</th>
                                    <th scope="col">Fees</th>
                                    <th scope="col">Ref Consultant </th>
                                    <th scope="col">Test</th>
                                    <th scope="col">Action </th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="10">
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
                            ) : patiententryList?.length > 0 ? (
                                <tbody>
                                    {patiententryList.map((patient, index) => (
                                        <tr key={patient.id}>
                                            <td>{index + 1}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{patient.patient_name}</td>
                                            <td>{patient.father_hasband_MR}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{patient.reffered_by}</td>
                                            <td>{patient.test}</td>
                                            <td>
                                                <div className="d-flex gap-3 align-items-center justify-content-center">
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm("Are you sure you want to delete this patient?")) {
                                                                onDelete(patient.id); {/* delete bhi id se karna hoga */ }
                                                            }
                                                        }}
                                                    >
                                                        <i className="fas fa-trash-alt" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                                    </button>
                                                    <button onClick={() => onEdit(patient)}>
                                                        <i className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                                    </button>
                                                    <button>
                                                        <i className="fas fa-print" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No Departments Found
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}