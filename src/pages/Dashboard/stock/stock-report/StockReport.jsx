import React from 'react'
import Pagination from '../../departments/consultant/Pagination'

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
            Expense Report
          </h5>
        </div>


        <div className="card-body">
          <div className="row g-1">
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  From :
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2">
                <label className="fw-bold mb-2">
                  To :
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder=""
                />
              </div>
            </div>

            <div className="col-md-4" style={{ marginTop: '3%' }}>
              <button
                className="btn btn-success flex-fill"

              >
                Show
              </button>
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
                  <th className="sort text-white border-top border-translucent" data-sort="date">
                    Desco
                  </th>
                  <th className="sort text-white border-top border-translucent" data-sort="date">
                    Date
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
                  <td>HbSAg ICT</td>
                  <td>07/28/2024</td>
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
