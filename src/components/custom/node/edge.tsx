"use client";
import React from "react";
import { BaseEdge, getBezierPath } from "@xyflow/react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: Record<string, number>) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={String(id)} path={edgePath} />
    </>
  );
}
