import React from "react";

export default function DepModal() {
    return (
        <div
            className="modal fade"
            id="addModal"
            tabIndex="-1"
            aria-labelledby="addModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addModalLabel">
                            Add Header
                        </h5>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Header name"
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
