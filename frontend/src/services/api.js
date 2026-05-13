import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api"
});

export const createStudent = (data) =>
    API.post("/students", data);

export const createTeacher = (data) =>
    API.post("/teachers", data);

export const createCourse = (data) =>
    API.post("/courses", data);

export const enrollStudent = (data) =>
    API.post("/student-courses", data);

export const assignTeacher = (data) =>
    API.put("/courses/assign-teacher", data);

export const getStudents = () =>
    API.get("/students");

export const getTeachers = () =>
    API.get("/teachers");

export const getCourses = () =>
    API.get("/courses");