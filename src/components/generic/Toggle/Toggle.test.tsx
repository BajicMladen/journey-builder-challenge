import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Toggle from "./Toggle";

describe("Toggle Component", () => {
  it("renders correctly", () => {
    render(<Toggle checked={false} handleChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("calls handleChange when clicked", () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} handleChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("is checked when the checked prop is true", () => {
    render(<Toggle checked={true} handleChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Toggle checked={false} disabled handleChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("does not call handleChange when disabled", () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} disabled handleChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });
});
