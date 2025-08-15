import React, { useState, useEffect } from "react";
import "./Stocks.css";

const Stocks = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from local storage
                if (!token) {
                    console.error("No token found. Redirecting to login.");
                    // Optionally, redirect to login page
                    return;
                }

                const response = await fetch("http://localhost:5000/api/stocks/all", {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include token in header
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setStocks(data);
            } catch (error) {
                console.error("Error fetching stocks:", error);
            }
        };

        fetchStocks();
    }, []);

    return (
        <div className="container">
            <br />
            <br />
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="slideUp" id="main">
                        <h2>Your Stocks</h2>
                        <br />
                        <br />
                        {stocks.length > 0 ? (
                            <>
                                <div className="row header-row">
                                    <div className="col">Ticker Symbol</div>
                                    <div className="col">Price</div>
                                    <div className="col">Change %</div>
                                </div>
                                <br />
                                {stocks.map((stock) => (
                                    <div key={stock._id} className="slideLeft" id="panel">
                                        <div className="row">
                                            <div className="col">{stock.symbol}</div>
                                            <div className="col">${stock.price.toFixed(2)}</div>
                                            <div className="col">{stock.changePercent.toFixed(2)}%</div>
                                        </div>
                                    </div>
                                ))}
                                <br />
                            </>
                        ) : (
                            <div>
                                You are yet to select stocks to track.<br />
                                <i className="fa fa-rocket fa-2x rocket-icon" aria-hidden="true"></i>
                                Head to Market Place to add stocks.<br />
                                <br />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Stocks;