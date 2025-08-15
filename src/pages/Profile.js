import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            console.log("Token found:", token); // Debugging step

            if (!token) {
                console.log("No token found. Redirecting to login.");
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get("http://localhost:5000/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("User data received:", res.data); // Debugging step
                setUserData(res.data);
                setFormData({
                    name: res.data.name || "",
                    email: res.data.email || "",
                    password: "",
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
                setMessage("Session expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const toggleEdit = () => setShowEdit(!showEdit);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            console.log("Submitting update with token:", token);

            const res = await axios.put(
                "http://localhost:5000/api/profile",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Profile update response:", res.data);
            setUserData(res.data);
            setShowEdit(false);
            setMessage("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
            setMessage("Failed to update profile. Try again.");
        }
    };

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <div className="profile-box slideUp">
                <h2>User Profile</h2>
                <table className="profile-table">
                    <tbody>
                        {/*<tr>
                            <td className="label">User ID:</td>
                            <td className="value">{userData._id}</td>
                        </tr>*/}
                        <tr>
                            <td className="label">Name:</td>
                            <td className="value">{userData.name}</td>
                        </tr>
                        <tr>
                            <td className="label">Email:</td>
                            <td className="value">{userData.email}</td>
                        </tr>
                        <tr>
                            <td className="label">Joined On:</td>
                            <td className="value">{new Date(userData.createdAt).toLocaleDateString()}</td>

                        </tr>
                        <tr>
                            <td colSpan="2" className="btn-center">
                                <button className="btn-action" onClick={toggleEdit}>Edit Profile</button>
                                <button className="btn-action" onClick={handleLogout}>Log out</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {showEdit && (
                <div className="edit-profile slideUp">
                    <h3>Edit Info</h3>
                    <form onSubmit={handleSubmit}>
                        <table className="profile-table">
                            <tbody>
                                <tr>
                                    <td className="label">Name:</td>
                                    <td className="value">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Email ID:</td>
                                    <td className="value">
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
                                    <td className="label">Password:</td>
                                    <td className="value">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="btn-center">
                                        <button className="btn-action" type="submit">Submit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            )}

            {message && (
                <div className="message-box slideUp">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Profile;
