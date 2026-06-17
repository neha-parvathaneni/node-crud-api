const { getPool, sql } = require("../config/db");


const execute = async (requestOrPool, query, params = []) => {
    const request = requestOrPool.request ? requestOrPool.request() : requestOrPool;
    for (const { name, type, value } of params) {
        request.input(name, type, value);
    }
    return request.query(query);
};


const createStudent = async (data) => {
    const pool = getPool();
    const transaction = new sql.Transaction(pool);

    try {
        await transaction.begin();

        const userResult = await execute(
            new sql.Request(transaction),
            `INSERT INTO [User] (Name, Age, Email) OUTPUT INSERTED.Id VALUES (@Name, @Age, @Email)`,
            [
                { name: "Name",  type: sql.NVarChar, value: data.name },
                { name: "Age",   type: sql.Int,      value: parseInt(data.age) },
                { name: "Email", type: sql.NVarChar, value: data.email },
            ]
        );

        const userId = userResult.recordset[0].Id;

        await execute(
            new sql.Request(transaction),
            `INSERT INTO Student (UserId) VALUES (@UserId)`,
            [{ name: "UserId", type: sql.Int, value: userId }]
        );

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
        await transaction.begin();

        const userResult = await execute(
            new sql.Request(transaction),
            `INSERT INTO [User] (Name, Age, Email) OUTPUT INSERTED.Id VALUES (@Name, @Age, @Email)`,
            [
                { name: "Name",  type: sql.NVarChar, value: data.name },
                { name: "Age",   type: sql.Int,      value: parseInt(data.age) },
                { name: "Email", type: sql.NVarChar, value: data.email },
            ]
        );

        const userId = userResult.recordset[0].Id;

        await execute(
            new sql.Request(transaction),
            `INSERT INTO Teacher (UserId) VALUES (@UserId)`,
            [{ name: "UserId", type: sql.Int, value: userId }]
        );

        await transaction.commit();
        return { message: "Teacher created", userId };

    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};


const createCourse = async (data) => {
    await execute(
        getPool(),
        `INSERT INTO Course (Code, Title, Credits) VALUES (@Code, @Title, @Credits)`,
        [
            { name: "Code",    type: sql.NVarChar, value: data.code },
            { name: "Title",   type: sql.NVarChar, value: data.title },
            { name: "Credits", type: sql.Int,      value: parseInt(data.credits) },
        ]
    );

    return { message: "Course created" };
};


const enrollStudent = async (studentId, courseId) => {
    const params = [
        { name: "StudentId", type: sql.Int, value: studentId },
        { name: "CourseId",  type: sql.Int, value: courseId },
    ];

    const existing = await execute(
        getPool(),
        `SELECT * FROM StudentCourse WHERE StudentId = @StudentId AND CourseId = @CourseId`,
        params
    );

    if (existing.recordset.length) {
        throw new Error("Student already enrolled");
    }

    await execute(
        getPool(),
        `INSERT INTO StudentCourse (StudentId, CourseId) VALUES (@StudentId, @CourseId)`,
        params
    );

    return { message: "Enrollment successful" };
};


const assignTeacher = async (teacherId, courseId) => {
    await execute(
        getPool(),
        `UPDATE Course SET TeacherId = @TeacherId WHERE Id = @CourseId`,
        [
            { name: "TeacherId", type: sql.Int, value: teacherId },
            { name: "CourseId",  type: sql.Int, value: courseId },
        ]
    );

    return { message: "Teacher assigned" };
};

const getStudents = async () => {
    const result = await execute(getPool(), `
        SELECT
            s.Id    AS _id,
            u.Name  AS name,
            u.Age   AS age,
            u.Email AS email
        FROM Student s
        JOIN [User] u ON s.UserId = u.Id
    `);

    return result.recordset;
};

const getTeachers = async () => {
    const result = await execute(getPool(), `
        SELECT
            t.Id    AS _id,
            u.Name  AS name,
            u.Age   AS age,
            u.Email AS email
        FROM Teacher t
        JOIN [User] u ON t.UserId = u.Id
    `);

    return result.recordset;
};

const getCourses = async () => {
    const result = await execute(getPool(), `
        SELECT
            c.Id      AS _id,
            c.Code    AS code,
            c.Title   AS title,
            c.Credits AS credits,
            u.Name    AS teacherName,
            COUNT(sc.StudentId) AS studentCount
        FROM Course c
        LEFT JOIN Teacher t        ON c.TeacherId = t.Id
        LEFT JOIN [User]  u        ON t.UserId    = u.Id
        LEFT JOIN StudentCourse sc ON sc.CourseId = c.Id
        GROUP BY c.Id, c.Code, c.Title, c.Credits, u.Name
    `);

    return result.recordset;
};

module.exports = {
    createStudent,
    createTeacher,
    createCourse,
    enrollStudent,
    assignTeacher,
    getStudents,
    getTeachers,
    getCourses
};