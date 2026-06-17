import { fireEvent, render, screen } from "@testing-library/react";
import SelectComponent from "./SelectComponent";

describe("SelectComponent", () => {
  const options = [
    { _id: 1, name: "Neha" },
    { _id: 2, name: "Ravi" }
  ];

  it("renders default and mapped options", () => {
    render(
      <SelectComponent
        value=""
        onChange={() => {}}
        options={options}
        labelKey="name"
        valueKey="_id"
      />
    );

    expect(screen.getByRole("option", { name: "Select" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Neha" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Ravi" })).toBeInTheDocument();
  });

  it("calls onChange on selection", () => {
    const onChange = jest.fn();
    render(
      <SelectComponent
        value=""
        onChange={onChange}
        options={options}
        labelKey="name"
        valueKey="_id"
      />
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
