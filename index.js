require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes");

const app = express();

app.use(express.json());

connectDB();

app.use("/api", studentRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to MongoDB CRUD API");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});