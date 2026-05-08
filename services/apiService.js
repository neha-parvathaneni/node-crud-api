const { getPool, sql } = require("../config/db");

const createStudent = async (data) => {
    const pool = getPool();
    const transaction = new sql.Transaction(pool);

    try {
        await transaction.begin();
        const request = new sql.Request(transaction);
        const userResult = await request
            .input("Name", sql.NVarChar, data.Name)
            .input("Age", sql.Int, data.Age)
            .input("Email", sql.NVarChar, data.Email)
            .query(`
                INSERT INTO [User] (Name, Age, Email)
                OUTPUT INSERTED.Id
                VALUES (@Name, @Age, @Email)
            `);

        const userId = userResult.recordset[0].Id;

        await request
            .input("UserId", sql.Int, userId)
            .query(`
                INSERT INTO Student (UserId)
                VALUES (@UserId)
            `);

        await transaction.commit();

        return { message: "Student created", userId };

    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};


const createTeacher = async (data) => {
    const pool = getPool();
    const transaction = new sql.Transaction(pool);

    try {

    const userResult = await pool.request()
        .input("Name", sql.NVarChar, data.Name)
        .input("Age", sql.Int, data.Age)
        .input("Email", sql.NVarChar, data.Email)
        .query(`
            INSERT INTO [User] (Name, Age, Email)
            OUTPUT INSERTED.Id
            VALUES (@Name, @Age, @Email)
        `);

    const userId = userResult.recordset[0].Id;

    await pool.request()
        .input("UserId", sql.Int, userId)
        .query(`
            INSERT INTO Teacher (UserId)
            VALUES (@UserId)
        `);

    await transaction.commit();

    return { message: "Teacher created", userId };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
};

const createCourse = async (data) => {
    const pool = getPool();

    await pool.request()
        .input("Code", sql.NVarChar, data.Code)
        .input("Title", sql.NVarChar, data.Title)
        .input("Credits", sql.Int, data.Credits)
        .query(`
            INSERT INTO Course (Code, Title, Credits)
            VALUES (@Code, @Title, @Credits)
        `);

    return { message: "Course created" };
};

const enrollStudent = async (studentId, courseId) => {
    const pool = getPool();

    const existing = await pool.request()
        .input("StudentId", sql.Int, studentId)
        .input("CourseId", sql.Int, courseId)
        .query(`
            SELECT * FROM StudentCourse
            WHERE StudentId=@StudentId AND CourseId=@CourseId
        `);

    if (existing.recordset.length) {
        throw new Error("Student already enrolled");
    }

    await pool.request()
        .input("StudentId", sql.Int, studentId)
        .input("CourseId", sql.Int, courseId)
        .query(`
            INSERT INTO StudentCourse (StudentId, CourseId)
            VALUES (@StudentId, @CourseId)
        `);

    return { message: "Enrollment successful" };
};


const assignTeacher = async (teacherId, courseId) => {
    const pool = getPool();

    await pool.request()
        .input("TeacherId", sql.Int, teacherId)
        .input("CourseId", sql.Int, courseId)
        .query(`
            UPDATE Course
            SET TeacherId=@TeacherId
            WHERE Id=@CourseId
        `);

    return { message: "Teacher assigned" };
};

module.exports = {
    createStudent,
    createTeacher,
    createCourse,
    enrollStudent,
    assignTeacher
};