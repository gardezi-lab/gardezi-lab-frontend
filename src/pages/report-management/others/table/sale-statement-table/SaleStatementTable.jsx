import { Table } from "react-bootstrap";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import httpClient from "../../../../../services/httpClient";

export default function SaleStatementTable({ departmentList, loading }) {




    return (
        <>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Date</th>
                        <th scope="col">MR#</th>
                        <th scope="col">CR</th>
                        <th scope="col">DR</th>
                    </tr>
                </thead>

                <tbody>
                    {/* {
                        cashList?.map((cash, index) => {
                            return (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{cash?.date}</td>
                                    <td>{cash?.description}</td>
                                    <td>{cash?.dr}</td>
                                    <td>{cash?.cr}</td>
                                </tr>
                            )
                        })
                    } */}
                    <tr>
                        <td colSpan="6" className="text-center">
                            No Data Found
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}