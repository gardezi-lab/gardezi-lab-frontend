import React from 'react'

export default function Model() {
    return (
        <>
            <div
                className="modal fade"
                id="addDealModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="addDealModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content p-6">
                        <div className="modal-header justify-content-between">
                            <h5 className="mb-0">Test Name or Profile Name</h5>
                            <button
                                className="btn btn-sm btn-phoenix-secondary"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span className="fas fa-times text-danger" />
                            </button>
                        </div>
                        <div className="modal-body px-0">
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Test Name
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Will Show On Report"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Test Code
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="For Search short Code"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Sample Required
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="sample required"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Select Header
                                        </label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>Ally Aagaard</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Fee
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Test Fee"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Delivery Time
                                        </label>
                                        <input
                                            className="form-control datetimepicker"
                                            id="datetimepicker"
                                            type="text"
                                            placeholder="dd/mm/yyyy hour : minute"
                                            data-options='{"enableTime":true,"dateFormat":"d/m/y H:i","disableMobile":true}'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Serology Elisa
                                        </label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Interpertation
                                        </label>
                                        <select className="form-select">
                                            <option>Select Test Name</option>
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="text-body-highlight fw-bold mb-2">
                                            Check The Following
                                        </label>
                                        <p>check box for test like WIDAL and Other test types whose formate change</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">                      
                                <button className="btn btn-success ">Submit</button>
                            <button className="btn btn-danger my-0">View Tests & Profiles</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
