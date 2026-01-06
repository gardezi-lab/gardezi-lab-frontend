import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import httpClient from "../../services/httpClient";
import { useNavigate } from "react-router-dom";
import gardezi_logo from "../../../public/assets/img/gardezi_logo.jpg";
// import { useAuth } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);


    const [userForm, setUserForm] = useState({
        user_name: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await httpClient.post("/auth/login", {
                email: userForm.user_name,
                password: userForm.password
            });

            if (response.status == 200) {
                login(response);

                setIsLoggedIn(true);
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Card style={{ padding: "30px 10px", width: "35%" }}>

                <div className="pt-3 pb-4 d-flex justify-content-center">
                    <img
                        src={gardezi_logo}
                        alt="logo"
                        style={{ width: "150px" }}
                    />
                </div>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="p-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="user_name"
                            placeholder="Enter email"
                            value={userForm.user_name}
                            onChange={handleInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="p-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={userForm.password}
                            onChange={handleInput}
                            required
                            minLength={3}
                        />
                        {
                            userForm.password &&
                            <Form.Text
                                as="div"
                                onClick={() => setShowPassword(prev => !prev)}
                                style={{
                                    textAlign: "right",
                                    color: "goldenrod",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    marginTop: "4px",
                                    userSelect: "none"
                                }}
                            >
                                {showPassword ? "Hide Password" : "Show Password"}
                            </Form.Text>
                        }
                    </Form.Group>

                    <div className="pt-4 px-2">
                        <Button
                            type="submit"
                            variant="primary"
                            className="primary w-100"
                        >
                            Login
                        </Button>
                    </div>

                </Form>
            </Card>
        </div>
    );
}
