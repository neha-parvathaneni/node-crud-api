const apiService = require("../services/apiService");

const createStudent = async (req, res) => {
    try {
        const result = await apiService.createStudent(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTeacher = async (req, res) => {
    try {
        const result = await apiService.createTeacher(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createCourse = async (req, res) => {
    try {
        const result = await apiService.createCourse(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const enrollStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const result = await apiService.enrollStudent(studentId, courseId);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const assignTeacher = async (req, res) => {
    try {
        const { teacherId, courseId } = req.body;
        const result = await apiService.assignTeacher(teacherId, courseId);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createStudent,
    createTeacher,
    createCourse,
    enrollStudent,
    assignTeacher
};