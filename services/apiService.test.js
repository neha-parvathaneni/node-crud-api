const mockGetPool = jest.fn();

const mockSql = {
  Int: "Int",
  NVarChar: "NVarChar",
  Transaction: jest.fn(),
  Request: jest.fn()
};

jest.mock("../config/db", () => ({
  getPool: mockGetPool,
  sql: mockSql
}));

const apiService = require("./apiService");

const makeRequest = () => ({
  input: jest.fn().mockReturnThis(),
  query: jest.fn()
});

describe("apiService unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createStudent commits transaction and returns inserted userId", async () => {
    const pool = { request: jest.fn() };
    const tx = {
      begin: jest.fn().mockResolvedValue(),
      commit: jest.fn().mockResolvedValue(),
      rollback: jest.fn().mockResolvedValue()
    };

    const req1 = makeRequest();
    req1.query.mockResolvedValueOnce({ recordset: [{ Id: 10 }] });
    const req2 = makeRequest();
    req2.query.mockResolvedValueOnce({});

    mockGetPool.mockReturnValue(pool);
    mockSql.Transaction.mockImplementation(() => tx);
    mockSql.Request
      .mockImplementationOnce(() => req1)
      .mockImplementationOnce(() => req2);

    const result = await apiService.createStudent({
      name: "Neha",
      age: "22",
      email: "n@example.com"
    });

    expect(tx.begin).toHaveBeenCalledTimes(1);
    expect(req1.input).toHaveBeenCalledWith("Name", "NVarChar", "Neha");
    expect(req1.input).toHaveBeenCalledWith("Age", "Int", 22);
    expect(req1.input).toHaveBeenCalledWith("Email", "NVarChar", "n@example.com");
    expect(tx.commit).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ message: "Student created", userId: 10 });
  });

  it("createStudent rolls back transaction on failure", async () => {
    const pool = { request: jest.fn() };
    const tx = {
      begin: jest.fn().mockResolvedValue(),
      commit: jest.fn().mockResolvedValue(),
      rollback: jest.fn().mockResolvedValue()
    };

    const req1 = makeRequest();
    req1.query.mockRejectedValueOnce(new Error("insert fail"));

    mockGetPool.mockReturnValue(pool);
    mockSql.Transaction.mockImplementation(() => tx);
    mockSql.Request.mockImplementationOnce(() => req1);

    await expect(
      apiService.createStudent({ name: "A", age: "20", email: "a@example.com" })
    ).rejects.toThrow("insert fail");

    expect(tx.rollback).toHaveBeenCalledTimes(1);
    expect(tx.commit).not.toHaveBeenCalled();
  });

  it("createTeacher commits transaction and returns inserted userId", async () => {
    const pool = { request: jest.fn() };
    const tx = {
      begin: jest.fn().mockResolvedValue(),
      commit: jest.fn().mockResolvedValue(),
      rollback: jest.fn().mockResolvedValue()
    };

    const req1 = makeRequest();
    req1.query.mockResolvedValueOnce({ recordset: [{ Id: 20 }] });
    const req2 = makeRequest();
    req2.query.mockResolvedValueOnce({});

    mockGetPool.mockReturnValue(pool);
    mockSql.Transaction.mockImplementation(() => tx);
    mockSql.Request
      .mockImplementationOnce(() => req1)
      .mockImplementationOnce(() => req2);

    const result = await apiService.createTeacher({
      name: "Ravi",
      age: "35",
      email: "r@example.com"
    });

    expect(tx.commit).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ message: "Teacher created", userId: 20 });
  });

  it("createCourse inserts new course", async () => {
    const req = makeRequest();
    req.query.mockResolvedValueOnce({});
    const pool = { request: jest.fn().mockReturnValue(req) };

    mockGetPool.mockReturnValue(pool);

    const result = await apiService.createCourse({
      code: "CS101",
      title: "Intro",
      credits: "3"
    });

    expect(req.input).toHaveBeenCalledWith("Credits", "Int", 3);
    expect(req.query).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ message: "Course created" });
  });

  it("enrollStudent throws when already enrolled", async () => {
    const req = makeRequest();
    req.query.mockResolvedValueOnce({ recordset: [{ Id: 1 }] });
    const pool = { request: jest.fn().mockReturnValue(req) };

    mockGetPool.mockReturnValue(pool);

    await expect(apiService.enrollStudent(1, 2)).rejects.toThrow("Student already enrolled");
    expect(pool.request).toHaveBeenCalledTimes(1);
  });

  it("enrollStudent inserts when not already enrolled", async () => {
    const req1 = makeRequest();
    req1.query.mockResolvedValueOnce({ recordset: [] });
    const req2 = makeRequest();
    req2.query.mockResolvedValueOnce({});
    const pool = {
      request: jest.fn().mockReturnValueOnce(req1).mockReturnValueOnce(req2)
    };

    mockGetPool.mockReturnValue(pool);

    const result = await apiService.enrollStudent(1, 2);

    expect(pool.request).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ message: "Enrollment successful" });
  });

  it("assignTeacher updates course teacher", async () => {
    const req = makeRequest();
    req.query.mockResolvedValueOnce({});
    const pool = { request: jest.fn().mockReturnValue(req) };

    mockGetPool.mockReturnValue(pool);

    const result = await apiService.assignTeacher(5, 9);

    expect(req.input).toHaveBeenCalledWith("TeacherId", "Int", 5);
    expect(req.input).toHaveBeenCalledWith("CourseId", "Int", 9);
    expect(result).toEqual({ message: "Teacher assigned" });
  });

  it("getStudents returns recordset", async () => {
    const req = makeRequest();
    req.query.mockResolvedValueOnce({ recordset: [{ _id: 1, name: "Neha" }] });
    const pool = { request: jest.fn().mockReturnValue(req) };

    mockGetPool.mockReturnValue(pool);

    await expect(apiService.getStudents()).resolves.toEqual([{ _id: 1, name: "Neha" }]);
  });

  it("getTeachers returns recordset", async () => {
    const req = makeRequest();
    req.query.mockResolvedValueOnce({ recordset: [{ _id: 2, name: "Ravi" }] });
    const pool = { request: jest.fn().mockReturnValue(req) };

    mockGetPool.mockReturnValue(pool);

    await expect(apiService.getTeachers()).resolves.toEqual([{ _id: 2, name: "Ravi" }]);
  });

  it("getCourses returns recordset", async () => {
    const req = makeRequest();
    req.query.mockResolvedValueOnce({ recordset: [{ _id: 10, title: "Math" }] });
    const pool = { request: jest.fn().mockReturnValue(req) };

    mockGetPool.mockReturnValue(pool);

    await expect(apiService.getCourses()).resolves.toEqual([{ _id: 10, title: "Math" }]);
  });
});
