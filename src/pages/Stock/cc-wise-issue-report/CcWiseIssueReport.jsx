import React from 'react'

export default function CcWiseIssueReport() {
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
            Stock Issue Report To CC
          </h5>
        </div>


        <div className="card-body">
          <div className="row g-1">
            <div className="col-md-3">
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
            <div className="col-md-3">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  From  :
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Batch #"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  To  :
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Batch #"
                />
              </div>
            </div>
            <div className="col-md-3" style={{marginTop: '3%'}}>
              <button
                className="btn btn-success"

              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
