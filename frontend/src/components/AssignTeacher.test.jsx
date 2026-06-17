import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AssignTeacher from "./AssignTeacher";
import { assignTeacher, getTeachers, getCourses } from "../services/api";

jest.mock("../services/api", () => ({
  assignTeacher: jest.fn(),
  getTeachers: jest.fn(),
  getCourses: jest.fn()
}));

describe("AssignTeacher component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it("loads teacher and course options", async () => {
    getTeachers.mockResolvedValue({ data: [{ _id: 2, name: "Ravi" }] });
    getCourses.mockResolvedValue({ data: [{ _id: 11, title: "Math" }] });

    render(<AssignTeacher />);

    expect(await screen.findByRole("option", { name: "Ravi" })).toBeInTheDocument();
    expect(await screen.findByRole("option", { name: "Math" })).toBeInTheDocument();
  });

  it("submits selected teacher and course", async () => {
    getTeachers.mockResolvedValue({ data: [{ _id: 2, name: "Ravi" }] });
    getCourses.mockResolvedValue({ data: [{ _id: 11, title: "Math" }] });
    assignTeacher.mockResolvedValue({ data: { message: "Teacher assigned" } });

    render(<AssignTeacher />);

    await screen.findByRole("option", { name: "Ravi" });
    await screen.findByRole("option", { name: "Math" });

    const selects = await screen.findAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "2" } });
    fireEvent.change(selects[1], { target: { value: "11" } });

    fireEvent.click(screen.getByRole("button", { name: "Assign Teacher" }));

    await waitFor(() => {
      expect(assignTeacher).toHaveBeenCalledWith({ teacherId: "2", courseId: "11" });
    });

    expect(window.alert).toHaveBeenCalledWith("Teacher Assigned");
    await waitFor(() => {
      expect(selects[0].value).toBe("");
      expect(selects[1].value).toBe("");
    });
  });
});
