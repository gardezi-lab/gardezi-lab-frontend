import React from 'react'

export default function TestPackageForm() {
    return (
        <>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="mb-2">
                        <label className="text-body-highlight fw-bold mb-2">
                            Package Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Package Name"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-2">
                        <label className="text-body-highlight fw-bold mb-2">
                            Package Price
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Package Fee"
                        />
                    </div>
                </div>
                <div className="col-md-4" style={{ marginTop: '7%' }}>
                    <div className="mb-2">
                        <button className="btn btn-success">Submit</button>
                    </div>
                </div>
            </div>

            <h5 className="text-start" style={{ marginTop: '3%' }}>Add tests To Package</h5>
            <div className="row g-4 mt-2">
                <div className="col-md-4">
                    <div className="mb-2">
                        <label className="text-body-highlight fw-bold mb-2">
                            Test
                        </label>
                        <select className="form-control" aria-label="Default select example">
                            <option selected="">Select Header</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-2">
                        <label className="text-body-highlight fw-bold mb-2">
                            Package
                        </label>
                        <select className="form-control" aria-label="Default select example">
                            <option selected="">Select Header</option>
                            <option value={1}>Surger Fitness</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4" style={{ marginTop: '7%' }}>
                    <div className="mb-2">
                        <button className="btn btn-success">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
