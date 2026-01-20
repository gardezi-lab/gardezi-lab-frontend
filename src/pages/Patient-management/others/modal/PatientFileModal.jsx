import { useState, useEffect } from "react";
import { Row, Col, Form, Table, Modal, Button, Alert } from "react-bootstrap";
import { FaHistory, FaEye, FaFileMedical, FaPaperclip, FaTimes } from "react-icons/fa";
import httpClient from "../../../../services/httpClient";
import axios from "axios";

export default function PatientFileModal({ showFileModal, selectedPatientForFiles, setShowFileModal }) {
    const [uploading, setUploading] = useState(false);
    const [patientFiles, setPatientFiles] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        console.log('file', file)
        // if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        // for (let [key, value] of formData.entries()) {
        //     console.log("FormData entry:", key, value);
        // }

        // formData.append("patient_id", selectedPatientForFiles.cid);

        try {
            const token = localStorage.getItem("token");
            console.log("selectedPatientForFileszzz", selectedPatientForFiles)
            setUploading(true);
            await axios.post(`http://127.0.0.1:5000/api/patient_entry/upload_file/${selectedPatientForFiles.cid}/${selectedPatientForFiles.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
            });
            getFileList();

            setAlertMessage("File uploaded successfully!");
            setShowAlert(true);

            setTimeout(() => setShowAlert(false), 3000);

        } catch (err) {
            console.log(err);
             setAlertMessage("File upload failed!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const getFileList = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `http://127.0.0.1:5000/api/patient_entry/get_files/${selectedPatientForFiles.cid}/${selectedPatientForFiles.id}`;
            const res = await axios.get(url,
                {
                    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
                }
            );

            setPatientFiles(res.data ? [res.data] : []);
        } catch (error) {
            console.log(error);
        }
    };


    const handleDeleteFile = async (fileId) => {
        try {
            await httpClient.delete(`/patient_entry/delete_file/${selectedPatientForFiles.cid}/${selectedPatientForFiles.id}`);

            setPatientFiles(prev =>
                prev.filter(file => file.id !== fileId)
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setPatientFiles([])
        getFileList();
    }, [selectedPatientForFiles]);


    return (
        <>
            <Modal

                show={showFileModal}
                centered
                size="md"
            >
                <Modal.Header className="primary">
                    <Modal.Title className="fw-bold color-white">Patient Files</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="file"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                    </Form.Group>


                    {patientFiles.length === 0 ? (
                        <p className="text-muted text-center">No files uploaded</p>
                    ) : (
                        <ul className="list-group">
                            {patientFiles?.map(file => (
                                <li
                                    key={file.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <a
                                        href={file.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {file.file_url.split("/").pop()}
                                    </a>

                                    <FaTimes
                                        style={{ cursor: "pointer", color: "#e74c3c" }}
                                        onClick={() => handleDeleteFile(file.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary" className="secondary"
                        size="sm"
                        onClick={() => setShowFileModal(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}