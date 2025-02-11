import { render, screen } from "@testing-library/react";
import { vi, it, describe, expect } from "vitest";
import { ReactFlowProvider } from "reactflow";
import FormNode from "./FormNode";

vi.mock("../../assets", () => ({
  FormIcon: "mocked-icon.svg",
}));

describe("FormNode Component", () => {
  const mockData = { label: "Test Form" };

  it("renders with the correct label", () => {
    render(
      <ReactFlowProvider>
        <FormNode data={mockData} />
      </ReactFlowProvider>
    );

    expect(screen.getByText("Test Form")).toBeInTheDocument();
  });

  it("displays the icon", () => {
    render(
      <ReactFlowProvider>
        <FormNode data={mockData} />
      </ReactFlowProvider>
    );

    const icon = screen.getByAltText("from-icon.svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "mocked-icon.svg");
  });

  it("displays the correct alt text for the icon", () => {
    render(
      <ReactFlowProvider>
        <FormNode data={mockData} />
      </ReactFlowProvider>
    );

    const icon = screen.getByAltText("from-icon.svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("alt", "from-icon.svg");
  });

  it("renders the label text with proper font weight", () => {
    render(
      <ReactFlowProvider>
        <FormNode data={mockData} />
      </ReactFlowProvider>
    );

    const label = screen.getByText("Test Form");
    expect(label).toHaveClass("font-semibold");
  });
});
