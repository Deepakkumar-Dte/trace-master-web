"use client";
import NodeMappingContextProvider from "@/context/nodeMappingContext";
import React, { PropsWithChildren } from "react";

const NodeMappingLayout = ({ children }: PropsWithChildren) => (
  <NodeMappingContextProvider>{children}</NodeMappingContextProvider>
);

export default NodeMappingLayout;
