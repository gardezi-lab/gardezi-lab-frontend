

export default function TestProfileTable() {
    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div class="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                        <table class="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765" }} >
                                    <th scope="col">Sr.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Head Name</th>
                                    <th scope="col">Contact No</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Rate List</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td className="text-danger fw-bold">Rate List</td>
                                    <td>
                                        <div className="d-flex gap-3 align-items-center justify-content-center">
                                            <i className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td className="text-danger fw-bold">Rate List</td>
                                    <td>
                                        <div className="d-flex gap-3 align-items-center justify-content-center">
                                            <i className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td className="text-danger fw-bold">Rate List</td>
                                    <td>
                                        <div className="d-flex gap-3 align-items-center justify-content-center">
                                            <i className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td className="text-danger fw-bold">Rate List</td>
                                    <td>
                                        <div className="d-flex gap-3 align-items-center justify-content-center">
                                            <i className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}