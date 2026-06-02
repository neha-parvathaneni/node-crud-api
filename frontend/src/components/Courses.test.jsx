import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Courses from "./Courses";
import { createCourse, getCourses } from "../services/api";

jest.mock("../services/api", () => ({
  createCourse: jest.fn(),
  getCourses: jest.fn()
}));

describe("Courses component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it("loads and renders courses on mount", async () => {
    getCourses.mockResolvedValue({
      data: [
        {
          _id: 1,
          code: "CS101",
          title: "Intro CS",
          credits: 3,
          teacherName: null
        }
      ]
    });

    render(<Courses />);

    expect(await screen.findByText("CS101")).toBeInTheDocument();
    expect(screen.getByText("Intro CS")).toBeInTheDocument();
    expect(screen.getByText("Not Assigned")).toBeInTheDocument();
  });

  it("submits create course with numeric credits", async () => {
    getCourses.mockResolvedValue({ data: [] });
    createCourse.mockResolvedValue({ data: { message: "Course created" } });

    render(<Courses />);

    fireEvent.change(screen.getByPlaceholderText("Code"), {
      target: { value: "CS201" }
    });
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Data Structures" }
    });
    fireEvent.change(screen.getByPlaceholderText("Credits"), {
      target: { value: "4" }
    });

    fireEvent.click(screen.getByText("Add Course"));

    await waitFor(() => {
      expect(createCourse).toHaveBeenCalledWith({
        code: "CS201",
        title: "Data Structures",
        credits: 4
      });
    });

    expect(window.alert).toHaveBeenCalledWith("Course Created");
  });
});
