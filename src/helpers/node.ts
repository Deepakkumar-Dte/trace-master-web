import { customNodeProps, node } from "@/types";
import { Edge } from "@xyflow/react";

export const convertNodeDataIntoNodeMap = (data: node[]) => {
  return data.reduce((acc, cur) => {
    acc.set(cur.id, cur);
    return acc;
  }, new Map<string, any>());
};

export const convertNodeDataIntoPayload = (nodes: customNodeProps[]) => {
  return nodes.map((node) => {
    const {
      id,
      position,
      data: { defaultId, inchargeId, name, processId },
    } = node;
    return { id, defaultId, inchargeId, name, processId, ...position };
  });
};

export const convertEdgeDataIntoPayload = (
  edges: Edge[],
  processId: string
) => {
  return edges.map((edge) => {
    const { target, source, sourceHandle, targetHandle, id } = edge;
    return { target, source, sourceHandle, targetHandle, id, processId };
  });
};

export const convertMappingNodeDataIntoNode = (
  nodes: node[]
): customNodeProps[] => {
  return nodes.map((node) => {
    return {
      id: node.id,
      data: node,
      type: "default",
      position: { x: node.x ?? 0, y: node.y ?? 0 },
    };
  });
};
