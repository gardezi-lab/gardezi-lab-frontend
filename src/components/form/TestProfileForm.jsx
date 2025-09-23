import React from 'react'

export default function TestProfileForm() {
    return (
        <>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="mb-2">
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
                    <div className="mb-2">
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
                    <div className="mb-2">
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
                    <div className="mb-2">
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
                    <div className="mb-2">
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
                    <div className="mb-2">
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
                    <div className="mb-2">
                        <label className="text-body-highlight fw-bold mb-2">
                            Serology Elisa
                        </label>
                        <select className="form-control">
                            <option>Select</option>
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-2">
                        <label className="text-body-highlight fw-bold mb-2">
                            Interpertation
                        </label>
                        <select className="form-control">
                            <option>Select Test Name</option>
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-2">
                        <label className="text-body-highlight fw-bold mb-2">
                            Check The Following
                        </label>
                        <p>check box for test like WIDAL and Other test types whose formate change</p>
                    </div>
                </div>
            </div>
        </>
    )
}
