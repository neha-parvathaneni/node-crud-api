import axios from "axios";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn()
  }))
}));

import {
  assignTeacher,
  createCourse,
  createStudent,
  createTeacher,
  enrollStudent,
  getCourses,
  getStudents,
  getTeachers
} from "./api";

describe("api service wrappers", () => {
  const client = axios.create.mock.results[0].value;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls get students endpoint", () => {
    getStudents();
    expect(client.get).toHaveBeenCalledWith("/students");
  });

  it("calls create student endpoint", () => {
    const payload = { name: "A" };
    createStudent(payload);
    expect(client.post).toHaveBeenCalledWith("/students", payload);
  });

  it("calls get teachers endpoint", () => {
    getTeachers();
    expect(client.get).toHaveBeenCalledWith("/teachers");
  });

  it("calls create teacher endpoint", () => {
    const payload = { name: "T" };
    createTeacher(payload);
    expect(client.post).toHaveBeenCalledWith("/teachers", payload);
  });

  it("calls get courses endpoint", () => {
    getCourses();
    expect(client.get).toHaveBeenCalledWith("/courses");
  });

  it("calls create course endpoint", () => {
    const payload = { title: "Math" };
    createCourse(payload);
    expect(client.post).toHaveBeenCalledWith("/courses", payload);
  });

  it("calls enroll student endpoint", () => {
    const payload = { studentId: 1, courseId: 2 };
    enrollStudent(payload);
    expect(client.post).toHaveBeenCalledWith("/student-courses", payload);
  });

  it("calls assign teacher endpoint", () => {
    const payload = { teacherId: 1, courseId: 2 };
    assignTeacher(payload);
    expect(client.put).toHaveBeenCalledWith("/courses/assign-teacher", payload);
  });
});
