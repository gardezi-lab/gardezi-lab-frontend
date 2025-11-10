import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form, Table } from "react-bootstrap";

export default function PatientVerifyModal({ showVerifyModal, closeVerifyModal, patientVerify }) {
    console.log("patientVerify", patientVerify)
    return (
        <>
            <Modal show={showVerifyModal} className="border" size="lg">
                <Modal.Header
                    className="primary d-flex align-items-center"
                    closeButton
                    closeVariant="white"
                    onHide={closeVerifyModal}
                >
                    <Modal.Title className="fw-bold color-white mb-0">Verify Patient</Modal.Title>
                </Modal.Header>

                <Modal.Body
                    style={{
                        border: "1px solid #1c2765",
                        borderTop: "none",
                        backgroundColor: "#f9fafc", // ✅ soft background for professional feel

                        borderRadius: "0 0 0.375rem 0.375rem",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",
                            padding: "1rem 1.25rem",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <Row className="mb-2">
                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Name:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.name}</span>
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Age:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.age}</span>
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Gender:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.gender}</span>
                                </p>
                            </Col>
                        </Row>
                        <Row className="mb-2">

                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Cell:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.cell}</span>
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Consultant:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.consultant}</span>
                                </p>
                            </Col>
                        </Row>

                    </div>

                    {/* Test Table */}
                    <div
                        className="table-responsive mb-4"
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            overflow: "hidden",
                        }}
                    >
                        <Table className="table table-bordered table-sm mb-0 align-middle">
                            <thead
                                style={{
                                    backgroundColor: "#1c2765",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                <tr>
                                    <th>Sr</th>
                                    <th>Test Description</th>
                                    <th>Sample Required</th>
                                    <th>Delivery Time</th>
                                    <th>Price</th>

                                </tr>
                            </thead>
                            {/* {patientVerify.test?.length > 0 && ( */}
                            <tbody>
                                {patientVerify.test?.map((row, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.takenSample}</td>
                                        <td>{row.testDeliveryTime}</td>
                                        <td>{row.testFee}</td>

                                    </tr>
                                ))}
                            </tbody>
                            {/* )} */}
                        </Table>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",
                            padding: "1rem 1.25rem",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                    >
                        <Row className="mb-2">
                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Total Amount:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.total}</span>
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Discount:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.discount}</span>
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Net:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.net}</span>
                                </p>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={4}>
                                <p className="mb-1">
                                    <strong>Paid:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.paid}</span>
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="mb-0">
                                    <strong>Balance:</strong>{" "}
                                    <span className="text-muted">{patientVerify?.balenc}</span>
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}