/* eslint-disable @typescript-eslint/no-explicit-any */
import { customNodeProps, node, IOFormtype } from "@/types";
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

export const baseType = new Set(["auto", "number", "text", "date"]);

export const validateNodeConnection = (
  source: IOFormtype[],
  target: IOFormtype[],
  sChild: Record<string, IOFormtype[]> = {},
  tChild: Record<string, IOFormtype[]> = {}
) => {
  let isValid = true;
  for (const sourceObj of source) {
    let found = false;
    for (const targetObj of target) {
      if (
        sourceObj.variableName === targetObj.variableName &&
        sourceObj.dataType === targetObj.dataType
      ) {
        if (baseType.has(sourceObj.dataType)) {
          found = true;
          break;
        } else if (
          sourceObj.dataType === "dropdown" &&
          sourceObj.lookupId === targetObj.lookupId &&
          sourceObj.lookupValueId === targetObj.lookupValueId
        ) {
          found = true;
          break;
        } else if (
          sourceObj.dataType === "object" &&
          validateNodeConnection(sChild[sourceObj.id], tChild[targetObj.id])
        ) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      isValid = false;
      break;
    }
  }
  return isValid;
};
