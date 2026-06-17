import { fireEvent, render, screen } from "@testing-library/react";
import InputComponent from "./InputComponent";

describe("InputComponent", () => {
  it("renders input with placeholder and value", () => {
    render(
      <InputComponent placeholder="Name" value="Neha" onChange={() => {}} />
    );

    expect(screen.getByPlaceholderText("Name")).toHaveValue("Neha");
  });

  it("calls onChange when typing", () => {
    const onChange = jest.fn();
    render(<InputComponent placeholder="Age" value="" onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "23" }
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
