import { Table, Container, Row, Col } from "react-bootstrap";
import ParameterGraph from "../graph/ParameterGraph";

export default function TwoColumnFormate({ test, testHistory }) {
  return (
    <>
      <Table bordered hover responsive size="sm" style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ fontWeight: "bold", borderBottom: "2px solid #000" }}>
            <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Parameter</th>
            {
              test.dates.filter((_, index) => index <= testHistory).map((t, index) => {
                return (
                  <th style={{ backgroundColor: "#ffffff", color: 'black' }} key={index} >
                    {index === 0 ? "Result" : t}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {test.parameters.filter((_, index) => index <= testHistory).map((param, idx) => (
            <>
              <tr>
                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.sub_heading}</td>
              </tr>
              <tr key={idx}>
                <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.parameter_name}</td>
                {param.result_value.filter((_, index) => index <= testHistory).map((t, i) => (
                  <td style={{ backgroundColor: "#ffffff", color: 'black' }} key={i}>{t}</td>
                ))}
                <td>
                  <ParameterGraph
                    label={param.parameter_name}
                    dataPoints={param.result_value.filter((_, i) => i <= testHistory)}
                    dates={test.dates.filter((_, i) => i <= testHistory)}
                  />
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
   <Table bordered hover responsive size="sm" style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                         <thead>
                           <tr style={{ fontWeight: "bold", borderBottom: "2px solid #000" }}>
                             <th style={{ backgroundColor: "#ffffff", color: 'black' }} >Parameter</th>
                             {
                               test.dates.filter((_, index) => index <= testHistory).map((t, index) => {
                                 return (
                                   <th style={{ backgroundColor: "#ffffff", color: 'black' }} key={index} >
                                     {index === 0 ? "Result" : t}
                                   </th>
                                 )
                               })
                             }
                           </tr>
                         </thead>
                         <tbody>
                           {test.parameters.filter((_, index) => index <= testHistory).map((param, idx) => (
                             <>
                               <tr>
                                 <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.sub_heading}</td>
                               </tr>
                               <tr key={idx}>
                                 <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.parameter_name}</td>
                                 {param.result_value.filter((_, index) => index <= testHistory).map((t, i) => (
                                   <td style={{ backgroundColor: "#ffffff", color: 'black' }} key={i}>{t}</td>
                                 ))}
                               </tr>
                             </>
                           ))}
                         </tbody>
                       </Table>

*/