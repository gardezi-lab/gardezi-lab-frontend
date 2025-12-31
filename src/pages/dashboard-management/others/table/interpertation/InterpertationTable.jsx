import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";


export default function InterpertationTable({ interpertationList, onDelete, onEdit, loading }) {
    function stripHtml(html) {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }

    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div class="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                        <table class="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765" }} >
                                    <th scope="col" className="py-2 px-2" >Sr.</th>
                                    {/* <th scope="col" className="text-start py-2 px-2">Type</th> */}
                                    <th scope="col" className="text-start py-2 px-2">Code</th>
                                    <th scope="col" className="text-start py-2 px-2">Heading</th>
                                    <th scope="col" className="text-start py-2 px-2">Detail</th>
                                    <th scope="col">Action</th>
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
                            ) : interpertationList?.length > 0 ? (
                                <tbody >
                                    {interpertationList.map((interpertation, index) => (
                                        <tr style={{ height: "20px" }} key={interpertation.interpretations_id}>
                                            <td className="py-2 px-2">{index + 1}</td>
                                            {/* <td className="text-start py-2 px-2">{interpertation.type}</td> */}
                                            <td className="text-start py-2 px-2">{interpertation.code}</td>
                                            <td className="text-start py-2 px-2" >{interpertation.heading}</td>
                                            <td style={{ textAlign: "left" }}
                                                dangerouslySetInnerHTML={{ __html: interpertation.detail }}></td>
                                            <td className="py-2 px-2">
                                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                                    <FaPenToSquare
                                                        onClick={() => onEdit(interpertation)} style={{ fontSize: "22px", cursor: "pointer" }} />
                                                    <FaRegTrashCan onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this department?")) {
                                                            onDelete(interpertation.id);
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
                                            No Interpertations Found
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