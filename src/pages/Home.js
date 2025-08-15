import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import stockerLogo from "../assets/Stocker.png";
import bgCircuit from "../assets/bgcircuit.png";
// Adjust path as needed

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <br />
      <br />
      <div className="row header">
        <div className="col-md-9">
          <div className="box" style={{ width: "20%", cursor: "pointer" }} onClick={() => navigate("/")}>
            Stocker
          </div>
        </div>
        
      </div>

      <br />
      <br />
      <br />
      <div className="main" style={{ backgroundImage: `url(${bgCircuit})` }}>
        <div className="slideLeft">
          <br />
          {/*<br />
          <br />*/}
          <br />
          <br />
          <img src={stockerLogo} alt="Stocker" className="logo" />
        </div>
        <div className="slideRight">Stalk your Stocks</div>
      </div>

      <br />
      <div className="row">
        <div className="col">
          <div className="panel">
            <i className="fa fa-newspaper-o fa-2x"></i>
            <p>One-click destination to know real-time prices of all your favorite stocks.</p>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <i className="fa fa-globe fa-2x"></i>
            <p>Access and monitor all types of ticker symbols around the globe.</p>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <i className="fa fa-thumbs-o-up fa-2x"></i>
            <p>Pick from the Market tab and monitor under the Stocks tab.</p>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <i className="fa fa-refresh fa-2x"></i>
            <p>Data updates frequently to cover all market fluctuations.</p>
          </div>
        </div>
      </div>

      <br />
      <div className="description">
        <p>
          Welcome to <b className="highlight">Stocker</b>, your ultimate destination for tracking the latest stock prices!
        </p>
        <p>
          We understand that keeping track of your favorite stocks can be a <b className="highlight">hassle</b>, which is why we designed our platform for easy monitoring.
        </p>
      </div>

      {/*<hr />
      <div className="footer">
        <img src={stockerLogo} alt="Stocker" className="footer-logo" onClick={() => navigate("/")} />
      </div>*/}
    </div>
  );
};

export default Home;
