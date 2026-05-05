const apiService = require("../services/apiService");

// GET ALL
const getStudents = async (req, res) => {
    try {
        const result = await apiService.getStudents();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ONE
const getStudent = async (req, res) => {
    try {
        const result = await apiService.getStudentById(req.params.id);

        if (!result) {
            return res.status(404).send("Student not found");
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE
const createStudent = async (req, res) => {
    try {
        const student = await apiService.createStudent(req.body);
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
const updateStudent = async (req, res) => {
    try {
        const updated = await apiService.updateStudent(req.params.id, req.body);

        if (!updated) {
            return res.status(404).send("Student not found");
        }

        res.send("Student updated");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
const deleteStudent = async (req, res) => {
    try {
        const deleted = await apiService.deleteStudent(req.params.id);

        if (!deleted) {
            return res.status(404).send("Student not found");
        }

        res.send("Student deleted");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};