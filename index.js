require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const studentRoutes = require("./routes");

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);

const PORT = process.env.PORT;

const { connectDB } = require("./config/db");

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the CRUD API");
});