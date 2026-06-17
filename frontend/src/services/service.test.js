import {
  resetAssignData,
  resetCourse,
  resetEnrollData,
  resetStudent,
  resetTeacher
} from "./service";

describe("form reset helpers", () => {
  it("returns blank student shape", () => {
    expect(resetStudent()).toEqual({ name: "", age: "", email: "" });
  });

  it("returns blank teacher shape", () => {
    expect(resetTeacher()).toEqual({ name: "", age: "", email: "" });
  });

  it("returns blank course shape", () => {
    expect(resetCourse()).toEqual({ code: "", title: "", credits: "" });
  });

  it("returns blank enroll shape", () => {
    expect(resetEnrollData()).toEqual({ studentId: "", courseId: "" });
  });

  it("returns blank assign shape", () => {
    expect(resetAssignData()).toEqual({ teacherId: "", courseId: "" });
  });
});
