"use client";
import React from "react";
import { BaseEdge, EdgeProps, getBezierPath } from "@xyflow/react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
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
