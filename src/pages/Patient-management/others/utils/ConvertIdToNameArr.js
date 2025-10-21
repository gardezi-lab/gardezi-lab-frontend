
export function ConvertIdToNameArr(patientsArray, testProfiles, doctorList, companyList, testPackageList) {
    debugger
    const updatedPatientArr = patientsArray?.map((pt) => {
        const patientId = pt.users_id;
        const findDoctorObj = doctorList?.find(doctor => doctor.id == patientId);
        const testPackageId = pt.package_id;
        const findPackageObj = testPackageList?.find(testpackage => testpackage.id == testPackageId);

        const companyid = pt.company_id;
        const findCompanyObj = companyList?.find(company => company.id == companyid);

        const ptObject = {
            "address": pt?.address,
            "age": pt?.age,
            "cell": pt?.cell,
            "company_id": findCompanyObj,
            "created_at": pt?.created_at,
            "discount": pt?.discount,
            "email": pt?.email,
            "father_hasband_MR": pt?.father_hasband_MR,
            "gender": pt?.gender,
            "id": pt?.id,
            "mr_number": pt?.mr_number,
            "package_id": findPackageObj,
            "paid": pt?.paid,
            "patient_name": pt?.patient_name,
            "priority": pt?.priority,
            "remarks": pt?.remarks,
            "sample": pt?.sample,
            "tests": pt?.tests,
            "total_fee": pt?.total_fee,
            "users_id": findDoctorObj

        }
        return ptObject;
    });

    return updatedPatientArr;
}



