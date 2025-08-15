import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import { Link } from "react-router-dom";
import "./Signup.css"; // Move styles to a separate CSS file

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            console.log("Response from server:", data);
            if (response.ok) {
                alert("Signup successful! Please log in.");
                navigate("/login");
            } else {
                alert(data.message || "Signup failed.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    

    return (
        <div className="container" style={{ backgroundColor: "#17252A", color: "white" }}>
            <br /><br />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="box" style={{ cursor: "pointer", color: "#51f4ec", fontSize: "25px" }} onClick={() => navigate("/")}>
                        Stocker
                    </div>
                </div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="slideUp" style={{ color: "white", borderRadius: "25px", textAlign: "center", border: "1px solid #3AAFA9" }}>
                        <br />
                        <h4>Sign Up</h4>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <table align="center" style={{ textAlign: "center" }}>
                                <tbody>
                                    <tr>
                                        <td>Name:</td>
                                        <td>
                                            <input
                                                type="text"
                                                placeholder="Firstname Lastname"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email Id:</td>
                                        <td>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Password:</td>
                                        <td>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <br />
                                            <button id="submit" type="submit">
                                                Sign Up
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
                    <div className="slideUp" style={{ color: "white", borderRadius: "25px", textAlign: "center" }}>
                        <br />
                        <p>Already have an account? <Link to="/Login">Click</Link> to Log In.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
