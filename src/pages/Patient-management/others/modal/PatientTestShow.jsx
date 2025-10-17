import { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";

export default function PatientTestShow({ isPatientTest, setIsPatientTest, patientTest }) {
    const [patientTestShow, setPatientTestShow] = useState([]);

    const closeTestModal = () => {
        setIsPatientTest(false)
    }

    const getTestData = async () => {
        try {
            const url = `/patient_entry/tests/${patientTest.id}`
            const response = await httpClient.get(url);
            console.log("response", response);
            debugger
            setPatientTestShow(response.tests)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTestData();
    }, [isPatientTest])

    return (
        <>
            <Modal show={isPatientTest}>

                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">
                        {patientTest?.patient_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ul className="list-group list-group-flush">
                        {patientTestShow?.map((log, index) => (
                            <li key={index} className="list-group-item">
                                <small className="text-blue">{index + 1} </small>
                                <strong style={{ marginLeft: '5%' }}>{log.test_name}</strong>
                            </li>
                        ))}
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="secondary" onClick={closeTestModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}