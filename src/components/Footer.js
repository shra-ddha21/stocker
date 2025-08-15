// src/components/Footer.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import stockerLogo from "../assets/Stocker.png";
import secondHalf from "../assets/secondhalf.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ backgroundColor: "#17252A", color: "white" }}>
      <br />
      <br />
      <img src={secondHalf} width="100%" alt="Background" />
      <br />
      <hr style={{ border: "1px solid white" }} />
      <br />
      <div className="text-center" style={{ color: "#3AAFA9" }}>
      <img
          src={stockerLogo}
          style={{ cursor: "pointer", height: "5%", width: "12%" }}
          onClick={() => navigate("/stocks")}
          alt="Stocker Logo"
        />

        <br />
        <br />
      </div>
    </div>
  );
};

export default Footer;
