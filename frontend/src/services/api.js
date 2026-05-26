import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});


export const getStudents   = ()    => api.get("/students");
export const createStudent = (data) => api.post("/students", data);

export const getTeachers   = ()    => api.get("/teachers");
export const createTeacher = (data) => api.post("/teachers", data);


export const getCourses   = ()    => api.get("/courses");
export const createCourse = (data) => api.post("/courses", data);


export const enrollStudent = (data) => api.post("/student-courses", data);
export const assignTeacher = (data) => api.put("/courses/assign-teacher", data);