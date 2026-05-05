const { getPool } = require("../config/db");
//const sql = require("mssql");

// GET ALL
const getStudents = async () => {
    const pool = getPool();
    return await pool.request().query("SELECT * FROM Students");
};

// GET ONE
const getStudentById = async (id) => {
    const pool = getPool();
    return await pool.request()
        .input("id", id)
        .query("SELECT * FROM Students WHERE Id = @id");
};

// CREATE
const createStudent = async (data) => {
    const pool = getPool();
    const { Name, Age, Class } = data;

    return await pool.request()
        .input("Name", Name)
        .input("Age", Age)
        .input("Class", Class)
        .query(`
            INSERT INTO Students (Name, Age, Class)
            VALUES (@Name, @Age, @Class)
        `);
};

// UPDATE
const updateStudent = async (id, data) => {
    const pool = getPool();
    const { Name, Age, Class } = data;

    const result = await pool.request()
        .input("id",  id)
        .input("Name",  Name)
        .input("Age",  Age)
        .input("Class",  Class)
        .query(`
            UPDATE Students
            SET Name=@Name, Age=@Age, Class=@Class
            WHERE Id=@id
        `);

    console.log("Rows affected:", result.rowsAffected);

    return result;
};

// DELETE
const deleteStudent = async (id) => {
    const pool = getPool();

    return await pool.request()
        .input("id", id)
        .query("DELETE FROM Students WHERE Id=@id");
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};