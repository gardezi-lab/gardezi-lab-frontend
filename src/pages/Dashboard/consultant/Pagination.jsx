import React from 'react'

export default function Pagination() {
    return (
        <>
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
        </>
    )
}
