import ReactFlow, { Background, NodeMouseHandler } from "reactflow";
import "reactflow/dist/style.css";
import { useGraph } from "./context/GraphContext";
import { useMemo, useState } from "react";
import { Node } from "./types/base";

import FormNode from "./components/react-flow/FormNode";

const GraphView = () => {
  const { state } = useGraph();
  const [, setSelectedNode] = useState<Node | null>(null);

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
    </div>
  );
};

export default GraphView;
