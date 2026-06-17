require("dotenv").config();
const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the CRUD API");
});

module.exports = app;
