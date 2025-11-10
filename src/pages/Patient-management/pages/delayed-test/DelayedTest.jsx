import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import { Container, Button, Modal, Form, Table } from 'react-bootstrap';


export default function DelayedTest() {
    const [testList, setTestList] = useState([]);

    const handleTest = async () => {
        const url = `/test_profile/delayed_tests`;
        const response = await httpClient.get(url);
        if (response) {
            setTestList(response.data);
        }
    }


    useEffect(() => {
        handleTest()
    }, []);




    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold page-header">Delayed Test</h5>

            </div>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">MR#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cell</th>
                        <th scope="col">Delayed(hours)</th>
                        <th scope="col">Delivery Time</th>
                        <th scope="col">Test</th>
                        <th scope="col">Reporting Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        testList?.map((test, index) => {
                            return (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{test?.mr_number}</td>
                                    <td>{test?.patient_name}</td>
                                    <td>{test?.cell}</td>
                                    <td>{test?.delayed_hours}</td>
                                    <td>{test?.delivery_time}</td>
                                    <td>{test?.test_name}</td>
                                    <td>{test?.reporting_time}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>



        </>
    )
}