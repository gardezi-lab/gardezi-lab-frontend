import feather from "feather-icons";
import Modal from "../../components/modal/Modal";
import { useEffect } from "react";

export default function TestProfile() {
    useEffect(() => {
        feather.replace();
    }, []);

    return (
        <>
            <div className="card  px-0">
                <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                        backgroundColor: "#f39c12",
                        color: "#fff",
                        padding: "2rem 1rem", // adjust top/bottom padding
                        height: "48px"          // optional fixed height
                    }}
                >
                    <h5 className="card-title mb-0" style={{ color: "#fff" }}>
                        Test & Profiles
                    </h5>
                    <button className="btn btn-success btn-sm"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addDealModal"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-bs-reference="parent"><span className="fas fa-plus me-2" />
                        Add New Profile</button>
                </div>



                <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                        {/* Search label + input */}
                        <label htmlFor="searchInput" className="form-label me-2 mb-0">
                            Search
                        </label>
                        <input
                            type="text"
                            id="searchInput"
                            className="form-control me-3"
                            placeholder="Enter keyword"
                            style={{ width: "200px" }}
                        />

                        {/* Select dropdown */}
                        <select className="form-select" style={{ width: "150px" }}>
                            <option value="">Choose...</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                        <button
                            className="btn"
                            style={{ backgroundColor: "#6c757d", color: "#fff" }}
                        >
                            Excel
                        </button>

                        <div className="d-flex align-items-center">
                            <label
                                className="form-label me-2 mb-0"
                                htmlFor="inputPassword"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Search:
                            </label>
                            <input
                                className="form-control"
                                id="inputPassword"
                                type="password"
                                style={{ width: "200px" }}
                            />
                        </div>
                    </div>

                    <div
                        id="tableExample"
                        data-list='{"valueNames":["name","email","age"],"page":5,"pagination":true}'
                    >
                        <div className="table-responsive mt-4">
                            <table className="table table-lg fs-9 mb-0 w-100">
                                <thead>
                                    <tr>
                                        <th
                                            className="ps-3"
                                            data-sort="sr"
                                        >
                                            Sr.
                                        </th>
                                        <th className="sort border-top border-translucent" data-sort="test">
                                            Test
                                        </th>
                                        <th className="sort border-top border-translucent" data-sort="header">
                                            Header
                                        </th>
                                        <th className="sort border-top border-translucent" data-sort="fee">
                                            Fees
                                        </th>
                                        <th className="sort border-top border-translucent" data-sort="date">
                                            Delivery Date
                                        </th>
                                        <th
                                            className="sort border-top border-translucent" data-sort="view"

                                        >
                                            View/Edit Test
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <td className="align-middle ps-3 name">1</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>anna@example.com</td>
                                        <td className="align-middle age">18</td>
                                        <td className="align-middle email">anna@example.com</td>
                                        <td className="align-middle age">18</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{
                                                        backgroundColor: "#28a745",
                                                        color: "#fff",
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "5px",
                                                    }}
                                                >
                                                    <span className="fas fa-search me-2" size={25}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle ps-3 name">2</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>homer@example.com</td>
                                        <td className="align-middle age">35</td>
                                        <td className="align-middle email">anna@example.com</td>
                                        <td className="align-middle age">18</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#28a745", color: "#fff", width: "25px", height: "40px", borderRadius: "5px" }}
                                                >
                                                    <span className="fas fa-search me-2" size={25}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle ps-3 name">3</td>
                                        <td className="align-middle" style={{ color: '#ff2929', fontWeight: 'bold' }}>oscar@example.com</td>
                                        <td className="align-middle age">52</td>
                                        <td className="align-middle email">anna@example.com</td>
                                        <td className="align-middle age">18</td>
                                        <td className="align-middle white-space-nowrap text-end pe-0">
                                            <div className="btn-reveal-trigger position-static">
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center"
                                                    style={{ backgroundColor: "#28a745", color: "#fff", width: "40px", height: "40px", borderRadius: "5px" }}
                                                >
                                                   <span className="fas fa-search me-2" size={25}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex flex-between-center pt-3">
                            <div className="pagination d-none">
                                <li className="active">
                                    <button className="page" type="button" data-i={1} data-page={5}>
                                        1
                                    </button>
                                </li>
                                <li>
                                    <button className="page" type="button" data-i={2} data-page={5}>
                                        2
                                    </button>
                                </li>
                                <li>
                                    <button className="page" type="button" data-i={3} data-page={5}>
                                        3
                                    </button>
                                </li>
                                <li className="disabled">
                                    <button className="page" type="button">
                                        ...
                                    </button>
                                </li>
                            </div>
                            <p className="mb-0 fs-9">
                                <span
                                    className="d-none d-sm-inline-block"
                                    data-list-info="data-list-info"
                                >
                                    1 to 5 <span className="text-body-tertiary"> Items of </span>43
                                </span>
                                <span className="d-none d-sm-inline-block"> — </span>

                            </p>
                            <div className="d-flex">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                Previous
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal />
        </>
    )
}
