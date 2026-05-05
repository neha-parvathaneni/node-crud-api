const sql = require("mssql");
require("dotenv").config();
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool;

const connectDB = async () => {
    try {
        pool = await sql.connect(config);
        console.log("Connected to SQL Server");
    } catch (err) {
        console.error("DB Connection Failed:", err);
    }
};

const getPool = () => {
    if (!pool) throw new Error("No DB connection");
    return pool;
};

module.exports = { sql, connectDB, getPool };