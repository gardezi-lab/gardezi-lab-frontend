import { Table, Container, Row, Col } from "react-bootstrap";
import ParameterGraph from "../graph/ParameterGraph";
export default function EditorFormate({test}) {
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
                        <tr key={idx}>
                            <td style={{ backgroundColor: "#ffffff", color: 'black' }} >{param.result_value[0]}</td>
                            <td>
                                                                <ParameterGraph
                                                                    label={"Parameter Graph"}
                                                                    dataPoints={[12, 18, 10, 25, 20]}
                                                                />
                                                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}