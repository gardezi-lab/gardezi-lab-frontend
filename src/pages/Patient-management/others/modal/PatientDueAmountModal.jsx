
import { useState, useEffect } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import httpClient from "../../../../services/httpClient";

export default function PatientDueAmountModal({ showPatientAmountLog, setShowPatientAmountLog, patientPaymentLog, getUpdatedPatientList }) {
    const [patientObj, setPatientObj] = useState();
    const [newamount, setNewamount] = useState("")

    const handleCloseAmountModal = () => {
        setShowPatientAmountLog(false)
    };

    const saveAmount = async () => {
        try {
            if(newamount==""){
                return;
            }
            const obj = {
                paid: newamount
            };
            const url = `/patient_entry/update_fee/${patientObj.id}`
            const response = await httpClient.put(url, obj);
            if (response) {
                getUpdatedPatientList();
                setNewamount("");
            }
            console.log("response", response);
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseAmountModal();
            setNewamount("");
        }

    }

    useEffect(() => {
        setPatientObj(patientPaymentLog);
        console.log("patientPaymentLog", patientPaymentLog)
    }, [showPatientAmountLog])

    return (
        <>
            <Modal show={showPatientAmountLog} >
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">{patientObj?.patient_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Total Amount: {patientObj?.total_fee}</p>
                    <p> Received Amount :{patientObj?.paid}</p>
                    <p>  Due Amount : {patientObj?.total_fee - patientObj?.paid}</p>
                    <div className="mt-2" >
                        <Form.Label>New Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="newamount"
                            value={newamount}
                            placeholder="Enter New Amount"
                            onChange={(e) => setNewamount(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="secondary" onClick={handleCloseAmountModal}>
                        Close
                    </Button>
                    <Button variant="primary" className="primary" onClick={saveAmount}>
                        Save Changes
                    </Button>
                </Modal.Footer>


            </Modal>
        </>
    )
}