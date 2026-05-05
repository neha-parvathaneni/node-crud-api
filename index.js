require("dotenv").config();
const express = require("express");
const app = express();

const studentRoutes = require("./routes");
const sequelize = require("./config/sequelize");

app.use(express.json());
app.use("/api", studentRoutes);

// Sequelize connection
sequelize.authenticate()
    .then(() => console.log("Sequelize connected"))
    .catch(err => console.error("DB connection failed:", err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the CRUD API (Sequelize)");
});