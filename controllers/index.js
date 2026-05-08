const {
    createStudent,
    createTeacher,
    createCourse,
    enrollStudent,
    assignTeacher
} = require("../services/apiService");

const createStudentController = async (req, res) => {

    try {

        const student = await createStudent(req.body);

        res.status(201).json(student);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const createTeacherController = async (req, res) => {

    try {

        const teacher = await createTeacher(req.body);

        res.status(201).json(teacher);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const createCourseController = async (req, res) => {

    try {

        const course = await createCourse(req.body);

        res.status(201).json(course);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const enrollStudentController = async (req, res) => {

    try {

        const { studentId, courseId } = req.body;

        const result = await enrollStudent(studentId, courseId);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const assignTeacherController = async (req, res) => {

    try {

        const { teacherId, courseId } = req.body;

        const result = await assignTeacher(teacherId, courseId);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    createStudentController,
    createTeacherController,
    createCourseController,
    enrollStudentController,
    assignTeacherController
};