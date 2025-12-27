import { ThreeCircles } from "react-loader-spinner";
// import { FaRegTrashCan } from "react-icons/fa6";

export default function NearExpiryTable({ stockList, onDelete, onEdit, loading }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div
          className="table-responsive"
          style={{ maxHeight: "62vh", overflowY: "scroll" }}
        >
          <table className="table table-bordered table-sm">
            <thead>
              <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                <th scope="col" style={{textAlign: 'center'}}>Sr.</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col" style={{textAlign: 'center'}}>Batch</th>
                <th scope="col" style={{textAlign: 'center'}}>Expiry</th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="4">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "250px",
                      }}
                    >
                      <ThreeCircles
                        visible={true}
                        height="60"
                        width="60"
                        color="#fcb040"
                        ariaLabel="three-circles-loading"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : stockList?.length > 0 ? (
              <tbody>
                {stockList.map((stock, index) => (
                  <tr key={stock.item_id}>
                    <td  style={{textAlign: 'center'}}>{index + 1}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td  style={{textAlign: 'center'}}>
                      <div className="d-flex gap-2 align-items-center justify-content-center">
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="4" className="text-center">
                    No Data Found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
