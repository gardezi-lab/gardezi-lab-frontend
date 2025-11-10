import { useState } from 'react';
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { ThreeCircles } from "react-loader-spinner";
import { Button, Table } from "react-bootstrap";

export default function ParameterTable({ ParameterList, onDelete, onEdit, loading }) {

    return (
        <>
            <Table bordered hover size="sm">
                <thead style={{ background: "#f8f9fa" }}>
                    <tr>
                        <th style={{ textAlign: "center" }}>Sr.</th>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Default</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center">
                                <div className="d-flex justify-content-center align-items-center p-4">
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "250px",
                                        }}
                                    ></div>
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
                    ) : ParameterList.length > 0 ? (
                        ParameterList.map((item, index) => (
                            <tr key={item.parameter_id}>
                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                <td>{item.parameter_name}</td>
                                <td>{item.unit}</td>
                                <td>{item.default_value}</td>
                                <td>
                                    <div className="d-flex gap-2 justify-content-center">
                                        <FaPenToSquare
                                            onClick={() => onEdit(item)}
                                            style={{ fontSize: "20px", cursor: "pointer", color: "#007bff" }}
                                            title="Edit"
                                        />
                                        <FaRegTrashCan
                                            onClick={() => onDelete(item.parameter_id)}
                                            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
                                            title="Delete"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No Parameters Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
           
        </>
    );
}
