import React from "react";

export default function Modal({
    id,
    title,
    children,
    footerButtons
}) {
    return (
        <div
            className="modal fade"
            id={id}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby={id}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content p-4">
                    <div className="modal-header justify-content-between">
                        <h5 className="mb-0">{title}</h5>
                        <button
                            className="btn btn-sm btn-phoenix-secondary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <span className="fas fa-times text-danger" />
                        </button>
                    </div>

                    <div className="modal-body px-0">{children}</div>
                    <div className="modal-footer">
                        {footerButtons}
                    </div>
                </div>
            </div>
        </div>
    );
}
