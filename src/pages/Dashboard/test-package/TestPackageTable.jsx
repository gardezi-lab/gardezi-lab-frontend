import Button from 'react-bootstrap/Button';
import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

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
                                    <th scope="col" className="text-start">Name</th>
                                    <th scope="col" className="text-start">Fees</th>
                                    <th scope="col" className="text-start"> Test</th>
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
                                            <td className="text-start">{test.name}</td>
                                            <td className="text-start">{test.price}</td>
                                            <td className="text-start">{test.selected_test}</td>
                                            <td>
                                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                                    <FaPenToSquare
                                                        onClick={() => onEdit(test)} style={{ fontSize: "22px", cursor: "pointer" }} />
                                                    <FaRegTrashCan onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this department?")) {
                                                            onDelete(test.id);
                                                        }
                                                    }}
                                                        style={{ fontSize: "22px", cursor: "pointer", color: 'red' }}
                                                    />
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
