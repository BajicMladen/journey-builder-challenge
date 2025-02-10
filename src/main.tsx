import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GraphView from "./GraphView.tsx";
import { GraphProvider } from "./context/GraphContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GraphProvider>
      <GraphView />
    </GraphProvider>
  </StrictMode>
);
