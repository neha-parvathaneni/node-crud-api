import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Students from "./Students";
import { createStudent, getStudents } from "../services/api";

jest.mock("../services/api", () => ({
  createStudent: jest.fn(),
  getStudents: jest.fn()
}));

describe("Students component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it("loads students on mount", async () => {
    getStudents.mockResolvedValue({
      data: [{ _id: 1, name: "Neha", age: 22, email: "n@example.com" }]
    });

    render(<Students />);

    expect(await screen.findByText("Neha")).toBeInTheDocument();
    expect(screen.getByText("n@example.com")).toBeInTheDocument();
  });

  it("creates student and resets form", async () => {
    getStudents.mockResolvedValue({ data: [] });
    createStudent.mockResolvedValue({ data: { message: "Student created" } });

    render(<Students />);

    const nameInput = screen.getByPlaceholderText("Name");
    const ageInput = screen.getByPlaceholderText("Age");
    const emailInput = screen.getByPlaceholderText("Email");

    fireEvent.change(nameInput, { target: { value: "Asha" } });
    fireEvent.change(ageInput, { target: { value: "21" } });
    fireEvent.change(emailInput, { target: { value: "asha@example.com" } });

    fireEvent.click(screen.getByText("Add Student"));

    await waitFor(() => {
      expect(createStudent).toHaveBeenCalledWith({
        name: "Asha",
        age: "21",
        email: "asha@example.com"
      });
    });

    await waitFor(() => {
      expect(nameInput.value).toBe("");
      expect(ageInput.value).toBe("");
      expect(emailInput.value).toBe("");
    });
    expect(window.alert).toHaveBeenCalledWith("Student Created");
  });
});
