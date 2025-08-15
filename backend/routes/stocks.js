// stocks.js (Routes)
const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");

// Fetch stock price from Alpha Vantage API
const fetchStockData = async (symbol) => {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: "GLOBAL_QUOTE",
                symbol: symbol,
                apikey: process.env.ALPHA_VANTAGE_API_KEY,
            },
        });

        const stockData = response.data["Global Quote"];
        return {
            price: parseFloat(stockData["05. price"]),
            changePercent: parseFloat(stockData["10. change percent"]) || 0.00,
        };
    } catch (error) {
        //console.error("Error fetching stock data:", error);
        return null;
    }
};

// Route 1: Add a stock
router.post("/add", authMiddleware, async (req, res) => {
    const { symbol } = req.body;
    const userId = req.user.userId;

    if (!symbol) return res.status(400).json({ message: "Stock symbol is required." });

    const stockInfo = await fetchStockData(symbol);
    if (!stockInfo) return res.status(500).json({ message: "Failed to fetch stock data." });
    
    //console.log(stockInfo)
    try {
        //console.log(req.user);
        let stock = await Stock.findOne({ symbol: symbol, userId: userId }); // Corrected line
        if (stock) {
            return res.status(400).json({ message: "Stock already added by this user." });
        }

        stock = new Stock({
            symbol,
            price: stockInfo.price,
            changePercent: stockInfo.changePercent,
            userId: userId,
        });

        await stock.save();
        res.json({ message: "Stock added successfully!", stock });
    } catch (error) {
        //console.error(error)
        res.status(500).json({ message: "Error adding stock.", error });
    }
});

// Route 2: Get all stocks for the logged in user
router.get("/all", authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    try {
        const stocks = await Stock.find({ userId: userId });
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stocks.", error });
    }
});

module.exports = router;