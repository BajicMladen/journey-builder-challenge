import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Collapse from "./Collapse";

describe("Collapse Component", () => {
  it("renders with title", () => {
    render(<Collapse title="Test Title">Test Content</Collapse>);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("toggles open and closed on click", async () => {
    render(<Collapse title="Test Title">Test Content</Collapse>);

    const toggleButton = screen.getByRole("button");
    const content = screen.getByText("Test Content");

    expect(content).toHaveClass("max-h-0");

    fireEvent.click(toggleButton);
    expect(content).toHaveClass("max-h-screen");

    fireEvent.click(toggleButton);
    expect(content).toHaveClass("max-h-0");
  });

  it("applies custom className to container", () => {
    render(
      <Collapse title="Test Title" className="custom-class">
        Test Content
      </Collapse>
    );

    expect(screen.getByRole("button").parentElement).toHaveClass(
      "custom-class"
    );
  });

  it("sets the correct aria-expanded attribute", () => {
    render(<Collapse title="Test Title">Test Content</Collapse>);

    const toggleButton = screen.getByRole("button");

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("displays content when open", () => {
    render(<Collapse title="Test Title">Test Content</Collapse>);

    const toggleButton = screen.getByRole("button");
    const content = screen.getByText("Test Content");

    expect(content).toHaveClass("max-h-0");

    fireEvent.click(toggleButton);
    expect(content).toHaveClass("max-h-screen");
  });

  it("rotates the icon when open", () => {
    render(<Collapse title="Test Title">Test Content</Collapse>);

    const toggleButton = screen.getByRole("button");
    const icon = screen.getByAltText("arrow-icon.svg");

    expect(icon).toHaveClass("rotate-0");

    fireEvent.click(toggleButton);
    expect(icon).toHaveClass("rotate-90");

    fireEvent.click(toggleButton);
    expect(icon).toHaveClass("rotate-0");
  });
});
