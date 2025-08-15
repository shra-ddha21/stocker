import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import halfBgCircuit from "../assets/halfbgcircuit.png";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");  // Check if the user is logged in

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token to log out
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className="container" style={{ backgroundColor: "#17252A", color: "white" }}>
      <br />
      <br />
      <img src={halfBgCircuit} width="100%" alt="Background" />
      <div className="row text-center" style={{ fontSize: "22px", color: "#51f4ec" }}>
        {/* Home Button - Always Visible for all users */}
        <div className="col offset-md-5">
          <div
            className="slideUp"
            style={{ textAlign: "center", width: "70%", cursor: "pointer" }}
            onClick={() => handleNavigation("/")}
          >
            Home
          </div>
        </div>

        {/* Stocks Button */}
        <div className="col">
          <div
            className="slideUp"
            style={{ width: "75%", cursor: "pointer" }}
            onClick={() => handleNavigation("/stocks")}
          >
            Stocks
          </div>
        </div>

        {/* Market Button */}
        <div className="col">
          <div
            className="slideUp"
            style={{ width: "75%", cursor: "pointer" }}
            onClick={() => handleNavigation("/market")}
          >
            Market
          </div>
        </div>

        {/* Profile Button */}
        <div className="col">
          <div
            className="slideUp"
            style={{ width: "75%", cursor: "pointer" }}
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </div>
        </div>

        {/* Login and Sign Up options */}
        {!token ? (
          <>
            <div className="col">
              <div
                className="slideUp"
                style={{ width: "75%", cursor: "pointer" }}
                onClick={() => handleNavigation("/login")}
              >
                Login
              </div>
            </div>
            <div className="col">
              <div
                className="slideUp"
                style={{ width: "75%", cursor: "pointer" }}
                onClick={() => handleNavigation("/signup")}
              >
                Sign Up
              </div>
            </div>
          </>
        ) : (
          // If the user is logged in, show Logout
          <div className="col">
            <div
              className="slideUp"
              style={{ width: "75%", cursor: "pointer" }}
              onClick={handleLogout}
            >
              Log out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
