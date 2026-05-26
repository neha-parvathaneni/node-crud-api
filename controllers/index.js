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
        // FIX: parse to integers — req.body values arrive as strings
        const studentId = parseInt(req.body.studentId);
        const courseId  = parseInt(req.body.courseId);

        if (isNaN(studentId) || isNaN(courseId)) {
            return res.status(400).json({ error: "studentId and courseId must be valid numbers" });
        }

        const result = await apiService.enrollStudent(studentId, courseId);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const assignTeacher = async (req, res) => {
    try {
        // FIX: parse to integers — req.body values arrive as strings
        const teacherId = parseInt(req.body.teacherId);
        const courseId  = parseInt(req.body.courseId);

        if (isNaN(teacherId) || isNaN(courseId)) {
            return res.status(400).json({ error: "teacherId and courseId must be valid numbers" });
        }

        const result = await apiService.assignTeacher(teacherId, courseId);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getStudents = async (req, res) => {
    try {
        const result = await apiService.getStudents();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTeachers = async (req, res) => {
    try {
        const result = await apiService.getTeachers();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const result = await apiService.getCourses();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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