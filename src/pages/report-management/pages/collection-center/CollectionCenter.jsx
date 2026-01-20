import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import httpClient from "../../../../services/httpClient";
import CollectionTable from "../../others/table/collection-table/CollectionTable";
import CollectionModal from "../../others/modal/collection-modal/CollectionModal";

export default function CollectionCenter() {
    const [isShowDepartmentModal, setIsShowDepartmentModal] = useState(false);
    const [collectionList, setCollectionList] = useState([]);
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
        if (isDelete) getDepartmentData();
    };


    const getDepartmentData = async () => {
        try {
            const url = `/collectioncenter`;
            const response = await httpClient.get(url);

            if (response) {
                setCollectionList(response)
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getDepartmentData();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
                <h5 className="fw-bold page-header">Collections</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <Button
                        size="sm"
                        className="btn btn-success primary"
                        type="button"
                        onClick={handleDepartmentModal}
                    >
                        <i className="fas fa-plus me-2"></i> Add Collections
                    </Button>

                </div>
            </div>

            <CollectionTable
                collectionList={collectionList}
                EditRecord={EditRecord}
                handleDelete={handleDelete}
            />

            <CollectionModal
                setIsShowDepartmentModal={setIsShowDepartmentModal}
                isShowDepartmentModal={isShowDepartmentModal}
                modalHeader={modalHeader}
                updateObj={updateObj}
                refreshList={getDepartmentData}
            />


        </>
    );
}
