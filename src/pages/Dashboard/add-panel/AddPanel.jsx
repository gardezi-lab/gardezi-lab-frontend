import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import TestPanelModal from "./TestPanelModal";
import Button from 'react-bootstrap/Button';
import TestPanelTable from "./TestPanelTable";
import httpClient from "../../../services/httpClient";

export default function AddPanel() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedCompany, setSlectedCompany] = useState(null)
    const [companyList, setCompanyList] = useState([])
    const [loading, setLoading] = useState(false);

    const getCompanyData = async () => {
        setLoading(true); // ✅ start loader
        try {
            const data = await httpClient.get("/companies_panel/");
            if (data) {
                setCompanyList(data);
            }
            console.log("Company Data:", data);
        } catch (err) {
            console.error("Fetch Company Error:", err);
        } finally {
            setLoading(false); // ✅ stop loader
        }
    };

    const handleSave = async (formData) => {
        console.log("HANDLE SAVE:", formData);
        setLoading(true);

        try {
            const obj = {
                company_name: formData.company_name,
                head_name: formData.head_name,
                contact_no: formData.contact_no,
                user_name: formData.user_name,
                age: formData.age
            };
            console.log("-> payload prepared:", obj);

            if (selectedCompany) {

                await httpClient.put(`/companies_panel/${selectedCompany.id}`, obj);
                console.log("Company updated");
            } else {
                
                await httpClient.post("/companies_panel", obj);
                console.log("Company added");
            }

            await getCompanyData();
        } catch (err) {
            console.error("Save Company Error:", err);
        } finally {
            setLoading(false);
            handleClose();
            setSlectedCompany(null); 
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await httpClient.delete(`/companies_panel/${id}`);
            getCompanyData();
        } catch (err) {
            console.error("Delete Company Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (company) => {
        setSlectedCompany(company);  // ✅ correct function use karo
        handleShow();
    };


    useEffect(() => {
        getCompanyData();
    }, []);



    return (
        <>

            <h5 className="fw-bold page-header">Companies</h5>

            <div className="d-flex justify-content-end align-items-center mb-3 mt-2">
                {/* Left side title */}

                {/* Right side actions */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search company by name"
                        style={{ width: "220px" }}
                    />

                    <button
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleShow}
                    >
                        <i className="fas fa-plus me-2"></i> Add Company
                    </button>
                </div>
            </div>

            <TestPanelTable
                companyList={companyList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}

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

            <Modal show={show} onHide={handleClose} className="modal-md">
                <Modal.Header className="primary" >
                    <Modal.Title className="color-white fw-bold">Add Companies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TestPanelModal
                        onSave={handleSave}
                        company={selectedCompany}
                        onCancel={handleClose}
                    />
                </Modal.Body>

            </Modal>
        </>
    )
}
