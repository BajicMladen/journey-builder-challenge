import { GraphAction, GraphState } from "../types/state";

export const graphReducer = (
  state: GraphState,
  action: GraphAction
): GraphState => {
  switch (action.type) {
    case "SET_GRAPH":
      return { nodes: action.payload.nodes, edges: action.payload.edges };

    default:
      return state;
  }
};
