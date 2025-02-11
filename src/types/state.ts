import { Node, Edge } from "./base";
import { GRAPH_STATE_ACTIONS } from "../enums/state";

export interface GraphState {
  nodes: Node[];
  edges: Edge[];
}

export type GraphAction =
  | {
      type: GRAPH_STATE_ACTIONS.SET_GRAPH;
      payload: { nodes: Node[]; edges: Edge[] };
    }
  | {
      type: GRAPH_STATE_ACTIONS.UPDATE_NODE_DATA;
      payload: {
        currentNode: string;
        selectedField: string;
        targetNode: string;
        key: string;
      };
    }
  | {
      type: GRAPH_STATE_ACTIONS.POPULATE_FORM_FROM_ANCESTORS;
      payload: { currentNode: Node };
    }
  | {
      type: GRAPH_STATE_ACTIONS.REMOVE_INHERITED_FIELDS;
      payload: { currentNode: Node };
    };
