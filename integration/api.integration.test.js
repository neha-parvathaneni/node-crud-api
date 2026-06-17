const request = require("supertest");

jest.mock("../services/apiService", () => ({
    createStudent: jest.fn(),
    createTeacher: jest.fn(),
    createCourse: jest.fn(),
    enrollStudent: jest.fn(),
    assignTeacher: jest.fn(),
    getStudents: jest.fn(),
    getTeachers: jest.fn(),
    getCourses: jest.fn()
}));

const apiService = require("../services/apiService");
const app = require("../app");

describe("API integration tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("GET / returns welcome message", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Welcome to the CRUD API");
    });

    it("GET /api/students returns students list", async () => {
        apiService.getStudents.mockResolvedValue([{ _id: 1, name: "Neha" }]);

        const response = await request(app).get("/api/students");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ _id: 1, name: "Neha" }]);
        expect(apiService.getStudents).toHaveBeenCalledTimes(1);
    });

    it("POST /api/students creates student", async () => {
        const payload = { name: "Asha", age: 21, email: "asha@example.com" };
        apiService.createStudent.mockResolvedValue({ message: "Student created", userId: 7 });

        const response = await request(app).post("/api/students").send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Student created", userId: 7 });
        expect(apiService.createStudent).toHaveBeenCalledWith(payload);
    });

    it("POST /api/student-courses returns 400 for invalid ids", async () => {
        const response = await request(app)
            .post("/api/student-courses")
            .send({ studentId: "abc", courseId: "5" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "studentId and courseId must be valid numbers" });
        expect(apiService.enrollStudent).not.toHaveBeenCalled();
    });

    it("POST /api/student-courses parses ids and enrolls", async () => {
        apiService.enrollStudent.mockResolvedValue({ message: "Enrollment successful" });

        const response = await request(app)
            .post("/api/student-courses")
            .send({ studentId: "10", courseId: "5" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Enrollment successful" });
        expect(apiService.enrollStudent).toHaveBeenCalledWith(10, 5);
    });

    it("PUT /api/courses/assign-teacher returns 400 for invalid ids", async () => {
        const response = await request(app)
            .put("/api/courses/assign-teacher")
            .send({ teacherId: "xyz", courseId: "2" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "teacherId and courseId must be valid numbers" });
        expect(apiService.assignTeacher).not.toHaveBeenCalled();
    });

    it("PUT /api/courses/assign-teacher parses ids and assigns", async () => {
        apiService.assignTeacher.mockResolvedValue({ message: "Teacher assigned" });

        const response = await request(app)
            .put("/api/courses/assign-teacher")
            .send({ teacherId: "3", courseId: "9" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Teacher assigned" });
        expect(apiService.assignTeacher).toHaveBeenCalledWith(3, 9);
    });

    it("GET /api/courses returns 500 when service throws", async () => {
        apiService.getCourses.mockRejectedValue(new Error("service failed"));

        const response = await request(app).get("/api/courses");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "service failed" });
    });
});
