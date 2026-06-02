import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Teachers from "./Teachers";
import { createTeacher, getTeachers } from "../services/api";

jest.mock("../services/api", () => ({
  createTeacher: jest.fn(),
  getTeachers: jest.fn()
}));

describe("Teachers component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it("loads teachers on mount", async () => {
    getTeachers.mockResolvedValue({
      data: [{ _id: 1, name: "Ravi", age: 35, email: "ravi@example.com" }]
    });

    render(<Teachers />);

    expect(await screen.findByText("Ravi")).toBeInTheDocument();
    expect(screen.getByText("ravi@example.com")).toBeInTheDocument();
  });

  it("creates teacher and resets form", async () => {
    getTeachers.mockResolvedValue({ data: [] });
    createTeacher.mockResolvedValue({ data: { message: "Teacher created" } });

    render(<Teachers />);

    const nameInput = screen.getByPlaceholderText("Name");
    const ageInput = screen.getByPlaceholderText("Age");
    const emailInput = screen.getByPlaceholderText("Email");

    fireEvent.change(nameInput, { target: { value: "Mina" } });
    fireEvent.change(ageInput, { target: { value: "40" } });
    fireEvent.change(emailInput, { target: { value: "mina@example.com" } });

    fireEvent.click(screen.getByText("Add Teacher"));

    await waitFor(() => {
      expect(createTeacher).toHaveBeenCalledWith({
        name: "Mina",
        age: "40",
        email: "mina@example.com"
      });
    });

    await waitFor(() => {
      expect(nameInput.value).toBe("");
      expect(ageInput.value).toBe("");
      expect(emailInput.value).toBe("");
    });
    expect(window.alert).toHaveBeenCalledWith("Teacher Created");
  });
});
