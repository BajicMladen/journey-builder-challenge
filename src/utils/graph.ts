import {
  Node,
  Edge,
  ActionBlueprintGraphDescription,
  Form,
} from "../types/base";

export const parseNodes = (graphData: ActionBlueprintGraphDescription) => {
  return graphData.nodes.map((node: Node) => {
    const from = graphData.forms.find(
      (form: Form) => form.id === node.data.component_id
    ) ?? { field_schema: { properties: {} } };
    return {
      id: node.id,
      type: "form",
      data: {
        ...node.data,
        label: node.data.name,
        form: from?.field_schema.properties,
        prerequisites: getPrerequisiteNodes(graphData, node.id),
        prefillForm: false,
      },
      position: node.position,
    };
  });
};

export const parseEdges = (graphData: ActionBlueprintGraphDescription) => {
  return graphData.edges.map((edge: Edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
  }));
};

const getPrerequisiteNodes = (
  graphData: ActionBlueprintGraphDescription,
  nodeId: string
) => {
  const nodeMap = Object.fromEntries(
    graphData.nodes.map((node) => [node.id, node])
  );
  const visited = new Set();
  const result: string[] = [];

  const traverse = (id: string) => {
    if (!id || visited.has(id)) return;
    visited.add(id);

    const node = nodeMap[id];
    if (node?.data?.prerequisites) {
      node.data.prerequisites.forEach((prereqId) => {
        traverse(prereqId);
        result.push(prereqId);
      });
    }
  };

  traverse(nodeId);
  return result.reverse();
};
