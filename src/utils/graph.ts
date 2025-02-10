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
