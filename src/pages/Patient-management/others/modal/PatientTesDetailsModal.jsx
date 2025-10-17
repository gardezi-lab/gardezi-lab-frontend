/* 

 <Modal show={showModal} centered>
                <Modal.Header className="primary">
                    <Modal.Title className="color-white fw-bold">Test Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {Array.isArray(testDetails) && testDetails.length > 0 ? (
                        <ol className="list-group list-group-numbered">
                            {testDetails.map((test, index) => (

                                <>
                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span className="me-1">{test.test_name}</span>
                                    </li>
                                </>

                            ))}
                        </ol>


                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
*/