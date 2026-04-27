const express= require("express");
const app= express();
const postRoutes= require("./routes/postRoutes");
app.use(express.json());
app.use("/api", postRoutes);
const PORT= 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});
//PR demo change