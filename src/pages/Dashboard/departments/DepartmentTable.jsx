export default function DepartmentTable({ departments, onDelete, onEdit }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div className="table-responsive" style={{ maxHeight: "62vh", overflowY: "scroll" }}>
          <table className="table table-bordered">
            <thead>
              <tr style={{ backgroundColor: "#1c2765", color: "white" }}>
                <th scope="col">Sr.</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {departments?.length > 0 ? (
                departments?.map((dept, index) => (
                  <tr key={dept.id}>
                    <td>{index + 1}</td>
                    <td>{dept.name}</td>
                    <td>
                      <div className="d-flex gap-3 align-items-center justify-content-center">
                        <i
                          className="fas fa-trash-alt text-danger"
                          style={{ fontSize: "20px", cursor: "pointer" }}
                          onClick={() => onDelete(dept.id)}
                        ></i>
                        <i
                          className="fas fa-edit text-primary"
                          style={{ fontSize: "20px", cursor: "pointer" }}
                          onClick={() => onEdit(dept)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No Departments Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
