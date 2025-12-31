import { Table } from "react-bootstrap";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import httpClient from "../../../../../services/httpClient";

export default function DepartmentTable({ departmentList, EditRecord, handleDelete }) {

    const deleteRecord = async (obj) => {
        try {
            const url = `/department/${obj.id}`;
            const response = await httpClient.delete(url);
            if (response) {
                console.log(response);
                handleDelete(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
 
    const updateRecord = (obj) => {
        if (obj) {
            EditRecord(true, obj);
        }
    }

    return (
        <>
            <Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">Sr.</th>
                        <th scope="col" className="text-start">Name</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {departmentList.map((dept, index) => (
                        <tr key={dept.department_id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-start">{dept.department_name}</td>
                            <td>
                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                    <FaPenToSquare
                                        className="cursor"
                                        onClick={() => updateRecord(dept)}
                                    />
                                    <FaRegTrashCan
                                        className="cursor"
                                        onClick={() => { deleteRecord(dept) }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}