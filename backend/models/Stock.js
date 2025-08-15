// Stock.js (Model)
const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    symbol: { type: String, required: true }, // Removed unique constraint
    price: { type: Number, required: true },
    changePercent: { type: Number, required: true, default: 0.00 },
    addedAt: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Stock", StockSchema);