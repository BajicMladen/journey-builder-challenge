import { MOCK_DATA } from "../mock/test-data";
import { parseNodes, parseEdges, getPrerequisiteNodes } from "./graph";

import { describe, expect, it } from "vitest";

describe("Utility Functions", () => {
  describe("parseNodes", () => {
    it("should parse nodes correctly", () => {
      const parsedNodes = parseNodes(MOCK_DATA);
      expect(parsedNodes).toHaveLength(MOCK_DATA.nodes.length);
      expect(parsedNodes[0]).toHaveProperty(
        "id",
        "form-bad163fd-09bd-4710-ad80-245f31b797d5"
      );
      expect(parsedNodes[0].data).toHaveProperty("label", "Form F");
      expect(parsedNodes[0].data).toHaveProperty("form");
    });

    it("should use default form when no matching form is found", () => {
      const graphDataWithNoMatchingForm = { ...MOCK_DATA, forms: [] };
      const parsedNodes = parseNodes(graphDataWithNoMatchingForm);
      expect(parsedNodes[0].data.form).toEqual({});
    });
  });

  describe("parseEdges", () => {
    it("should parse edges correctly", () => {
      const parsedEdges = parseEdges(MOCK_DATA);
      expect(parsedEdges).toHaveLength(MOCK_DATA.edges.length);
      expect(parsedEdges[0]).toHaveProperty(
        "id",
        "form-0f58384c-4966-4ce6-9ec2-40b96d61f745-form-bad163fd-09bd-4710-ad80-245f31b797d5"
      );
      expect(parsedEdges[0]).toHaveProperty(
        "source",
        "form-0f58384c-4966-4ce6-9ec2-40b96d61f745"
      );
      expect(parsedEdges[0]).toHaveProperty(
        "target",
        "form-bad163fd-09bd-4710-ad80-245f31b797d5"
      );
    });
  });

  describe("getPrerequisiteNodes", () => {
    it("should return an empty array if no prerequisites are found", () => {
      const prerequisites = getPrerequisiteNodes(
        MOCK_DATA,
        "form-47c61d17-62b0-4c42-8ca2-0eff641c9d88"
      );
      expect(prerequisites).toEqual([]);
    });
  });
});
