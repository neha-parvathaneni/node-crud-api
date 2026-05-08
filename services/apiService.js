const User = require("../models/User");
const Course = require("../models/Course");

const createStudent = async (data) => {

    const student = await User.create({
        name: data.name,
        age: data.age,
        email: data.email,
        role: "student"
    });

    return student;
};

const createTeacher = async (data) => {

    const teacher = await User.create({
        name: data.name,
        age: data.age,
        email: data.email,
        role: "teacher"
    });

    return teacher;
};

const createCourse = async (data) => {

    const course = await Course.create({
        code: data.code,
        title: data.title,
        credits: data.credits
    });

    return course;
};

const enrollStudent = async (studentId, courseId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if (course.students.includes(studentId)) {
        throw new Error("Student already enrolled");
    }

    course.students.push(studentId);

    await course.save();

    return {
        message: "Enrollment successful"
    };
};

const assignTeacher = async (teacherId, courseId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    course.teacher = teacherId;

    await course.save();

    return {
        message: "Teacher assigned"
    };
};

module.exports = {
    createStudent,
    createTeacher,
    createCourse,
    enrollStudent,
    assignTeacher
};