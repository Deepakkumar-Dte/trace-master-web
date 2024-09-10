"use client";
import "@xyflow/react/dist/style.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  Connection,
} from "@xyflow/react";
import { v4 } from "uuid";
import { CustomEdge, CustomNode, DraggaleNode } from "@/components/custom";
import { useDrop } from "react-dnd";
import { Button, Spinner } from "@/components/ui";
import {
  getProcessMappingNodes,
  upsertProcessMappingData,
  upsertTracking,
} from "@/shared/api";
import { useParams } from "next/navigation";
import { customNodeProps, node as CustomNodeTypes } from "@/types";
import { NodeMappingContext } from "@/context/nodeMappingContext";

const convertNodeDataIntoNodeMap = (data: CustomNodeTypes[]) => {
  return data.reduce((acc, cur) => {
    acc.set(cur.id, cur);
    return acc;
  }, new Map<string, any>());
};

const convertNodeDataIntoPayload = (nodes: customNodeProps[]) => {
  return nodes.map((node) => {
    const {
      id,
      position,
      data: { defaultId, inchargeId, name, processId },
    } = node;
    return { id, defaultId, inchargeId, name, processId, ...position };
  });
};

const convertEdgeDataIntoPayload = (edges: Edge[], processId: string) => {
  return edges.map((edge) => {
    const { target, source, sourceHandle, targetHandle, id } = edge;
    return { target, source, sourceHandle, targetHandle, id, processId };
  });
};

const convertMappingNodeDataIntoNode = (
  nodes: CustomNodeTypes[]
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

const NodeMapping = () => {
  const { processId } = useParams();
  const { defaultNodeList, setDefaultNodeList, setUserOptions } =
    useContext(NodeMappingContext);
  const [isLoading, setisLoading] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState<customNodeProps>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const existingConnections = useRef<string[]>([]);
  const removedConnections = useRef<string[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setisLoading(true);
      const { data } = await getProcessMappingNodes({ processId });
      const { defaultNodes, users, edges, mappingNodes } = data;
      setDefaultNodeList(convertNodeDataIntoNodeMap(defaultNodes));
      setNodes(convertMappingNodeDataIntoNode(mappingNodes));
      existingConnections.current = edges.map((e: Edge) => e.id);
      setEdges(edges);
      setUserOptions(users);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRemove = (id: any) => {
    setNodes((pre: any) => pre.filter((e: any) => e.id !== id));
  };

  const { addNodes } = useReactFlow();

  const drop = useDrop(() => ({
    accept: "NODE",
    drop: (item: any) => {
      const newNode = {
        id: v4(),
        type: "default",
        position: { x: 0, y: 0 },
        data: { ...item.data, defaultId: item.id, onRemove: handleRemove },
      };
      addNodes([newNode]);
    },
  }))[1];

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, id: v4() }, eds));
    },
    [setEdges]
  );

  const handleSave = async () => {
    try {
      const nodeData = convertNodeDataIntoPayload(nodes);
      const edgeData = convertEdgeDataIntoPayload(edges, processId as string);

      upsertProcessMappingData({ nodes: nodeData, edges: edgeData, removedConnections: removedConnections.current });
    } catch (err) {
      console.log(err);
    }
  };

  const removeEdgeOnClick = (edge: Edge) => {
    const initValue: { removedEdge: Edge | null; filteredEdges: Edge[] } = {
      removedEdge: null,
      filteredEdges: [],
    };
    const { removedEdge, filteredEdges } = edges.reduce((acc, cur) => {
      if (edge.id === cur.id) {
        acc.removedEdge = cur;
      } else {
        acc.filteredEdges.push(cur);
      }
      return acc;
    }, initValue);
    if (removedEdge && existingConnections.current.includes(removedEdge.id))
      removedConnections.current.push(removedEdge.id);

    setEdges(filteredEdges);
  };

  return (
    <div className="h-full w-full mb-5" ref={drop as any}>
      {!isLoading ? (
        <>
          <div className="h-[60px] flex justify-between p-2">
            <div>
              <Button>Back</Button>
            </div>
            <div className="flex gap-4">
              <Button>Manage</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
          <ReactFlow
            onError={(data, msg) => {
              console.log(data, msg);
            }}
            nodes={nodes}
            edges={edges}
            edgeTypes={{ default: CustomEdge }}
            onEdgeClick={(e, edge) => {
              removeEdgeOnClick(edge);
            }}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={{ default: CustomNode as any }}
            defaultViewport={{ zoom: 1, x: 100, y: 100 }}
          >
            <Background
              color="#ccc"
              variant={BackgroundVariant.Dots}
              style={{ backgroundColor: "white" }}
            />
          </ReactFlow>
          <div className="absolute bottom-0 h-[100px] flex p-2 gap-2">
            {Array.from(
              defaultNodeList.values(),
              ({ id, processes, ...rest }) => (
                <DraggaleNode data={rest} id={id} key={id} />
              )
            )}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default NodeMapping;
