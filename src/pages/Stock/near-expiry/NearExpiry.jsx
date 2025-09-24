import React from 'react'
import Pagination from '../../Dashboard/consultant/Pagination'

export default function StockReport() {
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
            Near Expiry Stock (30 Days)
          </h5>
        </div>


        <div className="card-body">
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

          <div className="table-responsive mt-4">
            <table className="table table-lg fs-9 mb-0 w-100">
              <thead className='bg-black'>
                <tr>
                  <th
                    className="ps-3 text-white"
                    data-sort="sr"
                  >
                    Sr.
                  </th>
                  <th className="sort text-white border-top border-translucent" data-sort="test">
                    Name
                  </th>
                  <th className="sort text-white border-top border-translucent" data-sort="header">
                    Qty
                  </th>
                  <th className="sort text-white border-top border-translucent" data-sort="fee">
                    Batch
                  </th>
                  <th className="sort text-white border-top border-translucent" data-sort="date">
                    Expiry
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>ICT HBsAg</td>
                  <td>100</td>
                  <td>2309014</td>
                  <td>01-09-2025</td>
                </tr>
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  )
}
