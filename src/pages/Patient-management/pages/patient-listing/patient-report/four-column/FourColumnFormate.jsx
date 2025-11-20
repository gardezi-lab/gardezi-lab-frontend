import { Table, Container, Row, Col } from "react-bootstrap";
import ParameterGraph from "../graph/ParameterGraph";

export default function FourColumnFormate({ test, testHistory }) {
    return (
        <>
            <Table bordered hover responsive size="sm" style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#ffff", fontWeight: "bold", borderBottom: "2px solid #000" }}>
                        <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Parameter</th>
                        <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Unit</th>
                        <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Normal Range</th>
                        {
                            test.dates
                                .filter((_, index) => index <= testHistory)
                                .map((t, index) => (
                                    <th key={index} style={{ backgroundColor: "#ffffff", color: 'black' }} >
                                        {index === 0 ? "Result" : t}
                                    </th>
                                ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {test.parameters.map((param, idx) => (
                        <>

                            <tr >
                                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.sub_heading}</td>
                            </tr>
                            <tr key={idx}>
                                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.parameter_name}</td>
                                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.unit}</td>
                                <td style={{ backgroundColor: "#ffffff", color: 'black', whiteSpace: "pre-line" }} >{param.normalvalue.replace(/,/g, "\n")}</td>
                                {
                                    param.result_value
                                        .filter((_, i) => i <= testHistory)
                                        .map((t, i) => (
                                            <td style={{ backgroundColor: "#ffffff", color: 'black' }} key={i}>{t}</td>
                                        ))
                                }
                                {
                                    <td style={{ backgroundColor: "#ffffff", color: 'black' }}>
                                        <ParameterGraph
                                            label={param.parameter_name}
                                            dataPoints={param.result_value.filter((_, i) => i <= testHistory)}
                                            dates={test.dates.filter((_, i) => i <= testHistory)} 
                                        />
                                      

                                    </td>
                                }
                                <td>

                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

/* 

   // <Table bordered hover responsive size="sm" style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                      //   <thead>
                      //     <tr style={{ backgroundColor: "#ffff", fontWeight: "bold", borderBottom: "2px solid #000" }}>
                      //       <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Parameter</th>
                      //       <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Unit</th>
                      //       <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Normal Range</th>
                      //       {
                      //         test.dates
                      //           .filter((_, index) => index <= testHistory)
                      //           .map((t, index) => (
                      //             <th key={index} style={{ backgroundColor: "#ffffff", color: 'black' }} >
                      //               {index === 0 ? "Result" : t}
                      //             </th>
                      //           ))
                      //       }
                      //     </tr>
                      //   </thead>
                      //   <tbody>
                      //     {test.parameters.map((param, idx) => (
                      //       <>

                      //         <tr >
                      //           <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.sub_heading}</td>
                      //         </tr>
                      //         <tr key={idx}>
                      //           <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.parameter_name}</td>
                      //           <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.unit}</td>
                      //           <td style={{ backgroundColor: "#ffffff", color: 'black', whiteSpace: "pre-line" }} >{param.normalvalue.replace(/,/g, "\n")}</td>
                      //           {
                      //             param.result_value
                      //               .filter((_, i) => i <= testHistory)
                      //               .map((t, i) => (
                      //                 <td style={{ backgroundColor: "#ffffff", color: 'black' }} key={i}>{t}</td>
                      //               ))
                      //           }
                      //         </tr>
                      //       </>
                      //     ))}
                      //   </tbody>
                      // </Table>

*/