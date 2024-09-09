'use client'
import React from "react";
import { useDrag } from "react-dnd";

const DraggableNode = ({ id, type, name, data }: any) => {
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
        width: "100px",
        height: "50px",
      }}
    >
      {name}
    </div>
  );
};

export default DraggableNode;
