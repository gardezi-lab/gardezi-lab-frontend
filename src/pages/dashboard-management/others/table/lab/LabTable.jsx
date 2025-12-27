import { Table } from "react-bootstrap";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import httpClient from "../../../../../services/httpClient";

export default function LabTable({ labList, EditRecord, handleDelete }) {

    const deleteRecord = async (obj) => {
        try {
            const url = `/lab${obj.id}`;
            const response = await httpClient.delete(url);

            if (response) {
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
                        <th className="text-center">Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {labList?.map((center, index) => (
                        <tr key={center.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>{center.name}</td>
                            <td>{center.email}</td>
                            <td>{center.location}</td>
                            <td className="text-center">
                                <div className="d-flex gap-2 justify-content-center">
                                    <FaPenToSquare
                                        className="cursor"
                                        onClick={() => updateRecord(center)}
                                    />
                                    <FaRegTrashCan
                                        className="cursor"
                                        onClick={() => deleteRecord(center)}
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
