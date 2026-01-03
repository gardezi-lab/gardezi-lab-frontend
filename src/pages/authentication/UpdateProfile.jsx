import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Image, Modal } from "react-bootstrap";
import httpClient from "../../services/httpClient";
import axios from "axios";

export default function UpdateProfile() {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        cell: "",
        age: "",
        username: "",
        password: "",
        email: "",
        profile_pic_path: "",
        qualification: ""
    });

    const [preview, setPreview] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profile_pic_path: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const getProfileData = async () => {
        try {
            const obj = JSON.parse(localStorage.getItem("LoggedInUser"));
            const url = `/users/user_profile/${obj?.id}`;
            const response = await httpClient.get(url);

            if (response?.data) {
                setFormData({
                    ...formData,
                    name: response.data.name || "",
                    cell: response.data.contact_no || "",
                    age: response.data.age || "",
                    username: response.data.user_name || "",
                    password: response.data.password || "",
                    email: response.data.email || "",
                    qualification: response.data.qualification || "",
                    profile_pic_path: response.data.profile_pic_path || ""
                });
                setPreview(`http://127.0.0.1:5000/${response.data.profile_pic_path}` || "");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    const handleUpdate = async () => {
        try {
            const obj = JSON.parse(localStorage.getItem("LoggedInUser"));
            const token = localStorage.getItem("token");
            // const url = `/users/user_profile/${obj?.id}`;

            const updatedData = new FormData();
            updatedData.append("name", formData.name);
            updatedData.append("contact_no", formData.cell);
            updatedData.append("age", formData.age);
            updatedData.append("user_name", formData.username);
            // updatedData.append("password", formData.password);
            updatedData.append("email", formData.email);
            updatedData.append("qualification", formData.qualification);
            // updatedData.append("address", formData.address);

            if (formData.profile_pic_path instanceof File) {
                updatedData.append("profile_pic", formData.profile_pic_path);
            }

            const response = await axios.put(`http://127.0.0.1:5000/api/users/user_profile/${obj.id}`, updatedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                    // Accept: "application/json",
                },
            });

            if (!!response) {
                getProfileData();
            }
        } catch (error) {
            console.log(error);
          
        }
    };

    const handleUpdatePassword = async () => {
        const userObj = JSON.parse(localStorage.getItem("LoggedInUser"));
        const obj = {
            password: newPassword || formData.password,
        };
        try {
            const url = `/users/update_password/${userObj?.id}`;
            const response = await httpClient.put(url, obj);
            if (response) {
                console.log("response", response)
                setShowPasswordModal(false);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Container className="mt-4">
            <Form>
                <Row className="justify-content-center mb-4">
                    <Col xs="auto" className="text-center">
                        <Image
                            src={
                                preview ||
                                "https://edenchristianacademy.co.nz/wp-content/uploads/2013/11/dummy-image-square.jpg"
                            }
                            alt="Profile"
                            roundedCircle
                            fluid
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                        <Form.Group controlId="formFile" className="mt-3">
                            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Profile name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Profile username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Profile email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Profile password"
                                value={formData.password}
                                onChange={handleChange}
                                readOnly={true}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Cell</Form.Label>
                            <Form.Control
                                type="text"
                                name="cell"
                                placeholder="Profile cell number"
                                value={formData.cell}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="text"
                                name="age"
                                placeholder="Profile age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <Row className="mt-4 justify-content-center">
                <Col className="text-center ">
                    <Button variant="primary" className="primary" style={{ margin: "2px" }}
                        onClick={() => setShowPasswordModal(true)}
                    >
                        Update Password
                    </Button>
                    <Button variant="primary" className="primary" onClick={handleUpdate}>
                        Update profile
                    </Button>
                </Col>
            </Row>
      
            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
                <Modal.Header className="primary" >
                    <Modal.Title className="fw-bold " style={{ color: "#ffffff" }} >Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Current / New Password</Form.Label>
                        <Form.Control
                            type="text"
                            value={newPassword || formData.password}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="secondary" onClick={() => setShowPasswordModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdatePassword} className="primary" >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
