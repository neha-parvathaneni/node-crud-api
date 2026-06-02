const apiService = require("../services/apiService");
const controllers = require("./index");

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

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("controllers unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createStudent returns success JSON", async () => {
    const req = { body: { name: "Neha", age: 22, email: "n@example.com" } };
    const res = createRes();

    apiService.createStudent.mockResolvedValue({ message: "Student created", userId: 1 });

    await controllers.createStudent(req, res);

    expect(apiService.createStudent).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ message: "Student created", userId: 1 });
  });

  it("createCourse returns success JSON", async () => {
    const req = { body: { code: "CS101", title: "Intro", credits: 3 } };
    const res = createRes();

    apiService.createCourse.mockResolvedValue({ message: "Course created" });

    await controllers.createCourse(req, res);

    expect(apiService.createCourse).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ message: "Course created" });
  });

  it("createTeacher returns success JSON", async () => {
    const req = { body: { name: "A", age: 30, email: "a@example.com" } };
    const res = createRes();

    apiService.createTeacher.mockResolvedValue({ message: "Teacher created", userId: 2 });

    await controllers.createTeacher(req, res);

    expect(apiService.createTeacher).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ message: "Teacher created", userId: 2 });
  });

  it("enrollStudent returns 400 for invalid numeric input", async () => {
    const req = { body: { studentId: "abc", courseId: "1" } };
    const res = createRes();

    await controllers.enrollStudent(req, res);

    expect(apiService.enrollStudent).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "studentId and courseId must be valid numbers"
    });
  });

  it("assignTeacher returns 400 for invalid numeric input", async () => {
    const req = { body: { teacherId: "1", courseId: "xyz" } };
    const res = createRes();

    await controllers.assignTeacher(req, res);

    expect(apiService.assignTeacher).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "teacherId and courseId must be valid numbers"
    });
  });

  it("enrollStudent parses ids and returns success", async () => {
    const req = { body: { studentId: "10", courseId: "5" } };
    const res = createRes();

    apiService.enrollStudent.mockResolvedValue({ message: "Enrollment successful" });

    await controllers.enrollStudent(req, res);

    expect(apiService.enrollStudent).toHaveBeenCalledWith(10, 5);
    expect(res.json).toHaveBeenCalledWith({ message: "Enrollment successful" });
  });

  it("assignTeacher parses ids and returns success", async () => {
    const req = { body: { teacherId: "2", courseId: "8" } };
    const res = createRes();

    apiService.assignTeacher.mockResolvedValue({ message: "Teacher assigned" });

    await controllers.assignTeacher(req, res);

    expect(apiService.assignTeacher).toHaveBeenCalledWith(2, 8);
    expect(res.json).toHaveBeenCalledWith({ message: "Teacher assigned" });
  });

  it("createTeacher returns 500 when service throws", async () => {
    const req = { body: { name: "A", age: 30, email: "a@example.com" } };
    const res = createRes();

    apiService.createTeacher.mockRejectedValue(new Error("DB fail"));

    await controllers.createTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB fail" });
  });

  it("getStudents returns list", async () => {
    const req = { body: {} };
    const res = createRes();

    apiService.getStudents.mockResolvedValue([{ _id: 1, name: "N" }]);

    await controllers.getStudents(req, res);

    expect(apiService.getStudents).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([{ _id: 1, name: "N" }]);
  });

  it("getTeachers returns list", async () => {
    const req = { body: {} };
    const res = createRes();

    apiService.getTeachers.mockResolvedValue([{ _id: 2, name: "T" }]);

    await controllers.getTeachers(req, res);

    expect(apiService.getTeachers).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([{ _id: 2, name: "T" }]);
  });

  it("getCourses returns list", async () => {
    const req = { body: {} };
    const res = createRes();

    apiService.getCourses.mockResolvedValue([{ _id: 1, title: "Course" }]);

    await controllers.getCourses(req, res);

    expect(apiService.getCourses).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([{ _id: 1, title: "Course" }]);
  });

  it("getCourses returns 500 when service throws", async () => {
    const req = { body: {} };
    const res = createRes();

    apiService.getCourses.mockRejectedValue(new Error("service failed"));

    await controllers.getCourses(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "service failed" });
  });
});
