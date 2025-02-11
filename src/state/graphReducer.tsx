import { GRAPH_STATE_ACTIONS } from "../enums/state";
import { Node } from "../types/base";
import { GraphAction, GraphState } from "../types/state";

const updateNodeData = (state: GraphState, action: GraphAction): GraphState => {
  if (action.type !== GRAPH_STATE_ACTIONS.UPDATE_NODE_DATA) return state;

  const { currentNode, selectedField, targetNode, key } = action.payload;

  return {
    ...state,
    nodes: state.nodes.map((node: Node) =>
      node.id === currentNode
        ? {
            ...node,
            data: {
              ...node.data,
              form: {
                ...node.data.form,
                [selectedField]: {
                  ...node.data.form[selectedField],
                  data: {
                    inherited: false,
                    source: targetNode,
                    field: key,
                  },
                },
              },
            },
          }
        : node
    ),
  };
};

const populateFormFromAncestors = (
  state: GraphState,
  action: GraphAction
): GraphState => {
  if (action.type !== GRAPH_STATE_ACTIONS.POPULATE_FORM_FROM_ANCESTORS)
    return state;
  const { currentNode } = action.payload;

  const updatedProperties = { ...currentNode.data.form };

  Object.keys(updatedProperties).forEach((field) => {
    if (updatedProperties[field]?.data?.source) return;

    for (const ancestorId of currentNode.data.prerequisites) {
      const ancestor = state.nodes.find((x: Node) => x.id === ancestorId);
      const ancestorForm = ancestor?.data.form;

      if (ancestorForm?.[field]?.data?.source) {
        updatedProperties[field] = {
          ...updatedProperties[field],
          data: {
            inherited: true,
            source: ancestor?.data.name ?? "",
            field: field,
          },
        };
        break;
      }
    }
  });

  return {
    ...state,
    nodes: state.nodes.map((node: Node) =>
      node.id === currentNode.id
        ? {
            ...node,
            data: {
              ...node.data,
              form: updatedProperties,
              prefillForm: true,
            },
          }
        : node
    ),
  };
};

const removeInheritedFields = (
  state: GraphState,
  action: GraphAction
): GraphState => {
  if (action.type !== GRAPH_STATE_ACTIONS.REMOVE_INHERITED_FIELDS) return state;
  const { currentNode } = action.payload;

  const updatedProperties = { ...currentNode.data.form };

  Object.keys(updatedProperties).forEach((field) => {
    if (updatedProperties[field]?.data?.inherited) {
      delete updatedProperties[field].data;
    }
  });

  return {
    ...state,
    nodes: state.nodes.map((node: Node) =>
      node.id === currentNode.id
        ? {
            ...node,
            data: {
              ...node.data,
              form: updatedProperties,
              prefillForm: false,
            },
          }
        : node
    ),
  };
};

export const graphReducer = (
  state: GraphState,
  action: GraphAction
): GraphState => {
  switch (action.type) {
    case GRAPH_STATE_ACTIONS.SET_GRAPH:
      return { nodes: action.payload.nodes, edges: action.payload.edges };

    case GRAPH_STATE_ACTIONS.UPDATE_NODE_DATA:
      return updateNodeData(state, action);

    case GRAPH_STATE_ACTIONS.POPULATE_FORM_FROM_ANCESTORS:
      return populateFormFromAncestors(state, action);

    case GRAPH_STATE_ACTIONS.REMOVE_INHERITED_FIELDS:
      return removeInheritedFields(state, action);

    default:
      return state;
  }
};
