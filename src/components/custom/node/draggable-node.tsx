"use client";
import React from "react";
import { useDrag } from "react-dnd";

const DraggableNode = ({ id, data }: { id: string; data: any }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "NODE",
    item: { id, type: "default", data },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as any}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "8px",
        backgroundColor: "lightgray",
        border: "1px solid gray",
        borderRadius: "4px",
        width: "150px",
        height: "100%",
      }}
    >
      {data.name}
    </div>
  );
};

export default DraggableNode;
