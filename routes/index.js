const express = require("express");

const {
    createStudentController,
    createTeacherController,
    createCourseController,
    enrollStudentController,
    assignTeacherController
} = require("../controllers");

const router = express.Router();

router.post("/students", createStudentController);
router.post("/teachers", createTeacherController);
router.post("/courses", createCourseController);
router.post("/student-courses", enrollStudentController);
router.put("/courses/assign-teacher", assignTeacherController);

module.exports = router;