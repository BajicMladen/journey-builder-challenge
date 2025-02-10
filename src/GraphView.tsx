import ReactFlow, { Background, NodeMouseHandler } from "reactflow";
import "reactflow/dist/style.css";
import { useGraph } from "./context/GraphContext";
import { useMemo, useState } from "react";
import { Node } from "./types/base";

import FormNode from "./components/react-flow/FormNode";
import PrefillPopup from "./components/Prefill/PrefillPopup";

const GraphView = () => {
  const { state } = useGraph();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodeTypes = useMemo(() => ({ form: FormNode }), []);

  const onNodeClick: NodeMouseHandler = (_, node) => {
    setSelectedNode(node as Node);
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
          handleFormChange={() => console.log("update")}
        />
      )}
    </div>
  );
};

export default GraphView;
