import { ThreeCircles } from "react-loader-spinner";
import { FaBeer } from "react-icons/fa";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function DepartmentTable({ departmentList, onDelete, onEdit, loading }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div
          className="table-responsive"
          style={{ maxHeight: "62vh", overflowY: "scroll" }}
        >
          <table className="table table-bordered" style={{ minHeight: '150px' }} >
            <thead>
              <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                <th scope="col" style={{ width: '5%' }}>Sr.</th>
                <th scope="col ">Name</th>
                <th scope="col" style={{ width: '8%' }}>Action</th>
              </tr>
            </thead>

            {loading ? (
              <tbody >
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
                  <tr key={dept.department_id}>
                    <td>{index + 1}</td>
                    <td>{dept.department_name}</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center justify-content-center">
                        <FaPenToSquare
                          onClick={() => onEdit(dept)} style={{ fontSize: "22px", cursor: "pointer" }} />
                        <FaRegTrashCan onClick={() => {
                          if (window.confirm("Are you sure you want to delete this department?")) {
                            onDelete(dept.id);
                          }
                        }}
                          style={{ fontSize: "22px", cursor: "pointer", color: 'red' }}
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
