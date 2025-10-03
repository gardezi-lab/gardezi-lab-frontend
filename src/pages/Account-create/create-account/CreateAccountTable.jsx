import { ThreeCircles } from "react-loader-spinner";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function CreateAccountTable({ departmentList, onDelete, onEdit, loading }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div
          className="table-responsive"
          style={{ maxHeight: "62vh", overflowY: "scroll" }}
        >
          <table className="table table-bordered">
            <thead>
              <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                <th scope="col">Sr.</th>
                <th scope="col">Name</th>
                <th scope="col">Code</th>
                <th scope="col">Opening Balence</th>
                <th scope="col">Parent Account</th>
                <th scope="col">Opening Balence Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="3">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "250px", // ✅ adjust karo apne table ke hisaab se
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
            ) : departmentList?.length > 0 ? (
              <tbody>
                {departmentList.map((dept, index) => (
                  <tr key={dept.id}>
                    <td>{index + 1}</td>
                    <td>{dept.head_name}</td>
                    <td>{dept.head_code}</td>
                    <td>{dept.ob}</td>
                    <td>{dept.parent_account}</td>
                    <td>{dept.ob_date}</td>
                    {/* <td>
                      <div className="d-flex gap-3 align-items-center justify-content-center">

                        <button
                          onClick={() => onEdit(dept)}
                        >
                          <i className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this department?")) {
                              onDelete(dept.department_id);
                            }
                          }}
                        >
                          <i className="fas fa-trash-alt" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                        </button>
                      </div>
                    </td> */}
                     <td>
                      <div className="d-flex gap-2 align-items-center justify-content-center">
                          <FaPenToSquare  
                          onClick={() => onEdit(dept)} style={{ fontSize: "22px", cursor: "pointer" }} />
                        <FaRegTrashCan onClick={() => {
                          if (window.confirm("Are you sure you want to delete this department?")) {
                            onDelete(dept.id);
                          }
                        }} 
                         style={{ fontSize: "22px", cursor: "pointer", color:'red' }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="3" className="text-center">
                    No Departments Found
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
