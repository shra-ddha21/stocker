import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                console.log("Token stored after login:", localStorage.getItem("token"));
                setMessage("Login successful! Redirecting...");
                setMessageType("success");
                setTimeout(() => navigate("/profile"), 1500);
            } else {
                setMessage(data.message || "Invalid credentials!");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Something went wrong! Try again.");
            setMessageType("error");
        }
    };

    return (
        <div className="container" style={{ backgroundColor: "#17252A", color: "white", minHeight: "100vh", padding: "50px 0" }}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="box" style={{ cursor: "pointer", color: "#51f4ec", fontSize: "25px" }} onClick={() => navigate("/")}>
                        Stocker
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="slideUp" style={{ borderRadius: "25px", textAlign: "center", border: "1px solid #3AAFA9", padding: "20px" }}>
                        <h4>Login</h4>
                        <form onSubmit={handleSubmit}>
                            <table align="center" style={{ textAlign: "center" }}>
                                <tbody>
                                    <tr>
                                        <td>Email Id:</td>
                                        <td>
                                            <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Password:</td>
                                        <td>
                                            <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <br />
                                            <button id="submit" type="submit" style={{ backgroundColor: "#3AAFA9", color: "#17252A", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="slideUp" style={{ borderRadius: "25px", textAlign: "center", padding: "10px" }}>
                        New user? <a href="/signup" style={{ color: "#51f4ec", textDecoration: "none" }}>Click</a> to Sign Up.
                    </div>
                </div>
            </div>
            {message && (
                <div className="row mt-3">
                    <div className="col-md-6 offset-md-3">
                        <div style={{
                            backgroundColor: messageType === "success" ? "#3AAFA9" : "#FF0000",
                            color: "#17252A",
                            borderRadius: "5px",
                            height: "50px",
                            textAlign: "center",
                            lineHeight: "50px",
                            fontWeight: "bold",
                            fontSize: "20px",
                            animation: "slideDown 1s"
                        }}>
                            {message}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
