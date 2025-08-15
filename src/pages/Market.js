import React, { useState } from "react";
import "./Market.css"; // Styling ke liye

const Market = () => {
    const [symbol, setSymbol] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [showInfo, setShowInfo] = useState(false);

    const handleToggle = () => {
        setShowInfo(!showInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!symbol) {
            setMessage({ text: "Please enter a stock ticker symbol.", type: "error" });
            return;
        }

        try {
            const token = localStorage.getItem("token"); // Get token from local storage
            if (!token) {
                setMessage({ text: "Please log in to add stocks.", type: "error" });
                return;
            }

            const response = await fetch("http://localhost:5000/api/stocks/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Include token in header
                },
                body: JSON.stringify({ symbol }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage({ text: data.message, type: "success" });
            } else {
                setMessage({ text: data.message, type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Error adding stock.", type: "error" });
        }

        setSymbol("");
    };

    return (
        <div className="container">
            <br />
            <div className="box">
                <h2>Market</h2>
                <p>Enter the stock ticker symbol below and add it to your stocklist.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="Ticker Symbol"
                        required
                    />
                    <br /><br />
                    <button type="submit" id="submit">Add to stocklist</button>
                </form>
                {message.text && (
                    <div className={message.type === "success" ? "success" : "error"}>
                        {message.text}
                    </div>
                )}
            </div>

            <br />
            <div className="box">
                <p>Don't know the ticker symbol? <a href="https://www.investing.com/" target="_blank" rel="noopener noreferrer">Search Here</a></p>
                <button onClick={handleToggle} id="submit">Toggle Info</button>
            </div>

            {showInfo && (
                <div className="info-box">
                    <p><b>What is a ticker symbol?</b></p>
                    <p>A stock ticker symbol is a <span className="highlight">unique series of letters</span> representing a publicly traded company.</p>
                    <p>Example: Apple Inc. → <span className="highlight">AAPL</span></p>
                </div>
            )}
        </div>
    );
};

export default Market;