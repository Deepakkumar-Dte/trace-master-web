'use client'
import React, { useCallback, useContext } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Node as NodeType,
} from "@xyflow/react";
import { v4 } from "uuid";

import "@xyflow/react/dist/style.css";
import { CustomEdge, CustomNode, DraggaleNode } from "@/components/custom";
import { useDrop } from "react-dnd";

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "output-2",
    targetHandle: "input-2",
    label: "Process 1 to Process 2",
  },
];

const NodeMapping = ()=> {
  const handleRemove = (id: any) => {
    setNodes((pre: any) => pre.filter((e: any) => e.id !== id));
  };
  const initialNodes: (NodeType & {
    data: { onRemove: (data: any) => void };
  })[] = [
    {
      id: "1",
      type: "default",
      position: { x: 0, y: 0 },
      style: {
        zIndex: 10,
      },
      data: {
        onRemove: handleRemove,
        label: "1",
        processes: [
          {
            name: "process1",
            outputs: [{ label: "ReqId, Name" }, { label: "Name, age" }],
          },
        ],
      },
    },
    {
      id: "2",
      position: { x: 0, y: 100 },
      data: {
        onRemove: handleRemove,
        label: "2",
        processes: [
          {
            name: "process2",
            inputs: [{ label: "ReqId, Name" }, { label: "Name, age" }],
          },
        ],
      },
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { addNodes } = useReactFlow();

  const drop = useDrop(() => ({
    accept: "NODE",
    drop: (item: any) => {
      const newNode = {
        id: v4(),
        type: "default",
        position: { x: 0, y: 0 },
        data: { ...item.data, onRemove: handleRemove },
      };
      addNodes([newNode]);
    },
  }))[1];

  const onConnect = useCallback(
    (params: any) => {
      console.log(params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );
  return (
    <div className="h-full w-full bg-white mb-5">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        edgeTypes={{ default: CustomEdge }}
        onEdgeClick={(e, edge) => {
          setEdges((prev) => prev.filter((e) => e.id !== edge.id));
        }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ default: CustomNode as any }}
      />
      <div className="flex gap-3 overflow-x-scroll">
        {/* {data.map((e) => {
          return <DraggableNode id={e.id} name={e.name} data={e} />;
        })} */}
      </div>
    </div>
  );
}

export default NodeMapping