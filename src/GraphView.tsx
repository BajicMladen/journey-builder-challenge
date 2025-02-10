import ReactFlow, { Background, NodeMouseHandler } from "reactflow";
import "reactflow/dist/style.css";
import { useGraph } from "./context/GraphContext";
import { useMemo, useState } from "react";
import { Node } from "./types/base";

import FormNode from "./components/react-flow/FormNode";
import PrefillPopup from "./components/prefill/PrefillPopup";

const GraphView = () => {
  const { state, dispatch } = useGraph();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodeTypes = useMemo(() => ({ form: FormNode }), []);

  const onNodeClick: NodeMouseHandler = (_, node) => {
    setSelectedNode(node as Node);
  };

  const getPrerequisitesNodes = () => {
    const test = state.nodes.filter((node) =>
      selectedNode?.data.prerequisites.includes(node.id)
    );
    return test;
  };

  const updateField = (selectedField: string, nodeId: string, key: string) => {
    dispatch({
      type: "UPDATE_NODE_DATA",
      payload: {
        selectedField: selectedField,
        currentNode: selectedNode?.id ?? "",
        targetNode: nodeId,
        key,
      },
    });
  };

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={state.nodes}
        edges={state.edges}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>

      {selectedNode && (
        <PrefillPopup
          node={state.nodes.find((node) => node.id === selectedNode.id) as Node}
          onClose={() => setSelectedNode(null)}
          handleFormChange={updateField}
          preReqNodes={getPrerequisitesNodes()}
        />
      )}
    </div>
  );
};

export default GraphView;
