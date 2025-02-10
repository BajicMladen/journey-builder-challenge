import { Node, Edge } from "./base";

export interface GraphState {
  nodes: Node[];
  edges: Edge[];
}

export type GraphAction =
  | { type: "SET_GRAPH"; payload: { nodes: Node[]; edges: Edge[] } }
  | {
      type: "UPDATE_NODE_DATA";
      payload: {
        currentNode: string;
        selectedField: string;
        targetNode: string;
        key: string;
      };
    }
  | { type: "POPULATE_FORM_FROM_ANCESTORS"; payload: { currentNode: Node } }
  | { type: "REMOVE_INHERITED_FIELDS"; payload: { currentNode: Node } };
