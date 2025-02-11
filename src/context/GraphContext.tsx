import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { fetchActionBlueprint } from "../api/api";
import { parseNodes, parseEdges } from "../utils/graph";
import { graphReducer } from "../state/graphReducer";
import { GraphAction, GraphState } from "../types/state";

const GraphContext = createContext<
  { state: GraphState; dispatch: React.Dispatch<GraphAction> } | undefined
>(undefined);

export const GraphProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(graphReducer, {
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    const loadGraph = async () => {
      try {
        const data = await fetchActionBlueprint();

        const nodes = parseNodes(data);
        const edges = parseEdges(data);
        dispatch({ type: "SET_GRAPH", payload: { nodes, edges } });
      } catch (error) {
        console.error("Failed to fetch graph:", error);
        dispatch({ type: "SET_GRAPH", payload: { nodes: [], edges: [] } });
      }
    };

    loadGraph();
  }, []);

  return (
    <GraphContext.Provider value={{ state, dispatch }}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
};
