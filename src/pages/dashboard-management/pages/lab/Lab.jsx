import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";
import LabTable from "../../others/table/lab/LabTable";
import LabModal from "../../others/modal/lab/LabModal";


export default function Lab() {
    const [isShowDepartmentModal, setIsShowDepartmentModal] = useState(false);
    const [labList, setLabList] = useState([]);
    const [modalHeader, setModalHeader] = useState("");
    const [updateObj, setUpdateObj] = useState(null);

    const handleDepartmentModal = () => {
        setUpdateObj(null);
        setIsShowDepartmentModal(true);
        setModalHeader("save");
    }

    const EditRecord = (isOpen = false, obj) => {
        isOpen && setIsShowDepartmentModal(true);
        isOpen && setModalHeader("Update");
        isOpen && setUpdateObj(obj);
    }

    const handleDelete = (isDelete = false) => {
        if (isDelete) getLabData();
    };


    const getLabData = async () => {
        try {
            const url = `/lab`;
            const response = await httpClient.get(url);

            console.log("API RESPONSE ", response);
            if (response) {
                setLabList(response)
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getLabData();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
                <h5 className="fw-bold page-header">Lab</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <Button
                        size="sm"
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleDepartmentModal}
                    >
                        <i className="fas fa-plus me-2"></i> Add Lab
                    </Button>

                </div>
            </div>

            <LabTable
                labListList={labList}
                labList={labList}
                EditRecord={EditRecord}
                handleDelete={handleDelete}
            />

            <LabModal
                setIsShowDepartmentModal={setIsShowDepartmentModal}
                isShowDepartmentModal={isShowDepartmentModal}
                modalHeader={modalHeader}
                updateObj={updateObj}
                refreshList={getLabData}
            /> 


        </>
    );
}
