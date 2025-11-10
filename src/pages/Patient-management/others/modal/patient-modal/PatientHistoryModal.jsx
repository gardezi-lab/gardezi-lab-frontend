import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form, Table } from "react-bootstrap";


export default function PatientHistoryModal({ showHistoryModal, patientHistory, handleHistoryData,closeHistoryModal }) {
    return (
        <>
            <Modal show={showHistoryModal} className="border" size="md"  >
                <Modal.Header className="primary" closeButton  closeVariant="white" onHide={closeHistoryModal}  >
                    <Modal.Title className="fw-bold color-white" >Patient History</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                     border: "1px solid #1c2765",
                        borderTop: "none",
                        backgroundColor: "#f9fafc", // ✅ soft background for professional feel
                       
                        borderRadius: "0 0 0.375rem 0.375rem",
                }}  >
                    <Table>
                        <thead style={{ backgroundColor: 'white !important ' }} >
                            <tr >
                                <th>Sr.</th>
                                <th>Mr#</th>
                                <th>Name</th>
                                <th>Father/Husband</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patientHistory?.map((obj, index) => {
                                    return (
                                        <>
                                            <tr key={index + 1} >
                                                <td>{index + 1}</td>
                                                <td>{obj.mr_number}</td>
                                                <td>{obj.patient_name}</td>
                                                <td>{obj.father_hasband_MR}</td>
                                                <td>
                                                    <Button className="primary" size="sm" onClick={() => handleHistoryData(obj)}  >
                                                        Continue
                                                    </Button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                </Modal.Body>
                
            </Modal>

        </>
    )
}