import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Search from "./Search";

describe("Search Component", () => {
  it("renders correctly", () => {
    render(<Search onSearch={() => {}} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls onSearch when input value changes", () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "hello" } });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("hello");
  });

  it("updates input value when typed", () => {
    render(<Search onSearch={() => {}} />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(input).toHaveValue("test query");
  });

  it("displays the search icon", () => {
    render(<Search onSearch={() => {}} />);

    const icon = screen.getByAltText("search-icon.svg");
    expect(icon).toBeInTheDocument();
  });
});
