const express = require("express");
const router = express.Router();

const {
    createStudent,
    createTeacher,
    createCourse,
    enrollStudent,
    assignTeacher,
    getStudents,
    getTeachers,
    getCourses
} = require("../controllers");


router.post("/students", createStudent);
router.post("/teachers", createTeacher);
router.post("/courses", createCourse);
router.post("/student-courses", enrollStudent);  
router.put("/courses/assign-teacher", assignTeacher);
router.get("/students", getStudents);
router.get("/teachers", getTeachers);
router.get("/courses", getCourses);

module.exports = router;