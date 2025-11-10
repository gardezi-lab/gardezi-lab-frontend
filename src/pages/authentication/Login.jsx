import React, { useEffect, useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import httpClient from "../../services/httpClient";
import { useNavigate } from "react-router-dom";
import gardezi_logo from "../../../public/assets/img/gardezi_logo.jpg";


export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        user_name: "drahmed12",
        password: "PpXX7t17"
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserForm({
            ...userForm,
            [name]: value
        })
    };

    const handleLogin = async () => {
        try {
            console.log("userForm", userForm)
            const obj = {
                user_name: userForm.user_name,
                password: userForm.password
            }
            const url = `/auth/login`;
            const response = await httpClient.post(url, obj);
            if (response.status == 200) {
                const userData = response;
                localStorage.setItem("LoggedInUser", JSON.stringify(userData));
                setIsLoggedIn(true); 
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">

            <Card style={{ padding: '30px 10px', width: "45%" }}>
                <div className="pt-4 pb-4" style={{ display: "flex", justifyContent: "center" }} >
                    <img
                        src={gardezi_logo}
                        alt="logo-image"
                        style={{ width: "150px", marginBottom: "15px" }}
                    />
                </div>
                <div className="p-2" >
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        id="user_name"
                        name="user_name"
                        placeholder="Enter username"
                        value={userForm.user_name}
                        onChange={handleInput}
                    />
                </div>
                <div className="p-2">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={userForm.password}
                        onChange={handleInput}
                    />
                </div>
                <div style={{ paddingTop: "30px" }} >
                    <Button variant="primary" className="primary w-100"
                        onClick={handleLogin}
                    >Login</Button>
                </div>
            </Card>
        </div>
    );
}
