const Student = require("../models/Student");

// GET ALL
const getStudents = async () => {
    return await Student.findAll();
};

// GET ONE
const getStudentById = async (id) => {
    return await Student.findByPk(id);
};

// CREATE
const createStudent = async (data) => {
    return await Student.create(data);
};

// UPDATE
const updateStudent = async (id, data) => {
    const student = await Student.findByPk(id);

    if (!student) return null;

    return await student.update(data);
};

// DELETE
const deleteStudent = async (id) => {
    const student = await Student.findByPk(id);

    if (!student) return null;

    return await student.destroy();
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};