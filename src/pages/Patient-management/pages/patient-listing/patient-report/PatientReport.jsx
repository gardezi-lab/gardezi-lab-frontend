import React, { useEffect, useState } from "react";
import gardezi_logo from "../../../../../../public/assets/img/gardezi_logo.jpg";
import barcode from "../../../../../../public/assets/img/barcode.jpg";
import report_footer from "../../../../../../public/assets/img/report_footer.jpeg";
import httpClient from "../../../../../services/httpClient";
import { useLocation } from "react-router-dom";
// import ParameterGraph from "./graph/ParameterGraph.jsx";
import FourColumnFormate from "./four-column/FourColumnFormate.jsx";
import ThreeColumnFormate from "./three-column/ThreeColumnFormate.jsx";
import TwoColumnFormate from "./two-column/TwoColumnFormate.jsx";
import EditorFormate from "./editor-formate/EditorFormate.jsx";
import BasicInformation from "./basic-information/BasicInformation.jsx";

export default function PatientReport() {
  const [invoiceResult, setInvoiceResult] = useState(null);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  const testListRaw = query.get("testList");
  const testHistory = query.get("testHistory");
  const testList = testListRaw ? JSON.parse(decodeURIComponent(testListRaw)) : [];

  const getPatientEntryData = async () => {
    try {
      const url = `/report/${id}`;
      const test = { test: testList };
      const response = await httpClient.post(url, test);
      if (response) setInvoiceResult(response);
    } catch (err) {
      console.error("Fetch PatientEntry Error:", err);
    }
  };

  useEffect(() => {
    if (id) getPatientEntryData();
    // window.print();
  }, [id]);

  return (
    <>
      <div style={{ backgroundColor: "#ffffff", padding: "1rem 2rem", fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#000" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <img src={gardezi_logo} alt="Gardezi Lab" style={{ height: "80px", width: "80px", objectFit: "contain" }} />
          <img src={invoiceResult?.qr_code} alt="QR Code" style={{ height: "80px", width: "150px", objectFit: "contain" }} />
        </div>
        <BasicInformation
          invoiceResult={invoiceResult}
          barcode={barcode}
        />

        <div>
          {/* <ParameterGraph
            label={"Parameter Graph"}
            dataPoints={[12, 18, 10, 25, 20]}
          /> */}
          {invoiceResult?.tests?.map((test, index) => (
            <div key={index} >
              <div style={{ border: '1px solid gray', }}>
                <h3 style={{ textAlign: 'center' }} >
                  {test?.department}
                </h3>
              </div>
              <h6
                style={{
                  fontWeight: "700",
                }}
              >
                {test.test_name || "Null"}
              </h6>

              {test?.parameters?.length > 0 ? (
                <>
                  {
                    test.test_type == "four columns" ? (
                      <FourColumnFormate
                        test={test}
                        testHistory={testHistory}
                      />
                    ) : test.test_type == "three columns" ? (

                      <ThreeColumnFormate
                        test={test}
                      />
                    ) : test.test_type == "two columns" ? (
                      <TwoColumnFormate
                        test={test}
                        testHistory={testHistory}
                      />
                    ) : (
                      <EditorFormate
                        test={test}
                      />
                    )
                  }

                </>
              ) : (
                <p
                  style={{
                    color: "#888",
                    fontSize: "13px",
                    marginLeft: "10px",
                  }}
                >
                  No parameters available
                </p>
              )}
              <h6
                style={{
                  fontWeight: "700",
                  paddingBottom: "5px",
                  marginBottom: "10px",
                }}
              >
                Comments by Doctor: {test.comment || "Null"}
              </h6>

              <h6
                style={{
                  fontWeight: "700",
                  paddingBottom: "5px",
                  marginBottom: "10px",
                }}
              >
                Interpertation:
              </h6>
              <div
                dangerouslySetInnerHTML={{
                  __html: test.intr_detail || "<p>Null</p>",
                }}
              />

              <div>
                <h6>verified by : {test.test_verify_info.map(obj => obj.name) || "Null"}</h6>
                <h6>Qualification :{test.test_verify_info.map(obj => obj.qualification) || "Null"}</h6>
                <h6>Verified At : {test.test_verify_info.map(obj => obj.verified_at) || "Null"}</h6>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          textAlign: "center",
          borderTop: "2px solid #000",
          paddingTop: "20px",
          paddingBottom: "40px",
          backgroundColor: "#fff",

        }}>
          <img
            src={report_footer}
            alt="Report Footer"
            style={{ maxHeight: "170px", width: "auto", objectFit: "contain" }}
          />
        </div>
      </div>
    </>
  );
}
