import Button from 'react-bootstrap/Button';


export default function ConsultantTable() {
    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div class="table-responsive" style={{ maxHeight: "62vh", overflowY: 'scroll' }}>
                        <table class="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#1c2765" }} >
                                    <th scope="col">Sr.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Hospital</th>
                                    <th scope="col">%Age</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Action</th>
                              

                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>
                                        <Button variant="primary" className='secondary' >Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>
                                        <Button variant="primary" className='secondary' >Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                    <td>@twitter</td>
                                    <td>@twitter</td>
                                    <td>@twitter</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                    <td>@twitter</td>
                                    <td>@twitter</td>
                                    <td>@twitter</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>the Bird</td>
                                    <td>
                                        <Button variant="primary" className='secondary'>Primary</Button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}