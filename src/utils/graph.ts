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

export const getPrerequisiteNodes = (
  graphData: ActionBlueprintGraphDescription,
  nodeId: string
) => {
  const nodeMap = Object.fromEntries(
    graphData.nodes.map((node: Node) => [node.id, node])
  );
  const visited = new Set<string>();
  const result: string[] = [];
  const queue: string[] = [nodeId];

  while (queue.length > 0) {
    const currentId = queue.shift();

    if (!currentId || visited.has(currentId)) {
      continue;
    }

    visited.add(currentId);

    const currentNode = nodeMap[currentId];
    if (currentNode?.data?.prerequisites) {
      currentNode.data.prerequisites.forEach((prereqId: string) => {
        if (!visited.has(prereqId)) {
          queue.push(prereqId);
        }
      });
    }

    if (currentNode && currentId !== nodeId) {
      result.push(currentNode.id);
    }
  }
  return result;
};
