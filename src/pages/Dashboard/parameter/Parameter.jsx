import { useEffect, useState } from "react";
import feather from "feather-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ParameterTable from "./ParameterTable";
import ParameterModal from "./ParameterModal";
import httpClient from "../../../services/httpClient";


export default function Parameter() {
    const [show, setShow] = useState(false);
    const [parameter, setparameter] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [parameterList, setparameterList] = useState([])
    const [selectedParameter, setselectedParameter] = useState([null])
    const [isCurrentEditModalOpen, setIsCurrentEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // ✅ new state for loader



    useEffect(() => {
        feather.replace();
    }, []);

    const getParameterData = async () => {
        setLoading(true); // ✅ start loader
        try {
            const data = await httpClient.get("/parameter");
            if (data) {
                setparameterList(data);
            }
            console.log("Parameter Data:", data);
        } catch (err) {
            console.error("Fetch Parameter Error:", err);
        } finally {
            setLoading(false); // ✅ stop loader
        }
    };
    useEffect(() => {
        getParameterData();
    }, [])

    const handleSave = async (formData) => {
        console.log("handleSave  aaya ", formData);
        setLoading(true);
        try {
            const obj = {
                parameter_name: formData.parameter_name,
                sub_heading: formData.sub_heading,
                input_type: formData.input_type,
                unit: formData.unit,
                normalvalue: formData.normalvalue,
                default_value: formData.default_value,
            };

            if (isCurrentEditModalOpen && selectedParameter) {
                console.log("handleput  aaya ", formData);
                await httpClient.put(
                    `/parameter/${selectedParameter.id}`,
                    obj
                );
            } else {
                await httpClient.post("/parameter", obj);
            }

            getParameterData();
        } catch (err) {
            console.error("Save Parameter Error:", err);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/parameter/${id}`);
            getParameterData();
        } catch (err) {
            console.error("Delete Parameters Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dep) => {
        setselectedParameter(dep);
        setIsCurrentEditModalOpen(true);
        handleShow();
    };

    return (
        <div>
            <h5 className="fw-bold page-header">Parameters</h5>

            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
                {/* Left side title */}

                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">

                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Parameter
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <ParameterTable
                onDelete={handleDelete}
                parameterList={parameterList}
                loading={loading}
                onEdit={handleEdit}

            />

            {/* Footer below table */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Left side export */}
                <button className="btn btn-secondary primary">
                    <i className="fas fa-file-excel me-2"></i> Export to Excel
                </button>

                {/* Right side pagination */}
                <nav>
                    <ul className="pagination mb-0 ">
                        <li className="page-item disabled">
                            <button className="page-link ">Previous</button>
                        </li>
                        <li className="page-item active ">
                            <button className="page-link primary">1</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">2</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">3</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>


            <Modal show={show} onHide={handleClose} className="modal sm">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold"> Add Parameter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ParameterModal
                        onSave={handleSave}
                        onCancel={handleClose}
                        Parameter={selectedParameter} />
                </Modal.Body>
            </Modal>
        </div>
    );
}
