import React from "react";

export default function Modal() {
    return (
        <>
            <div
                className="modal fade"
                id="addDealModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="addDealModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="addDealModalLabel">
                                Add New Test / Profile
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            <form>
                                {/* Row 1 */}
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Test Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Will Show On Report"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Test Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="For search short code"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Sample Required</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g. Blood, Urine"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Select Header</label>
                                        <select className="form-select">
                                            <option value="">Select</option>
                                            <option>Ally Aagaard</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="row g-3 mt-1">
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Fee</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Test Fee"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Delivery Time</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="dd/mm/yyyy hh:mm"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Serology Elisa</label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Interpretation</label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="row g-3 mt-1">
                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            placeholder="Add any special instructions..."
                                        ></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-danger">
                                View Tests & Profiles
                            </button>
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
