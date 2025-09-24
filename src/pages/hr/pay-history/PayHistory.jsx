import { useState } from "react";
export default function PayHistory() {
    const [form, setForm] = useState({
        fromDate: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div className="card shadow-lg border-0 rounded-3 w-100">
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">Pay History</h5>
                </div>

                <div className="card-body">
                    <form>
                        {/* Row 1 */}
                        <div className="col-md-2">
                            <label for="fromDate" class="form-label">Select Month</label>
                            <input type="date" className="form-control" id="fromDate"
                                onChange={handleChange}
                                name="fromDate" />
                        </div>
                    </form>
                    {form.fromDate && (
                        <>
                            <p className="text-primary fw-bold mt-2">
                                Total Amount Spent In Term Of Pays :
                            </p>

                            <div className="mt-2">
                                <table className="table">
                                    <thead className="bg-white text-black">
                                        <tr>
                                            <th>Name</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-1">Special Chemistry</td>
                                            <td className="py-1">5000</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Microbiology</td>
                                            <td className="py-1">7000</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Molecular</td>
                                            <td className="py-1">4500</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Molecular</td>
                                            <td className="py-1">4500</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </>)}

                </div>
            </div>
        </div>
    );
}






// import { useState } from "react";

// export default function PayHistory() {
//     const [form, setForm] = useState({
//         fromDate: "",
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
//             <div className="card shadow-lg border-0 rounded-3 w-100">
//                 <div
//                     className="card-header text-white d-flex justify-content-between align-items-center"
//                     style={{ backgroundColor: "rgba(243,156,18,255)" }}
//                 >
//                     <h5 className="mb-1 text-white">Pay History</h5>
//                 </div>

//                 <div className="card-body">
//                     <form>
//                         {/* Row 1 */}
//                         <div className="col-md-2">
//                             <label htmlFor="fromDate" className="form-label">
//                                 Select Month
//                             </label>
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 id="fromDate"
//                                 name="fromDate"
//                                 value={form.fromDate}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </form>

//                     {/* ✅ Conditional Rendering */}
//                     {form.fromDate && (
//                         <>
//                             <p className="mt-2">
//                                 Total Amount Spent In Term Of Pays :
//                             </p>

//                             <div className="mt-2">
//                                 <table className="table">
//                                     <thead className="bg-white text-black">
//                                         <tr>
//                                             <th>Name</th>
//                                             <th>Amount</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td className="py-1">Special Chemistry</td>
//                                             <td className="py-1">5000</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="py-1">Microbiology</td>
//                                             <td className="py-1">7000</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="py-1">Molecular</td>
//                                             <td className="py-1">4500</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="py-1">Hematology</td>
//                                             <td className="py-1">3500</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
