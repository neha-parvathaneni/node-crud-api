import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import EnrollStudent from "./EnrollStudent";
import { enrollStudent, getStudents, getCourses } from "../services/api";

jest.mock("../services/api", () => ({
  enrollStudent: jest.fn(),
  getStudents: jest.fn(),
  getCourses: jest.fn()
}));

describe("EnrollStudent component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it("loads student and course options", async () => {
    getStudents.mockResolvedValue({ data: [{ _id: 1, name: "Neha" }] });
    getCourses.mockResolvedValue({ data: [{ _id: 11, title: "Math" }] });

    render(<EnrollStudent />);

    expect(await screen.findByRole("option", { name: "Neha" })).toBeInTheDocument();
    expect(await screen.findByRole("option", { name: "Math" })).toBeInTheDocument();
  });

  it("submits selected student and course", async () => {
    getStudents.mockResolvedValue({ data: [{ _id: 1, name: "Neha" }] });
    getCourses.mockResolvedValue({ data: [{ _id: 11, title: "Math" }] });
    enrollStudent.mockResolvedValue({ data: { message: "Enrollment successful" } });

    render(<EnrollStudent />);

    await screen.findByRole("option", { name: "Neha" });
    await screen.findByRole("option", { name: "Math" });

    const selects = await screen.findAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "1" } });
    fireEvent.change(selects[1], { target: { value: "11" } });

    fireEvent.click(screen.getByText("Enroll"));

    await waitFor(() => {
      expect(enrollStudent).toHaveBeenCalledWith({ studentId: "1", courseId: "11" });
    });

    expect(window.alert).toHaveBeenCalledWith("Student Enrolled");
    await waitFor(() => {
      expect(selects[0].value).toBe("");
      expect(selects[1].value).toBe("");
    });
  });
});
