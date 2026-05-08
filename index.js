require("dotenv").config();
const express = require("express");
const app = express();
const postRoutes = require("./routes/posts");
app.use(express.json());
app.use("/api", postRoutes);
const PORT = process.env.PORT;
<<<<<<< Updated upstream
=======
const connectDB  = require("./config/db");
connectDB();
>>>>>>> Stashed changes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to the CRUD API");
});
//PR demo change