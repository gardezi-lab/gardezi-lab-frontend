import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="login shadow p-4" style={{ width: "50%" }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label text-black">Username:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 ">
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

                    <button type="submit" className="btn btn-success w-20 d-block mx-auto">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
