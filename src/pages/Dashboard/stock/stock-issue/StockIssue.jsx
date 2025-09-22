import React from 'react'

export default function StockIssue() {
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
            Stock Issue
          </h5>
        </div>


        <div className="card-body">
          <div className="row g-1">
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  Item :
                </label>
                <select className="form-select" aria-label="Default select example">
                  <option selected="">Select Item</option>
                  <option value={1}>Philbatmy</option>
                  <option value={2}>lab</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  Batch :
                </label>
                <select className="form-select" aria-label="Default select example">
                  <option selected="">Select Batch</option>
                  <option value={1}>Philbatmy</option>
                  <option value={2}>lab</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  CC :
                </label>
                <select className="form-select" aria-label="Default select example">
                  <option selected="">Select CC</option>
                  <option value={1}>Philbatmy</option>
                  <option value={2}>lab</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row g-1">
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  Quantity  :
                </label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Quantity "
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  CC Account   :
                </label>
                 <select className="form-select" aria-label="Default select example">
                  <option selected="">Select CC</option>
                  <option value={1}>Philbatmy</option>
                  <option value={2}>lab</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  Description    :
                </label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="description"
                />
              </div>
            </div>
            </div>
          <div className="row mt-2">
            <div className="col-md-2">
              <button
                className="btn btn-success"

              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
