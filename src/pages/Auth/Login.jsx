import React, { useState } from "react";
import httpClient from "../../services/httpClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user_name, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await httpClient.post("/auth/login", {
                user_name,
                password,
            });
            console.log("Full Response:", response);
            // agar response ke andar data hai
            // const resData = response.data ? response.data : response;
            if (response.message === "Login successful") {
                localStorage.setItem("user", JSON.stringify(response.user));
                // alert("Login successful ✅");
                navigate("/"); // Dashboard khulega
            } else {
                setError(response.error || "Invalid username or password");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Something went wrong! Please try again.");
        }

        finally {
            setLoading(false);
        }
    };



    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="login shadow p-4" style={{ width: "400px" }}>
                <form onSubmit={handleSubmit}>
                    <h3 className="mb-3 text-center">Login</h3>

                    {error && <p className="text-danger">{error}</p>}

                    <div className="mb-4">
                        <label className="form-label text-black">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-black">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
