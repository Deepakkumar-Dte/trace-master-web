
import { node } from "@/types";
import { createContext, PropsWithChildren } from "react";

type NodeMappingData = {
  defaultNodes: Map<string, Exclude<node, "processes">>;
  mappingNodes: node[];
};

const NodeMappingContextInitialValue: NodeMappingData = {
  defaultNodes: new Map(),
  mappingNodes: [],
};

export const NodeMappingContext = createContext(NodeMappingContextInitialValue);

const NodeMappingContextProvider = ({ children }: PropsWithChildren) => (
  <NodeMappingContext.Provider value={NodeMappingContextInitialValue}>
    {children}
  </NodeMappingContext.Provider>
);

export default NodeMappingContextProvider;
