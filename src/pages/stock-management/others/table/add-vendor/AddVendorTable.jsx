import { ThreeCircles } from "react-loader-spinner";
import { Table } from "react-bootstrap";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function AddVendorTable({ venderList, onDelete, onEdit, loading }) {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-0">
                <div
                    className="table-responsive"
                    style={{ maxHeight: "62vh", overflowY: "scroll" }}
                >
                    <Table striped bordered hover responsive size="sm">
                        <thead>
                            <tr style={{ backgroundColor: "#1c2765", color: "white", }}>
                                <th scope="col" className="text-center" style={{ width: "80px" }}>Sr.</th>
                                <th scope="col" className="text-start">Name</th>
                                <th scope="col" className="text-start">Phone No</th>
                                <th scope="col" className="text-start">Address</th>
                                <th scope="col" className="text-center" style={{ width: "120px" }}>Action</th>
                            </tr>
                        </thead>

                        {loading ? (
                            <tbody >
                                <tr style={{ height: "20px" }}>
                                    <td colSpan="3">
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
                        ) : venderList?.length > 0 ? (
                            <tbody>
                                {venderList.map((vendor, index) => (
                                    <tr style={{ height: "20px" }} key={vendor.Id}>
                                        <td style={{textAlign: 'center'}}>{index + 1}</td>
                                        <td className="text-start">{vendor.name}</td>
                                        <td className="text-start">{vendor.phone}</td>
                                        <td className="text-start">{vendor.address}</td>
                                        <td>
                                            <div className="d-flex gap-2 align-items-center justify-content-center">
                                                <FaPenToSquare
                                                    onClick={() => onEdit(vendor)} style={{ fontSize: "22px", cursor: "pointer" }} />
                                                <FaRegTrashCan onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this vendor?")) {
                                                        onDelete(vendor.id);
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
                                    <td colSpan="3" className="text-center">
                                        No Vendors Found
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </div>
            </div>
        </div>
    );
}
