import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPrint } from "react-icons/fa6";
import { Table } from "react-bootstrap";

export default function JournalVoucherTable({ voucherList, onDelete, loading }) {
  return (

    <div className="table-responsive table-sm" style={{ maxHeight: "62vh", overflowY: "scroll" }}>
      <Table bordered striped hover size="sm">
        <thead>
          <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
            <th className="text-center" style={{ width: "80px" }}>Sr.</th>
            <th className="text-start">Date</th>
            <th className="text-start">Narration</th>
            <th className="text-start">Voucher No</th>
            <th className="text-center" style={{ width: "120px" }}>Action</th>
          </tr>
        </thead>

        {loading ? (
          <tbody>
            <tr>
              <td colSpan="7">
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
        ) : voucherList?.length > 0 ? (
          <tbody>
            {voucherList.map((v, i) => (
              <tr key={v.id}>
                <td className="text-center">{i + 1}</td>
                <td>{v.date ? new Date(v.date).toISOString().split("T")[0] : "-"}</td>
                <td>{v.narration || "-"}</td>
                <td>{v.id || "-"}</td>
                <td className="text-center">
                  <FaPrint
                    className="FaHistory"
                    title="View Patient Logs"
                    style={{ marginRight: '4%' }}
                    onClick={() => window.open(`/print-voucher?id=${v.id}`, "_blank")}
                  />
                  <FaRegTrashCan
                    onClick={() => onDelete(v.id)}
                    style={{ fontSize: 20, cursor: "pointer", color: "red" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="5" className="text-center">No Vouchers Found</td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>

  );
}
