
export function ConvertIdToNameArr(patientsArray, testProfiles, doctorList, companyList, testPackageList) {
    
    const updatedPatientArr = patientsArray?.map((pt) => {
        console.log("ptptpt",pt)
        const patientId = pt.reff_by;
        const findDoctorObj = doctorList?.find(doctor => doctor.id == patientId);
        const testPackageId = pt.package_id;
        const findPackageObj = testPackageList?.find(testpackage => testpackage.id == testPackageId);

        const companyid = pt.company_id;
        const findCompanyObj = companyList?.find(company => company.id == companyid);

        const ptObject = {
            "cid":pt?.cid,
            "address": pt?.address,
            "age": pt?.age,
            "cell": pt?.cell,
            "company_id": findCompanyObj,
            "created_at": pt?.created_at,
            "discount": pt?.discount,
            "email": pt?.email,
            "father_hasband_MR": pt?.father_hasband_MR,
            "gender": pt?.gender,
            "id": pt?.patient_id,
            "mr_number": pt?.MR_number,
            "package_id": findPackageObj,
            "paid": pt?.paid,
            "patient_name": pt?.patient_name,
            "priority": pt?.priority,
            "remarks": pt?.remarks,
            "sample": pt?.sample,
            "tests": pt?.tests,
            "total_fee": pt?.total_fee,
            "status": pt?.status,
            "reff_by": findDoctorObj,
            "date_created":pt?.date_created,
            "pending_discount":pt?.pending_discount

        }
        return ptObject;
    });

    return updatedPatientArr;
}



