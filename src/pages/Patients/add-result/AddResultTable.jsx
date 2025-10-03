import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function AddResultTable({ AddResultList, onDelete, onEdit, loading }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: "scroll" }}>
          <table className="table table-bordered" style={{ minHeight: "150px" }}>
            <thead>
              <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                <th scope="col">Sr.</th>
                <th scope="col">Name</th>
                <th scope="col">MR#</th>
                <th scope="col">Date</th>
                <th scope="col">Sample</th>
                <th scope="col">Result</th>
                <th scope="col">Action</th>
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
            ) : AddResultList?.length > 0 ? (
              <tbody>
                {AddResultList.map((result, index) => (
                  <tr key={result.id || result.results_id}>
                    <td>{index + 1}</td>
                    <td>{result.name}</td>
                    <td>{result.mr}</td>
                    <td>{result.date}</td>
                    <td>{result.sample}</td>
                    <td style={{ textAlign: "left" }}
                        dangerouslySetInnerHTML={{ __html: result.add_results }}></td>
                    <td>
                      <div className="d-flex gap-2 align-items-center justify-content-center">
                        <FaPenToSquare
                          onClick={() => onEdit(result)}
                          style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                        <FaRegTrashCan
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this result?")) {
                              onDelete(result.id || result.results_id);
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
                  <td colSpan="7" className="text-center">
                    No Results Found
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
