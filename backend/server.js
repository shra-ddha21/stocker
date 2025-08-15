require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");  // ✅ Import profile routes

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);  // ✅ Add profile routes

app.use("/api/stocks", require("./routes/stocks"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
