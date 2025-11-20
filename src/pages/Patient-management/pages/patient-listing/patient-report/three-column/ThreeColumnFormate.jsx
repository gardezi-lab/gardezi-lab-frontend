import { Table, Container, Row, Col } from "react-bootstrap";
import ParameterGraph from "../graph/ParameterGraph";

export default function ThreeColumnFormate({ test }) {
    return (
        <>
            <Table bordered hover responsive size="sm"
                style={{
                    width: "100%",
                    fontSize: "13px",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr style={{ fontWeight: "bold", borderBottom: "2px solid #000" }}>
                        <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Parameter</th>
                        <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Cutt Off</th>
                        {
                            test.dates.map((t, index) => {
                                return (
                                    <th style={{ backgroundColor: "#ffffff", color: 'black' }} key={index} >
                                        {index === 0 && "Result"}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {test.parameters.map((param, idx) => (
                        <>
                            <tr>
                                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.sub_heading}</td>
                            </tr>
                            <tr key={idx}>
                                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.parameter_name}</td>
                                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.cutoff_value[0]}</td>
                                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.result_value[0]}</td>
                                <ParameterGraph
                                    label={param.parameter_name}
                                    dataPoints={param.result_value.filter((_, i) => i <= testHistory)}
                                    dates={test.dates.filter((_, i) => i <= testHistory)}
                                />

                            </tr>
                        </>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

/* 

 // <Table bordered hover responsive size="sm"
                      //   style={{
                      //     width: "100%",
                      //     fontSize: "13px",
                      //     borderCollapse: "collapse",
                      //   }}
                      // >
                      //   <thead>
                      //     <tr style={{ fontWeight: "bold", borderBottom: "2px solid #000" }}>
                      //       <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Parameter</th>
                      //       <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Cutt Off</th>
                      //       {
                      //         test.dates.map((t, index) => {
                      //           return (
                      //             <th style={{ backgroundColor: "#ffffff", color: 'black' }} key={index} >
                      //               {index === 0 && "Result"}
                      //             </th>
                      //           )
                      //         })
                      //       }
                      //     </tr>
                      //   </thead>
                      //   <tbody>
                      //     {test.parameters.map((param, idx) => (
                      //       <>
                      //         <tr>
                      //           <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.sub_heading}</td>
                      //         </tr>
                      //         <tr key={idx}>
                      //           <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.parameter_name}</td>
                      //           <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.cutoff_value[0]}</td>
                      //           <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.result_value[0]}</td>

                      //         </tr>
                      //       </>
                      //     ))}
                      //   </tbody>
                      // </Table>
*/