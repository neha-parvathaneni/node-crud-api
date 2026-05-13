require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const postRoutes = require("./routes");
app.use(cors());
app.use(express.json());
app.use("/api", postRoutes);
const PORT = process.env.PORT;
const connectDB  = require("./config/db");
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to the CRUD API");
});
//PR demo change