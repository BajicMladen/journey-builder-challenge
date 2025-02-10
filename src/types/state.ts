import { Node, Edge } from "./base";

export interface GraphState {
  nodes: Node[];
  edges: Edge[];
}

export type GraphAction = {
  type: "SET_GRAPH";
  payload: { nodes: Node[]; edges: Edge[] };
};
