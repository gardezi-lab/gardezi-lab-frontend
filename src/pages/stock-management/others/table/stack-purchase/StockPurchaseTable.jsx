import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function StockPurchaseTable({ stockList, onDelete, onEdit, loading }) {
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
                {/* <th scope="col">Vendor</th> */}
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col" style={{textAlign: 'center'}}>Action</th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="6">
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
                  <tr key={stock.id}>
                    <td  style={{textAlign: 'center'}}>{index + 1}</td>
                    {/* <td>{stock.vendor_name}</td> */}
                    <td>{stock.item_name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.price}</td>
                    <td  style={{textAlign: 'center'}}>
                      <div className="d-flex gap-2 align-items-center justify-content-center">
                        <FaPenToSquare
                          onClick={() => onEdit(stock)}
                          style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                        <FaRegTrashCan
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this record?")) {
                              onDelete(stock.id);
                            }
                          }}
                          style={{ fontSize: "22px", cursor: "pointer", color: "red" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center">
                    No Stock Purchases Found
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
