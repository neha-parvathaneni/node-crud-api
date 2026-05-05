const apiService = require("../services/apiService");

// GET ALL
const getStudents = async (req, res) => {
    try {
        const result = await apiService.getStudents();
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ONE
const getStudent = async (req, res) => {
    try {
        const result = await apiService.getStudentById(req.params.id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE
const createStudent = async (req, res) => {
    try {
        await apiService.createStudent(req.body);
        res.send("Student created");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
const updateStudent = async (req, res) => {
    try {
        const existing = await apiService.getStudentById(req.params.id);

        if (!existing.recordset.length) {
            return res.status(404).send("Student not found");
        }

        const student = existing.recordset[0];

        const updatedData = {
            Name: req.body.Name ?? student.Name,
            Age: req.body.Age ?? student.Age,
            Class: req.body.Class ?? student.Class
        };

        await apiService.updateStudent(req.params.id, updatedData);

        res.send("Student updated");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
const deleteStudent = async (req, res) => {
    try {
        await apiService.deleteStudent(req.params.id);
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