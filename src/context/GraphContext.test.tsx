import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GraphProvider, useGraph } from "./GraphContext";
import { fetchActionBlueprint } from "../api/api";
import { parseNodes, parseEdges } from "../utils/graph";

vi.mock("../api/api");
vi.mock("../utils/graph");

const mockFetchActionBlueprint = vi.mocked(fetchActionBlueprint);
const mockParseNodes = vi.mocked(parseNodes);
const mockParseEdges = vi.mocked(parseEdges);

const TestComponent = () => {
  const { state } = useGraph();
  return (
    <div>
      <div data-testid="nodes">{JSON.stringify(state.nodes)}</div>
      <div data-testid="edges">{JSON.stringify(state.edges)}</div>
    </div>
  );
};

describe("GraphProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and parse graph data on mount", async () => {
    const mockData = { actions: [{ id: "1", name: "Action 1" }] };
    mockFetchActionBlueprint.mockResolvedValue(mockData);

    const mockNodes = [
      {
        id: "1",
        label: "Form 1",
        type: "form",
        data: {
          label: "Form 1",
          form: {},
          prerequisites: [],
          prefillForm: false,
          id: "1",
          component_key: "key",
          component_type: "type",
          component_id: "id",
          approval_roles: [],
          name: "Form 1",
          permitted_roles: [],
          input_mapping: {},
          sla_duration: { number: 1, unit: "sec" },
          approval_required: false,
        },
        position: { x: 0, y: 0 },
      },
    ];
    const mockEdges = [{ id: "1-2", source: "1", target: "2" }];
    mockParseNodes.mockReturnValue(mockNodes);
    mockParseEdges.mockReturnValue(mockEdges);

    const { getByTestId } = render(
      <GraphProvider>
        <TestComponent />
      </GraphProvider>
    );

    await waitFor(() => {
      expect(mockFetchActionBlueprint).toHaveBeenCalledTimes(1);
      expect(mockParseNodes).toHaveBeenCalledWith(mockData);
      expect(mockParseEdges).toHaveBeenCalledWith(mockData);
    });

    expect(getByTestId("nodes").textContent).toBe(JSON.stringify(mockNodes));
    expect(getByTestId("edges").textContent).toBe(JSON.stringify(mockEdges));
  });

  it("should throw an error if useGraph is used outside GraphProvider", () => {
    expect(() => render(<TestComponent />)).toThrowError(
      "useGraph must be used within a GraphProvider"
    );
  });

  it("should handle API errors gracefully", async () => {
    mockFetchActionBlueprint.mockRejectedValue(new Error("Failed to fetch"));

    const { queryByTestId } = render(
      <GraphProvider>
        <TestComponent />
      </GraphProvider>
    );

    await waitFor(() => {
      expect(mockFetchActionBlueprint).toHaveBeenCalledTimes(1);
    });

    expect(queryByTestId("nodes")?.textContent).toBe("[]");
    expect(queryByTestId("edges")?.textContent).toBe("[]");
  });
});
